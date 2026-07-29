import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authToken } from "../../manager/auth";

export const runtime = "nodejs";

async function isManager() {
  const cookieStore = await cookies();
  const expected = authToken();
  return Boolean(expected && cookieStore.get("cm_manager_auth")?.value === expected);
}

function database() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS chalet_project_data (
      id INTEGER PRIMARY KEY,
      projects JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET() {
  if (!(await isManager())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const sql = database();
  if (!sql) {
    return NextResponse.json(
      { error: "Die Datenbank ist noch nicht verbunden." },
      { status: 503 }
    );
  }

  await ensureTable(sql);
  const rows = await sql`
    SELECT projects, updated_at
    FROM chalet_project_data
    WHERE id = 1
  `;

  return NextResponse.json({
    projects: rows[0]?.projects ?? null,
    updatedAt: rows[0]?.updated_at ?? null,
  });
}

export async function PUT(request) {
  if (!(await isManager())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const sql = database();
  if (!sql) {
    return NextResponse.json(
      { error: "Die Datenbank ist noch nicht verbunden." },
      { status: 503 }
    );
  }

  const body = await request.json();
  if (!Array.isArray(body.projects) || body.projects.length > 500) {
    return NextResponse.json({ error: "Ungültige Projektliste." }, { status: 400 });
  }

  await ensureTable(sql);
  const json = JSON.stringify(body.projects);
  const rows = await sql`
    INSERT INTO chalet_project_data (id, projects, updated_at)
    VALUES (1, ${json}::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET projects = EXCLUDED.projects, updated_at = NOW()
    RETURNING updated_at
  `;

  return NextResponse.json({ ok: true, updatedAt: rows[0].updated_at });
}
