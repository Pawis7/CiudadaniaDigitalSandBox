/**
 * Auth Bearer simple por token estático.
 *
 * Para esta primera fase del backend (interno SEP, sin login público) basta
 * con un token compartido entre el panel admin y la API. Cuando llegue el
 * login real se cambia por JWT/sessions sin tocar las rutas.
 *
 * Uso en route handlers:
 *   if (!isAdmin(request)) return unauthorized();
 */
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

export function isAdmin(request: NextRequest | Request): boolean {
  if (!ADMIN_TOKEN) return false;
  const header = request.headers.get('authorization') ?? '';
  if (!header.toLowerCase().startsWith('bearer ')) return false;
  const token = header.slice(7).trim();
  // Comparación tiempo-constante para evitar timing attacks
  return constantTimeEquals(token, ADMIN_TOKEN);
}

export function unauthorized(message = 'Token de administrador requerido o inválido.') {
  return NextResponse.json({ error: message }, { status: 401 });
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
