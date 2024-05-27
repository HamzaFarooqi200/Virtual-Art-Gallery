import React, { useState } from 'react';
import "./Login.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useLogin } from '../Hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import  Navbar  from '../Components/Navbar';

//import image from '../images/form pic.jpg';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, isLoading, error] = useLogin();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
    
    setEmail('');
    setPassword('');
    
    if (error) { // Check if there's an error
      // Display the error
      console.log("this error occure at login",error);
    } else{
      navigate('/discoverArt');
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
        <br/>
        <br/>
    <MDBContainer fluid>
      <MDBRow className="justify-content-center">
        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5 mt-10'>
            <MDBIcon fas icon="user fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">VAG</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
            
            
              <MDBInput wrapperClass='mb-4 mx-5 w-100'
               label='Email' id='formControlLg' 
               type='email' size="lg"
               onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' 
              label='Password' id='formControlLg' 
              type='password' size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}/>

              <button className="custom-mdb-button" type="submit" disabled={isLoading} 
                      onClick={onSubmitHandler}>Log In</button>
              
              {error && <div className="error">{error}</div>}

            <p className="small mb-5 pb-lg-3 ms-5"><Link className="text-muted" to="/forgetPage">Forgot password?</Link></p>
            <p className='ms-5'>Don't have an account? <Link
                    to="/signup" className="link-info">Register here</Link></p>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
    </div>
  );
}

export default Login;
