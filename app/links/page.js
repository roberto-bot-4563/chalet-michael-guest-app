import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authToken } from "../manager/auth";
import LinkGenerator from "./LinkGenerator";

export default async function LinksPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("cm_manager_auth")?.value !== authToken()) redirect("/");
  return <LinkGenerator />;
}
