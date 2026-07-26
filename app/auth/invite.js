import crypto from "crypto";

function secret() {
  return process.env.CHALET_MANAGER_SECRET || "";
}

function signature(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createInviteToken({ label, expiresAt }) {
  if (!secret()) throw new Error("Access secret is not configured.");
  const data = {
    id: crypto.randomUUID(),
    label: String(label || "Gast").slice(0, 80),
    exp: Math.floor(new Date(expiresAt).getTime() / 1000)
  };
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function validateInviteToken(token) {
  try {
    if (!secret() || !token) return null;
    const [payload, supplied] = token.split(".");
    if (!payload || !supplied) return null;
    const expected = signature(payload);
    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.id || !data.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    const revoked = (process.env.CHALET_REVOKED_INVITES || "").split(",").map(x => x.trim()).filter(Boolean);
    if (revoked.includes(data.id)) return null;
    return data;
  } catch {
    return null;
  }
}
