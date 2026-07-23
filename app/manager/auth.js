import crypto from "crypto";

export function authToken() {
  const secret = process.env.CHALET_MANAGER_SECRET;
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update("chalet-manager-v1").digest("hex");
}