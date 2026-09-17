"use server";

import { cookies } from "next/headers";
import { apiUrl } from "./api";

const ACCESS_COOKIE = "mindful_access_token";
const REFRESH_COOKIE = "mindful_refresh_token";

type TokenPair = { access_token: string; refresh_token: string };

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar: string;
};

async function platziRequest<T>(path: string, options?: RequestInit) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message ?? "Authentication request failed.") as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return data as T;
}

async function setTokenCookies(tokens: TokenPair) {
  const cookieStore = await cookies();
  const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
  cookieStore.set(ACCESS_COOKIE, tokens.access_token, { ...options, maxAge: 60 * 60 * 24 * 20 });
  cookieStore.set(REFRESH_COOKIE, tokens.refresh_token, { ...options, maxAge: 60 * 60 * 10 });
}

async function clearTokenCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}

async function refreshAccessToken() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;
  const tokens = await platziRequest<TokenPair>("/auth/refresh-token", { method: "POST", body: JSON.stringify({ refreshToken }) });
  await setTokenCookies(tokens);
  return tokens.access_token;
}

async function getAuthenticatedUser() {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;

  try {
    return await platziRequest<AuthUser>("/auth/profile", { headers: { Authorization: `Bearer ${accessToken}` } });
  } catch (error) {
    if ((error as { status?: number }).status !== 401) throw error;
    const refreshedAccessToken = await refreshAccessToken();
    if (!refreshedAccessToken) return null;
    return platziRequest<AuthUser>("/auth/profile", { headers: { Authorization: `Bearer ${refreshedAccessToken}` } });
  }
}

export async function loginAction(credentials: { email: string; password: string }) {
  const tokens = await platziRequest<TokenPair>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  await setTokenCookies(tokens);
  return getAuthenticatedUser();
}

export async function signupAction(details: { name: string; email: string; password: string; avatar: string }) {
  const availability = await platziRequest<{ isAvailable: boolean }>("/users/is-available", {
    method: "POST",
    body: JSON.stringify({ email: details.email }),
  });

  if (availability.isAvailable) {
    throw new Error("An account with this email already exists.");
  }

  await platziRequest("/users/", { method: "POST", body: JSON.stringify(details) });
  return loginAction({ email: details.email, password: details.password });
}

export async function sessionAction() {
  return getAuthenticatedUser();
}

export async function logoutAction() {
  await clearTokenCookies();
}
