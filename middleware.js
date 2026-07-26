import { NextResponse } from "next/server";

async function expectedToken() {
  const secret = process.env.CHALET_MANAGER_SECRET;
  if (!secret) return null;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("chalet-manager-v1"));
  return Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function validInvite(token) {
  try {
    const secret = process.env.CHALET_MANAGER_SECRET;
    if (!secret || !token) return false;
    const [payload, supplied] = token.split(".");
    if (!payload || !supplied) return false;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expected = Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, "0")).join("");
    if (expected !== supplied) return false;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const data = JSON.parse(atob(json));
    if (!data.id || !data.exp || data.exp <= Math.floor(Date.now() / 1000)) return false;
    const revoked = (process.env.CHALET_REVOKED_INVITES || "").split(",").map(x => x.trim()).filter(Boolean);
    return !revoked.includes(data.id);
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const openPath =
    pathname === "/login" ||
    pathname === "/einladung" ||
    pathname === "/api/manager-login" ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico";

  if (openPath) return NextResponse.next();

  const expected = await expectedToken();
  const current = request.cookies.get("cm_manager_auth")?.value;
  if (expected && current === expected) return NextResponse.next();
  if (await validInvite(request.cookies.get("cm_guest_invite")?.value)) return NextResponse.next();

  const login = new URL("/login", request.url);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/:path*"]
};
