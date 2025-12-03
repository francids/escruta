import { useTheme } from "@/hooks";
import CommonBar from "../CommonBar";
import { Dropdown } from "@/shared/ui";

export default function AppearanceSection() {
  const { themePreference, setTheme, ThemeOptions } = useTheme();

  return (
    <CommonBar className="flex-col justify-center items-start">
      <h2 className="text-xl font-medium mb-4">Appearance</h2>
      <div className="flex items-center gap-4">
        <Dropdown<(typeof ThemeOptions)[keyof typeof ThemeOptions]>
          options={Object.values(ThemeOptions)}
          selectedOption={themePreference}
          onSelect={(option) =>
            setTheme(option as (typeof ThemeOptions)[keyof typeof ThemeOptions])
          }
          label="Theme: "
        />
      </div>
    </CommonBar>
  );
}
