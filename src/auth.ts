// src/auth.ts
export type JwtPayload = { id_role?: number; exp?: number; [k: string]: unknown };

const STORAGE_KEY = "auth.token";

export function setToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY, token); // sessionStorage > localStorage
}
export function getToken(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
}
export function clearToken() {
  sessionStorage.removeItem(STORAGE_KEY);
}

// Decode sans vérif de signature (côté front on ne peut pas vérifier)
export function decodeJwt(token?: string | null): JwtPayload | null {
  if (!token) return null;
  const [, payload] = token.split(".");
  if (!payload) return null;
  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getRole(): number | undefined {
  return decodeJwt(getToken())?.id_role as number | undefined;
}

export function isExpired(): boolean {
  const exp = decodeJwt(getToken())?.exp;
  return !!exp && Date.now() / 1000 >= exp;
}
