// src/api.ts
import { getToken, clearToken, isExpired } from "./auth";

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getToken();
  if (!token || isExpired()) {
    clearToken();
    throw new Error("UNAUTHENTICATED");
  }
  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}
