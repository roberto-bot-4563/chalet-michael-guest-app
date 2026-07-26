import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authToken } from "./manager/auth";
import GuideClient from "./GuideClient";

export default async function Page() {
  const cookieStore = await cookies();
  const current = cookieStore.get("cm_manager_auth")?.value;
  const expected = authToken();

  if (!expected || current !== expected) {
    redirect("/login");
  }

  return <GuideClient />;
}
