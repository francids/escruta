import useCookie from "../../hooks/useCookie";
import type User from "../../auth/interfaces/User";
import { AppearanceSection, AccountSection } from "../components/settings";

export default function SettingsPage() {
  const [user] = useCookie<User | null>("user", null);

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
        <h1 className="text-3xl font-sans font-normal">Settings</h1>
      </div>
      <AppearanceSection />
      <AccountSection user={user} />
    </div>
  );
}
