/**
 * PATCH  /api/content/feature-cards/[id]   — actualiza campos (admin)
 * DELETE /api/content/feature-cards/[id]   — elimina la card (admin)
 */
import { NextRequest } from 'next/server';
import { ok, badRequest, notFound, serverError } from '@/lib/responses';
import { isAdmin, unauthorized } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CARD_DESTINATIONS, resolveDestination } from '@/lib/card-destinations';

export const dynamic = 'force-dynamic';

type Params = { params: { id: string } };

function enrichCard(card: Awaited<ReturnType<typeof prisma.featureCard.findFirstOrThrow>>) {
  return {
    ...card,
    href: card.destination === 'series' && card.id !== 'series'
      ? `/series/${card.id}`
      : resolveDestination(card.destination),
  };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const body = await req.json();

    // Validar destination si se envía
    if (body.destination !== undefined && !CARD_DESTINATIONS[body.destination]) {
      return badRequest(`Destino inválido. Opciones: ${Object.keys(CARD_DESTINATIONS).join(', ')}`);
    }

    const data: Record<string, unknown> = {};
    if (body.title            !== undefined) data.title            = body.title.trim();
    if (body.description      !== undefined) data.description      = body.description.trim();
    if (body.imageUrl         !== undefined) data.imageUrl         = body.imageUrl.trim();
    if (body.destination      !== undefined) data.destination      = body.destination;
    if (body.badge            !== undefined) data.badge            = body.badge?.trim() || null;
    if (body.sortOrder        !== undefined) data.sortOrder        = body.sortOrder;
    if (body.audience         !== undefined) data.audience         = body.audience;
    if (body.icon             !== undefined) data.icon             = body.icon.trim();
    if (body.iconBgClass      !== undefined) data.iconBgClass      = body.iconBgClass.trim();
    if (body.iconShadowClass  !== undefined) data.iconShadowClass  = body.iconShadowClass.trim();
    if (body.illoScene        !== undefined) data.illoScene        = body.illoScene || null;

    if (Object.keys(data).length === 0 && !body.id) return badRequest('Sin campos para actualizar.');

    let updated;
    if (body.id && body.id !== params.id) {
      // Validar si el nuevo ID ya existe
      const existing = await prisma.featureCard.findUnique({ where: { id: body.id } });
      if (existing) {
        return badRequest(`Ya existe otra tarjeta o serie destacada con el identificador "${body.id}" (generado a partir del título). Por favor, elige un título diferente.`);
      }

      const oldCard = await prisma.featureCard.findUnique({ where: { id: params.id } });
      if (!oldCard) return notFound('Feature card no encontrada.');

      // Eliminar antigua
      await prisma.featureCard.delete({ where: { id: params.id } });

      // Crear nueva con el nuevo ID
      updated = await prisma.featureCard.create({
        data: {
          ...oldCard,
          ...data,
          id: body.id,
        } as any,
      });
    } else {
      updated = await prisma.featureCard.update({
        where: { id: params.id },
        data,
      });
    }
    return ok(enrichCard(updated));
  } catch (err: unknown) {
    if (isPrismaNotFound(err)) return notFound('Feature card no encontrada.');
    return serverError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return unauthorized();
  try {
    await prisma.featureCard.delete({ where: { id: params.id } });
    return ok({ deleted: params.id });
  } catch (err: unknown) {
    if (isPrismaNotFound(err)) return notFound('Feature card no encontrada.');
    return serverError(err);
  }
}

function isPrismaNotFound(err: unknown): boolean {
  return !!(err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2025');
}
