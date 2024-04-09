import { useState } from "react";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email, newPassword, confirmPassword, navigate) => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("/api/users/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword
        })
      });

      if (response.ok) {
        setIsLoading(false);
        navigate('/login');
      } else {
        setIsLoading(false);
        setError('Password reset failed');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Error during password reset');
    }
  };

  return forgotPassword;
};
