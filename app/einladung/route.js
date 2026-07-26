import { NextResponse } from "next/server";
import { validateInviteToken } from "../auth/invite";

export const runtime = "nodejs";

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token");
  const invite = validateInviteToken(token);

  if (!invite) {
    return NextResponse.redirect(new URL("/login?error=invite", request.url));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("cm_guest_invite", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(0, invite.exp - Math.floor(Date.now() / 1000))
  });
  return response;
}
