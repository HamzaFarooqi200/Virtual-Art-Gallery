import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsOtpSent(true);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }

    setIsLoading(false);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setError('');
        navigate('/login');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mt-5">
          <MDBCol md="6">
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBIcon fas icon="lock fa-3x me-3" style={{ color: '#709085' }} />
              <span className="h1 fw-bold mb-0">Forgot Password</span>
            </div>

            {!isOtpSent ? (
              <form onSubmit={sendOtp} className="d-flex flex-column pt-4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button
                  className="custom-mdb-button"
                  type="submit"
                  disabled={isLoading}
                >
                  Send OTP
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            ) : (
              <form onSubmit={resetPassword} className="d-flex flex-column pt-4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="OTP"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="New Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <button
                  className="custom-mdb-button"
                  type="submit"
                  disabled={isLoading}
                >
                  Reset Password
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ForgotPassword;
