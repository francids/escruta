import useCookie from "../../../hooks/useCookie";
import { Dropdown } from "../ui";

enum ThemeOptions {
  System = "System",
  Light = "Light",
  Dark = "Dark",
}

export default function AppearanceSection() {
  const [theme, setTheme] = useCookie<ThemeOptions>(
    "themePreference",
    ThemeOptions.System
  );

  return (
    <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
      <h2 className="text-xl font-medium mb-4">Appearance</h2>
      <div className="flex items-center gap-4">
        <Dropdown<ThemeOptions>
          options={Object.values(ThemeOptions)}
          selectedOption={theme}
          onSelect={(option) => setTheme(option as ThemeOptions)}
          label="Theme:"
        />
      </div>
    </div>
  );
}
