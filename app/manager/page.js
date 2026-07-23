import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authToken } from "./auth";
import ManagerClient from "./ManagerClient";

export default async function ManagerPage() {
  const cookieStore = await cookies();
  const current = cookieStore.get("cm_manager_auth")?.value;
  const expected = authToken();

  if (!expected || current !== expected) {
    redirect("/manager/login");
  }

  return <ManagerClient />;
}