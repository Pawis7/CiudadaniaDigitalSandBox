/**
 * GET    /api/content/feature-cards            — lista todas las feature cards
 * POST   /api/content/feature-cards            — crea una nueva (admin)
 * GET    /api/content/feature-cards/destinations — opciones válidas de destino
 */
import { NextRequest } from 'next/server';
import { ok, badRequest, serverError } from '@/lib/responses';
import { isAdmin, unauthorized } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CARD_DESTINATIONS, resolveDestination } from '@/lib/card-destinations';

export const dynamic = 'force-dynamic';

/** Enriquece la card de BD añadiendo el href resuelto y las opciones de UI. */
function enrichCard(card: Awaited<ReturnType<typeof prisma.featureCard.findFirstOrThrow>>) {
  return {
    ...card,
    href: card.destination === 'series' && card.id !== 'series'
      ? `/series/${card.id}`
      : resolveDestination(card.destination),
  };
}

export async function GET() {
  try {
    const cards = await prisma.featureCard.findMany({ orderBy: { sortOrder: 'asc' } });
    return ok(cards.map(enrichCard));
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const body = await req.json();

    // Validar destination (debe ser una clave conocida)
    if (!body?.destination || !CARD_DESTINATIONS[body.destination]) {
      return badRequest(`Destino inválido. Opciones válidas: ${Object.keys(CARD_DESTINATIONS).join(', ')}`);
    }
    if (!body?.title?.trim()) return badRequest('El título es obligatorio.');

    const finalId = body.id?.trim();
    if (finalId) {
      const existing = await prisma.featureCard.findUnique({ where: { id: finalId } });
      if (existing) {
        return badRequest(`Ya existe una tarjeta o serie destacada con el identificador "${finalId}" (generado a partir del título). Por favor, elige un título diferente.`);
      }
    }

    const maxOrder = await prisma.featureCard.aggregate({ _max: { sortOrder: true } });
    const nextOrder = (maxOrder._max.sortOrder ?? 0) + 1;

    const card = await prisma.featureCard.create({
      data: {
        id:          body.id?.trim() || undefined,
        title:       body.title.trim(),
        description: body.description?.trim() ?? '',
        imageUrl:    body.imageUrl?.trim() ?? '',
        destination: body.destination,
        audience:    body.audience ?? 'cdj',
        illoScene:   body.illoScene ?? null,
        badge:       body.badge?.trim() ?? null,
        icon:        body.icon ?? 'play_arrow',
        iconBgClass: body.iconBgClass ?? 'bg-amber-600',
        iconShadowClass: body.iconShadowClass ?? 'shadow-amber-200',
        sortOrder:   nextOrder,
      },
    });

    if (card.destination === 'series' && card.id !== 'series') {
      await prisma.videoSeries.upsert({
        where: { id: card.id },
        update: {
          title: card.title,
          description: card.description,
          tagline: card.description,
          coverImageUrl: card.imageUrl,
          iconBgClass: card.iconBgClass,
          icon: card.icon,
          audience: card.audience,
          illoScene: card.illoScene,
        },
        create: {
          id: card.id,
          slug: card.id,
          title: card.title,
          tagline: card.description,
          description: card.description,
          coverImageUrl: card.imageUrl,
          accentClass: 'from-blue-500 to-cyan-500',
          iconBgClass: card.iconBgClass,
          icon: card.icon,
          audience: card.audience,
          illoScene: card.illoScene,
        }
      });
    }

    return ok(enrichCard(card), 201);
  } catch (err) {
    return serverError(err);
  }
}
