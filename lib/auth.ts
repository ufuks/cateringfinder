import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { db } from './db';

const COOKIE = 'catefind_session';

function secret() {
  const value = process.env.SESSION_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET must be configured in production.');
  return 'dev-only-change-me';
}

export function hashPassword(password: string) {
  return crypto.scryptSync(password, secret(), 64).toString('hex');
}

export function verifyPassword(password: string, hash: string) {
  try {
    const actual = Buffer.from(hash, 'hex');
    const expected = Buffer.from(hashPassword(password), 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export async function createSession(userId: string) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  (await cookies()).set(COOKIE, `${payload}.${sig}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 604800
  });
}

export async function getSessionUser() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { userId: string; exp: number };
    if (!parsed.userId || parsed.exp < Date.now()) return null;
    return db.user.findUnique({ where: { id: parsed.userId }, include: { companyUsers: true } });
  } catch {
    return null;
  }
}
