// App.js

import React from "react";
import { Design } from "./Components/ScreenDesign/Design";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Team from "./Pages/Team";
import Profile from "./Components/USer Profile/Profile";
import { BrowserRouter, Routes, Route, Navigate , useLocation} from "react-router-dom";
//import Home from './Pages/Home';
//import Navbar from './Components/Navbar';
// import { useLogout } from './Hooks/useLogout';
import UploadArtWork from "./Pages/UploadForm/uploadArtWork";
//import ShopPage from './Pages/ShowArt';
import NewItem from "./Components/showArtcomponent/showArt";
import useAuthenticationContextHook from "./Hooks/useAuthenticationContextHook";
import ForgetPage from "./Pages/ForgetPage";
import { AddCart } from "./Components/showArtcomponent/AddCart";
import OTPVerification from "./Pages/OTPVerification";

import "./App.css";

const App = () => {
  const { user } = useAuthenticationContextHook();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={<ElementShopPage/>}
          /> */}

          <Route path="/" element={<Design />} />
          <Route path="/AddCart" element={user ? <AddCart /> : <Navigate to="/login" />} />

          <Route
            path="/uploadArt"
            element={user ? <UploadArtWork /> : <Navigate to="/login" />}
          />

          <Route
            path="/discoverArt"
            element={user ? <NewItem /> : <Navigate to="/login" />}
          />

          <Route
            path="/home"
            element={user ? <Design /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/login" />}
          />

          <Route 
          path="/otpVerification" 
          element= {<OTPVerification />} />

          <Route path="/forgetPage" element={<ForgetPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/login" />}
          />
          <Route
            path="/team"
            element={user ? <Team /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
