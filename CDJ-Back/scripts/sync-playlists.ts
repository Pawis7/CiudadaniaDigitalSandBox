/**
 * Sincronización automática de todas las playlists de YouTube con la base de datos.
 *
 * Busca todas las series (VideoSeries) que tengan un `youtubePlaylistId` configurado,
 * descarga sus videos (usando la API Key si está configurada, o el raspador público si no)
 * e inserta en la base de datos los videos nuevos.
 *
 * Uso:
 *   cd CDJ-Back && npx tsx --env-file=.env scripts/sync-playlists.ts
 *
 * Configuración como Cron (ejemplo para ejecutarse cada día a las 3:00 AM):
 *   0 3 * * * cd /ruta/a/CiudadaniaDigitalSandBox/CDJ-Back && npx tsx --env-file=.env scripts/sync-playlists.ts >> /var/log/cdj-sync.log 2>&1
 */

import { PrismaClient } from '@prisma/client';
import { fetchPlaylistItems } from '../src/lib/youtube';

const prisma = new PrismaClient();

function extractYoutubeIdFromUrl(s: string): string | null {
  const match = s.match(/(?:v=|youtu\.be\/|-yt-)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

async function main() {
  console.log(`[${new Date().toISOString()}] ▶ Iniciando sincronización de playlists de YouTube...`);

  // Obtener todas las series que tengan un ID de playlist asociado
  const series = await prisma.videoSeries.findMany({
    where: {
      youtubePlaylistId: {
        not: null,
      },
    },
    include: {
      videos: {
        select: {
          id: true,
          sortOrder: true,
        },
      },
    },
  });

  if (series.length === 0) {
    console.log('ℹ No se encontraron series con `youtubePlaylistId` configurado.');
    return;
  }

  console.log(`✓ Se encontraron ${series.length} series para sincronizar.\n`);

  for (const s of series) {
    const playlistId = s.youtubePlaylistId!;
    console.log(`----------------------------------------------------------------`);
    console.log(`▶ Sincronizando serie: "${s.title}" (ID: ${s.id})`);
    console.log(`  Playlist de YouTube: ${playlistId}`);

    try {
      // Obtener los videos de la playlist (usa API o Raspador automáticamente)
      const items = await fetchPlaylistItems(playlistId);
      console.log(`  Videos en YouTube:   ${items.length}`);

      const existingIds = new Set(s.videos.map((v) => v.id));
      const existingYoutubeIds = new Set(
        s.videos
          .map((v) => extractYoutubeIdFromUrl(v.id))
          .filter(Boolean) as string[],
      );

      // Calcular el orden de ordenamiento actual máximo
      const maxSort = s.videos.reduce(
        (m, v) => (v.sortOrder > m ? v.sortOrder : m),
        0,
      );

      let added = 0;
      let skipped = 0;
      let cursor = maxSort;

      for (const it of items) {
        const id = `${s.id}-yt-${it.videoId}`;
        if (existingIds.has(id) || existingYoutubeIds.has(it.videoId)) {
          skipped += 1;
          continue;
        }

        cursor += 1;
        await prisma.video.create({
          data: {
            id,
            seriesId: s.id,
            title: it.title,
            description: it.description.slice(0, 800) || null,
            youtubeUrl: `https://www.youtube.com/watch?v=${it.videoId}`,
            durationLabel: it.durationLabel,
            publishedAt: it.publishedAt ? new Date(it.publishedAt) : null,
            sortOrder: cursor,
          },
        });
        added += 1;
      }

      // Actualizar la fecha de última sincronización
      await prisma.videoSeries.update({
        where: { id: s.id },
        data: {
          lastSyncedAt: new Date(),
        },
      });

      console.log(`  Resultado:           +${added} agregados, ${skipped} ya existentes.`);
    } catch (err: any) {
      console.error(`  ✖ Error al sincronizar serie "${s.title}":`, err.message);
    }
  }

  console.log(`\n[${new Date().toISOString()}] ✓ Sincronización completada con éxito.`);
}

main()
  .catch((err) => {
    console.error('✖ Error crítico en el script:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
