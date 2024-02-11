import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ViewDashboard from "./ViewDashboard";
import ProfileDetails from "./ProfileDetails";
import About from "./About";
import ProfileButtons from "./ProfileButtons";
// import Highlights from "./Highlights";
//import TopNav from "./TopNav";
import PostGrid from "./PostGrid";
import Navbar from "../Navbar";

const ProfileWrapper = styled.div`
  background-color: #FFFFFF;
  max-width: 100%;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function Profile() {
   
  const [userProfile, setUserProfile] = useState({});
  const [hasError, setHasError] = useState(false);
  const [userArts, setUserArts] = useState({});

  useEffect(() => {
    const fetchUserProfileName = async () => {
      try {
        const currentUser = localStorage.getItem('email');
        console.log(currentUser)
        const response = await fetch(`/api/userProfile/getUserProfileData?email=${currentUser}`, {
          method: "GET"
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log("User data:", userData); // Log the user data
          setUserProfile(userData);
        } else {
          // Handle error if necessary
          console.error("Error fetching user profile. Status:", response.status);
          setHasError(true);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        setHasError(true);
      }
    };

     const fetchUserProfileStatics = async () => {
      try {
        const currentUser = localStorage.getItem('email');
        const response = await fetch(`/api/userProfile/getUserArtWorks?email=${currentUser}`, {
          method: "GET"
        });
      
        if (response.ok) {
          const userArts = await response.json();
          console.log(userArts)
          setUserArts(userArts);
        } else {
          // Handle error if necessary
          setHasError(true);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        setHasError(true);
      }
    };

    fetchUserProfileName();
    fetchUserProfileStatics();
  }, []);
  

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <ProfileWrapper>
        {/* <TopNav /> */}
        <ViewDashboard />
        {userProfile.length > 0 && userArts.length > 0 ? (
          <ProfileDetails  userProfile={userProfile}  userArts={userArts} />
        ) : (
          <p>Loading...</p>
        )}
        
        {userProfile.length > 0 ? (
          <About userProfile={userProfile} />
        ) : (
          <p>Loading...</p>
        )}
        <ProfileButtons />
        {userArts.length > 0 ? ( <PostGrid  userArts={userArts}/> ): ( <p>Loading...</p> )}
      </ProfileWrapper>
    </div>
  );
}
  
export default Profile;
