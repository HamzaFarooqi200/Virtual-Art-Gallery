import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  padding: 25px 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: #000000;
  border: 1px solid #919191;
  padding: 12px 0;
  cursor: pointer;
  width: 100%; 
  height: 40px; 
  border-radius: 5px;
  font-size: 14px;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

function ProfileButtons(userProfile) {

  // console.log("Type of userProfile:", typeof userProfile);
  //console.log("Length of userProfile:", userProfile['userProfile']);

  if (!userProfile || userProfile.length === 0) {
    return null; // or display a loading message
  }

  const user = userProfile['userProfile'];
  //console.log("user in profile is as:",user[0]._id);
  
  return (
    <ButtonWrapper>
      <ButtonRow>
        <Button>Edit Profile</Button>
        {/* <Button>Contact</Button> */}
      </ButtonRow>

    </ButtonWrapper>
  );
}

export default ProfileButtons;
