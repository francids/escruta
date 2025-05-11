import { useState } from "react";
import { Button, Dropdown, Modal, TextField } from "../components/ui";
import useCookie from "../../hooks/useCookie";

enum ThemeOptions {
  System = "System",
  Light = "Light",
  Dark = "Dark",
}

export default function SettingsPage() {
  const [theme, setTheme] = useCookie<ThemeOptions>(
    "themePreference",
    ThemeOptions.System
  );

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    console.log("Changing password");
    setIsPasswordModalOpen(false);
    resetPasswordFields();
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
        <h1 className="text-3xl font-sans font-normal">Settings</h1>
      </div>

      {/* Appearance Section */}
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

      {/* Account Section */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-medium mb-4">Account</h2>
        <div className="space-y-4">
          <Button onClick={() => setIsPasswordModalOpen(true)}>
            Change Password
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-medium mb-4">About</h2>
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">Escruta v1.0.0</p>
          <p className="text-gray-700 dark:text-gray-300">
            Made with ❤️ by the Escruta Team
          </p>
        </div>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          resetPasswordFields();
        }}
        title="Change Password"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsPasswordModalOpen(false);
                resetPasswordFields();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePasswordChange}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              Change Password
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="current-password"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoFocus
          />
          <TextField
            id="new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
      </Modal>
    </div>
  );
}
