import useCookie from "../../../hooks/useCookie";
import CommonBar from "../CommonBar";
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
    <CommonBar className="flex-col justify-center items-start">
      <h2 className="text-xl font-medium mb-4">Appearance</h2>
      <div className="flex items-center gap-4">
        <Dropdown<ThemeOptions>
          options={Object.values(ThemeOptions)}
          selectedOption={theme}
          onSelect={(option) => setTheme(option as ThemeOptions)}
          label="Theme:"
        />
      </div>
    </CommonBar>
  );
}
