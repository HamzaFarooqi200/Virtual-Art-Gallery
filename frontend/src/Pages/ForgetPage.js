import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useForgotPassword } from "../Hooks/useForgotPassword"; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = useForgotPassword(); // Updated usage of useForgotPassword hook

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the forgotPassword function from the hook
      await forgotPassword(email, newPassword, confirmPassword, navigate);

      // If successful, navigate to a confirmation page or handle accordingly
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="forgot-password-container">
          <MDBContainer fluid>
            <MDBRow className="justify-content-center">
              <MDBCol md="6">
                <div className="d-flex flex-row ps-5 pt-5 mt-10">
                  <MDBIcon fas icon="lock fa-3x me-3" style={{ color: '#709085' }} />
                  <span className="h1 fw-bold mb-0">Forgot Password</span>
                </div>

                <div className="d-flex flex-column pt-4">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </button>

                  {error && <div className="error">{error}</div>}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
