import { useState } from "react";
import { Button, Modal, TextField } from "../../components/ui";
import type User from "../../../auth/interfaces/User";
import CommonBar from "../CommonBar";

interface AccountSectionProps {
  user: User | null;
}

export default function AccountSection({ user }: AccountSectionProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const handleEmailChange = () => {
    if (!email) {
      setErrorEmailMessage("Email cannot be empty");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmailMessage("Invalid email format");
      return;
    }

    console.log("Changing email");
    setIsEmailModalOpen(false);
    resetEmailFields();
  };

  const resetEmailFields = () => {
    setEmail(user?.email || "");
    setErrorEmailMessage("");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setErrorPasswordMessage("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setErrorPasswordMessage("Password must be at least 8 characters");
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
    setErrorPasswordMessage("");
  };

  return (
    <CommonBar className="flex-col justify-center items-start">
      <h2 className="text-xl font-medium mb-4">Account</h2>
      <div className="space-y-4">
        {user && (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member Since
                </p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setIsEmailModalOpen(true)}>
            Change Email
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change Password
          </Button>
        </div>
      </div>

      {/* Email Change Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => {
          setIsEmailModalOpen(false);
          resetEmailFields();
        }}
        title="Change Email"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEmailModalOpen(false);
                resetEmailFields();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEmailChange}
              disabled={!email}
            >
              Change Email
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          {errorEmailMessage && (
            <div className="text-red-500 text-sm">{errorEmailMessage}</div>
          )}
        </div>
      </Modal>

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
          {errorPasswordMessage && (
            <div className="text-red-500 text-sm">{errorPasswordMessage}</div>
          )}
        </div>
      </Modal>
    </CommonBar>
  );
}
