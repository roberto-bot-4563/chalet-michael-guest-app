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

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const openPath =
    pathname === "/login" ||
    pathname === "/api/manager-login" ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico";

  if (openPath) return NextResponse.next();

  const expected = await expectedToken();
  const current = request.cookies.get("cm_manager_auth")?.value;
  if (expected && current === expected) return NextResponse.next();

  const login = new URL("/login", request.url);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/:path*"]
};
