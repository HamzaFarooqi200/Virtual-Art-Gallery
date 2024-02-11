import React from "react";
import styled from "styled-components";

const AboutWrapper = styled.div`
  padding: 5px 20px;
`;

const ProfileName = styled.h2`
  color: #000000;
  margin: 0;
  font-weight: 500;
  font-size: 18px;
`;

const ProfileCategory = styled.span`
  color: #919191;
  font-size: 15px;
`;

const BioText = styled.span`
  color: #000000;
  display: block;
  margin-top: 3px;
`;

const BioLink = styled.a`
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  color: #3d83b6;
  margin-top: 3px;
`;

function About({ userProfile }) {
  // Check if userProfile is defined and not an empty array
  if (!userProfile || userProfile.length === 0) {
    return null; // or display a loading message
  }

  const user = userProfile[0];

  return (
    <AboutWrapper>
      <ProfileName><b>{`${user.firstName} ${user.lastName}`}</b></ProfileName>
      <ProfileCategory>{user.country}</ProfileCategory>
      <BioText>📒Member Since {new Date(user.createdAt).getFullYear()}</BioText>
    </AboutWrapper>
  );
}

export default About;
