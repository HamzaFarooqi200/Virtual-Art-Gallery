import React, { useState } from 'react';
import './OTPVerification.css'; // Import the CSS file
import { useNavigate , useLocation} from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Access the email prop using useLocation
  const email = useLocation().state.email;

  console.log('Email for authentication in the form is as:', email);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
  
      // Log the raw response
      console.log('Raw response:', response);
  
      // Check if the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
  
        if (response.ok) {
          setMessage(data.message);
          setError('');
          navigate('/discoverArt');
        } else {
          setError(data.error);
          setMessage('');
        }
      } else {
        const text = await response.text();
        console.log("----------------------",text);
        throw new Error(`Unexpected content type: ${contentType}\nResponse body: ${text}`);
      }
    } catch (err) {
      console.error('An error occurred while verifying the OTP:', err);
      setError('An error occurred while verifying the OTP.');
      setMessage('');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="disabled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Verify</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default OTPVerification;
