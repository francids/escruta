import useCookie from "../../hooks/useCookie";
import type User from "../../auth/interfaces/User";
import { AccountSection, AppearanceSection } from "../components/settings";
import CommonBar from "../components/CommonBar";

export default function SettingsPage() {
  const [user] = useCookie<User | null>("user", null);

  return (
    <div className="p-6">
      <CommonBar>
        <h1 className="text-3xl font-sans font-normal">Settings</h1>
      </CommonBar>
      <AppearanceSection />
      <AccountSection user={user!} />
    </div>
  );
}
