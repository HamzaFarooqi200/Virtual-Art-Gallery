import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import Select from 'react-select'; // Import the Select component
import './SignUp.css';
import { useSignUp } from '../Hooks/useSignUp';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';


function SignUp() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const [signUp, isLoading, error] = useSignUp();
  const navigate = useNavigate();

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('gender', gender);
    formData.append('image', file);

    console.log('Form Data:', formData);
    await signUp(formData);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setDateOfBirth('');
    setGender('');
    setFile(null);
    setPreview(null);

    // In the SignUp component, after successful sign-up
    if (!error) {
      console.log('Email for the OTP:', email);
      navigate('/otpVerification', { state: { email } });
    }
    
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
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mt-10">
          <MDBCol md="6">
          <div className="d-flex flex-row ps-5 pt-5 mt-10">
              <MDBIcon fas icon="user-plus fa-3x me-3" style={{ color: '#709085' }} />
                <span className="h1 fw-bold mb-0">VAG</span>
          </div>

            <div className="d-flex flex-column pt-4">
              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>
                Sign Up
              </h3>

              <MDBInput
                wrapperClass="mb-4"
                label="First Name"
                id="formControlLg"
                type="text"
                size="lg"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Last Name"
                id="formControlLg"
                type="text"
                size="lg"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />

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
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Date Of Birth"
                id="formControlLg"
                type="date"
                size="lg"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
              />

              <label className="mb-2">Gender</label>
              <Select
                className="mb-4"
                options={genderOptions}
                onChange={(selectedOption) => setGender(selectedOption.value)}
                value={genderOptions.find((option) => option.value === gender)}
              />

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                Profile Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                />
              </div>

              {preview && (
                <div className="mb-4" style={{ maxWidth: '300px' }}>
                  <label className="block text-sm font-medium text-gray-600">Preview:</label>
                  <div className="mt-1 p-2 border border-gray-300 rounded-md">
                    <img src={preview} alt="Preview" className="w-full" />
                  </div>
                </div>
              )}

              <button
                className="custom-mdb-button"
                type="submit"
                disabled={isLoading}
                onClick={onSubmitHandler}
              >
                Sign Up
              </button>

              {error && <div className="error">{error}</div>}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
    </div>
  );
}

export default SignUp;
