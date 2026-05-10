/**
 * GET /api/content/audiences/:slug
 * Detalle de una audiencia con sub-niveles, topics y series recomendadas.
 */
import { NextRequest } from 'next/server';
import { notFound, ok, serverError } from '@/lib/responses';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const audience = await prisma.audience.findUnique({
      where: { slug },
      include: {
        subLevels: { orderBy: { sortOrder: 'asc' } },
        topics: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!audience) return notFound(`Audiencia "${slug}" no encontrada.`);

    const recommendedSeries = await prisma.videoSeries.findMany({
      where: { audience: audience.audience },
      orderBy: { sortOrder: 'asc' },
    });

    return ok({ ...audience, recommendedSeries });
  } catch (err) {
    return serverError(err);
  }
}
