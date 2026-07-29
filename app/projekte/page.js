import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authToken } from "../manager/auth";
import ProjectBoard from "./ProjectBoard";

export const metadata = {
  title: "Projekte | Chalet Michael",
  description: "Projektplanung für Chalet Michael in Grächen",
};

export default async function ProjektePage() {
  const cookieStore = await cookies();
  const expected = authToken();
  if (!expected || cookieStore.get("cm_manager_auth")?.value !== expected) {
    redirect("/login?next=/projekte");
  }

  return <ProjectBoard />;
}
