import React from "react";
import styled from "styled-components";

const ViewDashboardWrapper = styled.div`
  text-align: center;
  padding: 16px 0;
  border-bottom: 1px solid #151515;
`;

const ViewDashboardText = styled.span`
font-weight: bold;
font-size: 24px;
color: #62AC43; /* Coral color */
text-transform: uppercase;
letter-spacing: 2px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

function ViewDashboard() {
  return (
    <ViewDashboardWrapper>
      <br/>
      <br/>
      <br/>
      <br/>
      <ViewDashboardText>Artist Profile</ViewDashboardText>
    </ViewDashboardWrapper>
  );
}

export default ViewDashboard;
