/**
 * Cliente mínimo de YouTube Data API v3 para importar playlists.
 *
 * Requiere YOUTUBE_API_KEY en .env (crear en console.cloud.google.com →
 * APIs & Services → Credentials → API key → restringir a YouTube Data API v3).
 *
 * Uso:
 *   const items = await fetchPlaylistItems(playlistId);
 *   // items: [{ videoId, title, description, publishedAt, durationLabel, position }]
 */

const API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubePlaylistItem {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string | null;
  durationLabel: string | null;
  position: number;
}

/**
 * Extrae el ID de playlist desde un URL completo o devuelve el string si ya es ID.
 *
 * Acepta:
 *   - https://youtube.com/playlist?list=PL6...
 *   - https://www.youtube.com/playlist?list=PL6...&si=...
 *   - https://youtu.be/xxx?list=PL6...
 *   - PL6UhGvZdF4uhkptPgZt5UpoFiK1WQyig4
 */
export function extractPlaylistId(input: string): string | null {
  const trimmed = (input || '').trim();
  if (!trimmed) return null;

  // Si parece un ID directo (sin slash ni signo de interrogación)
  if (!trimmed.includes('/') && !trimmed.includes('?') && !trimmed.includes('=')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const list = url.searchParams.get('list');
    if (list) return list;
  } catch {
    // fallthrough
  }

  // Regex de respaldo
  const match = trimmed.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
}

/**
 * Convierte ISO 8601 (PT1M56S, PT2H3M5S) a "1:56" / "2:03:05".
 */
export function isoDurationToLabel(iso: string | undefined | null): string | null {
  if (!iso) return null;
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return null;
  const h = parseInt(match[1] ?? '0', 10);
  const m = parseInt(match[2] ?? '0', 10);
  const s = parseInt(match[3] ?? '0', 10);
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

interface PlaylistItemResponse {
  items?: Array<{
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      position: number;
      resourceId: { videoId: string };
    };
  }>;
  nextPageToken?: string;
}

interface VideoDetailsResponse {
  items?: Array<{
    id: string;
    contentDetails: { duration: string };
  }>;
}

/**
 * Trae TODOS los items de la playlist (paginando si tiene >50).
 * Luego enriquece con la duración de cada video.
 */
export async function fetchPlaylistItems(
  playlistId: string,
  apiKey: string = process.env.YOUTUBE_API_KEY ?? '',
): Promise<YouTubePlaylistItem[]> {
  if (!playlistId) {
    throw new Error('playlistId requerido.');
  }
  if (!apiKey) {
    console.info(`[YouTube API] YOUTUBE_API_KEY no configurada. Usando fallback de raspado público para la playlist: ${playlistId}`);
    return fetchPlaylistItemsScraper(playlistId);
  }

  const collected: YouTubePlaylistItem[] = [];
  let pageToken: string | undefined;
  let safety = 0;

  do {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: '50',
      playlistId,
      key: apiKey,
    });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await fetch(`${API_BASE}/playlistItems?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `YouTube API playlistItems falló (${res.status}): ${body.slice(0, 200)}`,
      );
    }
    const json = (await res.json()) as PlaylistItemResponse;

    for (const it of json.items ?? []) {
      // Saltar items privados/eliminados (resourceId puede venir vacío)
      const videoId = it.snippet?.resourceId?.videoId;
      if (!videoId) continue;
      collected.push({
        videoId,
        title: it.snippet.title,
        description: it.snippet.description ?? '',
        publishedAt: it.snippet.publishedAt ?? null,
        position: it.snippet.position ?? collected.length,
        durationLabel: null,
      });
    }

    pageToken = json.nextPageToken;
    safety += 1;
  } while (pageToken && safety < 20); // hard cap ~1000 videos

  // Enriquecer con duraciones (50 IDs por request)
  for (let i = 0; i < collected.length; i += 50) {
    const slice = collected.slice(i, i + 50);
    const params = new URLSearchParams({
      part: 'contentDetails',
      id: slice.map((v) => v.videoId).join(','),
      key: apiKey,
    });
    const res = await fetch(`${API_BASE}/videos?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) continue; // si falla solo perdemos la duración
    const json = (await res.json()) as VideoDetailsResponse;
    const byId = new Map(
      (json.items ?? []).map((it) => [it.id, isoDurationToLabel(it.contentDetails?.duration)]),
    );
    for (const v of slice) {
      v.durationLabel = byId.get(v.videoId) ?? null;
    }
  }

  return collected;
}

/**
 * Raspador fallback público que descarga el HTML de la playlist de YouTube
 * y extrae la variable ytInitialData para parsear los videos.
 * Se activa automáticamente cuando no hay YOUTUBE_API_KEY configurada.
 */
async function fetchPlaylistItemsScraper(playlistId: string): Promise<YouTubePlaylistItem[]> {
  const url = `https://www.youtube.com/playlist?list=${playlistId}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'Accept-Language': 'es-ES,es;q=0.9',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`YouTube scraping falló con estado ${res.status}`);
  }

  const html = await res.text();
  const marker = 'var ytInitialData = ';
  const index = html.indexOf(marker);
  if (index === -1) {
    throw new Error('No se pudo encontrar ytInitialData en la respuesta pública de YouTube. La playlist podría ser privada.');
  }

  const start = index + marker.length;
  let end = html.indexOf(';</script>', start);
  if (end === -1) {
    end = html.indexOf('};', start);
    if (end !== -1) end += 1;
  }

  if (end === -1) {
    throw new Error('No se pudo encontrar el delimitador de datos en la página de YouTube.');
  }

  const jsonStr = html.substring(start, end).trim();
  let data: any;
  try {
    data = JSON.parse(jsonStr);
  } catch (err) {
    throw new Error('Error al parsear el JSON de la playlist pública.');
  }

  let playlistVideoList = null;

  // Estructura estándar de dos columnas
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs;
  const content = tabs?.[0]?.tabRenderer?.content;
  const sectionList = content?.sectionListRenderer?.contents;
  const itemSection = sectionList?.[0]?.itemSectionRenderer?.contents;
  playlistVideoList = itemSection?.[0]?.playlistVideoListRenderer?.contents;

  // Estructura de columna única
  if (!playlistVideoList) {
    const singleContent = data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content;
    const singleSection = singleContent?.sectionListRenderer?.contents;
    const singleItem = singleSection?.[0]?.itemSectionRenderer?.contents;
    playlistVideoList = singleItem?.[0]?.playlistVideoListRenderer?.contents;
  }

  if (!playlistVideoList) {
    throw new Error('No se encontraron videos en la estructura pública de la playlist. Asegúrate de que no esté vacía o sea pública.');
  }

  const items: YouTubePlaylistItem[] = [];
  for (const item of playlistVideoList) {
    const v = item.playlistVideoRenderer;
    if (!v) continue;

    const videoId = v.videoId;
    if (!videoId) continue;

    const title = v.title?.runs?.[0]?.text || v.title?.simpleText || 'Sin título';
    const description = v.descriptionSnippet?.runs?.map((r: any) => r.text).join('') || '';
    const durationLabel = v.lengthText?.simpleText || v.lengthText?.runs?.[0]?.text || null;

    items.push({
      videoId,
      title,
      description,
      publishedAt: null,
      durationLabel,
      position: v.index?.simpleText ? parseInt(v.index.simpleText, 10) : items.length,
    });
  }

  return items;
}
