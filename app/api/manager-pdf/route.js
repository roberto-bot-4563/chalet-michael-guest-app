import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authToken } from "../../manager/auth";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const current = cookieStore.get("cm_manager_auth")?.value;
  const expected = authToken();

  if (!expected || current !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), "private", "Chalet_Manager_Checkliste.pdf");
  const file = await fs.readFile(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Chalet_Manager_Checkliste.pdf"',
      "Cache-Control": "private, no-store"
    }
  });
}
