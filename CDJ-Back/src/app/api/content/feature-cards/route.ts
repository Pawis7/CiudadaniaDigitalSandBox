/**
 * GET  /api/content/feature-cards            — lista feature cards del home
 * PUT  /api/content/feature-cards            — actualiza una (admin)
 *      body: { id, title?, description?, ... }
 */
import { NextRequest } from 'next/server';
import { ok, badRequest, notFound, serverError } from '@/lib/responses';
import { isAdmin, unauthorized } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cards = await prisma.featureCard.findMany({ orderBy: { sortOrder: 'asc' } });
    return ok(cards);
  } catch (err) {
    return serverError(err);
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const body = await req.json();
    if (!body?.id) return badRequest('Falta el campo "id".');
    const updated = await prisma.featureCard.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        iconBgClass: body.iconBgClass,
        iconShadowClass: body.iconShadowClass,
        imageUrl: body.imageUrl,
        href: body.href,
        audience: body.audience,
        illoScene: body.illoScene,
        badge: body.badge,
        sortOrder: body.sortOrder,
      },
    });
    return ok(updated);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2025') {
      return notFound('Feature card no encontrada.');
    }
    return serverError(err);
  }
}
