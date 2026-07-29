import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authToken } from "./manager/auth";
import { validateInviteToken } from "./auth/invite";
import GuideClient from "./GuideClient";

export default async function Page() {
  const cookieStore = await cookies();
  const current = cookieStore.get("cm_manager_auth")?.value;
  const expected = authToken();

  const isAdmin = !!expected && current === expected;
  const invite = validateInviteToken(cookieStore.get("cm_guest_invite")?.value);

  if (!isAdmin && !invite) {
    redirect("/login");
  }

  return <GuideClient isAdmin={isAdmin} />;
}
