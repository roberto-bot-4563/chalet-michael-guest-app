import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authToken } from "../../manager/auth";
import { createInviteToken } from "../../auth/invite";

export const runtime = "nodejs";

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("cm_manager_auth")?.value !== authToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { label, expiresAt } = await request.json();
  const expiry = new Date(expiresAt);
  const now = Date.now();
  const latest = now + 180 * 24 * 60 * 60 * 1000;
  if (!label?.trim() || !Number.isFinite(expiry.getTime()) || expiry.getTime() <= now || expiry.getTime() > latest) {
    return NextResponse.json({ error: "Bitte einen Namen und ein gültiges Ablaufdatum innerhalb der nächsten 180 Tage eingeben." }, { status: 400 });
  }

  const token = createInviteToken({ label: label.trim(), expiresAt: expiry });
  const url = `${new URL(request.url).origin}/einladung?token=${encodeURIComponent(token)}`;
  const id = token.split(".")[0];
  const payload = JSON.parse(Buffer.from(id, "base64url").toString("utf8"));
  return NextResponse.json({ url, inviteId: payload.id, expiresAt: expiry.toISOString() });
}
