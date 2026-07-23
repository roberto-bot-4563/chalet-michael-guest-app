import { NextResponse } from "next/server";
import { authToken } from "../../manager/auth";

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.CHALET_MANAGER_PASSWORD;
  const token = authToken();

  if (!expected || !token) {
    return NextResponse.json(
      { ok: false, error: "Manager access is not configured." },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json(
      { ok: false, error: "Invalid password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("cm_manager_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
  return response;
}