import { useState, useEffect } from "react";
import { Button, Modal, Spinner, TextField } from "@/shared/ui";
import CommonBar from "../CommonBar";
import { useAuth, useFetch } from "@/hooks";
import { CheckIcon } from "@/shared/icons";

export default function AccountSection() {
  const { logout, currentUser: user, fetchUserData } = useAuth();

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState(user?.fullName || "");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const { loading: isUpdatingName, refetch: updateName } = useFetch<string>(
    "/users/change-name",
    {
      method: "POST",
      params: { newFullName },
      onSuccess: () => {
        setIsNameModalOpen(false);
        fetchUserData();
      },
      onError: (error) => {
        setErrorNameMessage(error.message || "Unknown error");
        console.error("Error updating name:", error);
      },
    },
    false
  );

  const { loading: isChangingPassword, refetch: changePassword } =
    useFetch<string>(
      "/users/change-password",
      {
        method: "POST",
        data: {
          currentPassword,
          newPassword,
        },
        onSuccess: () => {
          setIsPasswordModalOpen(false);
          resetPasswordFields();
          logout();
        },
        onError: (error) => {
          setErrorPasswordMessage(error.message || "Unknown error");
          console.error("Error changing password:", error);
        },
      },
      false
    );

  const checkPasswordStrength = (password: string) => {
    const criteria = [
      {
        valid: password.length >= 8,
        message: "Password must be at least 8 characters.",
      },
      {
        valid: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter.",
      },
      {
        valid: /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter.",
      },
      {
        valid: /[0-9]/.test(password),
        message: "Password must contain at least one number.",
      },
    ];

    const failedCriterion = criteria.find((criterion) => !criterion.valid);

    return {
      isValid: !failedCriterion,
      errorMessage: failedCriterion ? failedCriterion.message : "",
      lengthCriteria: criteria[0].valid,
      uppercaseCriteria: criteria[1].valid,
      lowercaseCriteria: criteria[2].valid,
      numberCriteria: criteria[3].valid,
    };
  };

  useEffect(() => {
    if (passwordTouched) {
      const validationResult = checkPasswordStrength(newPassword);
      setErrorPasswordMessage(validationResult.errorMessage);
    }
  }, [newPassword, passwordTouched]);

  const handlePasswordChange = () => {
    if (!currentPassword.trim()) {
      setErrorPasswordMessage("Current password is required.");
      return;
    }

    if (!newPassword.trim()) {
      setErrorPasswordMessage("New password is required.");
      return;
    }

    const passwordValidation = checkPasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      setErrorPasswordMessage(passwordValidation.errorMessage);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorPasswordMessage("Passwords don't match");
      return;
    }
    changePassword();
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorPasswordMessage("");
    setPasswordTouched(false);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (!passwordTouched) {
      setPasswordTouched(true);
    }
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
                  Full name
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
                  Member since
                </p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated
                </p>
                <p className="font-medium">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setIsNameModalOpen(true)}>
            Change name
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change password
          </Button>
        </div>
      </div>

      {/* Name Change Modal */}
      <Modal
        isOpen={isNameModalOpen}
        onClose={() => {
          setIsNameModalOpen(false);
          setNewFullName(user?.fullName || "");
          setErrorNameMessage("");
        }}
        title="Change full name"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsNameModalOpen(false);
                setNewFullName(user?.fullName || "");
                setErrorNameMessage("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => updateName()}
              disabled={!newFullName || isUpdatingName}
              icon={isUpdatingName ? <Spinner /> : <CheckIcon />}
            >
              {isUpdatingName ? "Updating" : "Update name"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="full-name"
            label="Full name"
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
          {errorNameMessage && (
            <div className="text-red-500 text-sm">{errorNameMessage}</div>
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
        title="Change password"
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
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                isChangingPassword
              }
              icon={isChangingPassword ? <Spinner /> : <CheckIcon />}
            >
              {isChangingPassword ? "Changing" : "Change password"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="current-password"
            label="Current password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
          />
          <TextField
            id="new-password"
            label="New password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            autoComplete="new-password"
          />
          <TextField
            id="confirm-password"
            label="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Password must be at least 8 characters long, contain uppercase and
            lowercase letters, and include at least one number. Your session
            will be closed after changing your password.
          </p>
          {errorPasswordMessage && (
            <div className="text-red-500 text-sm">{errorPasswordMessage}</div>
          )}
        </div>
      </Modal>
    </CommonBar>
  );
}
