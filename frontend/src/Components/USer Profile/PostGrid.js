import React from "react";
import styled from "styled-components";

const GridWrapper = styled.div`
  margin-top: 4px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(4, 1fr);
  max-width: 100%; /* Adjust the max-width as needed */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function PostGrid({ userArts }) {
  return (
    <GridWrapper>
      {userArts.map((artwork, index) => (
        <img
          key={index}
          src={require(`../../uploads/uploadedImages/${artwork.image}`)}
          alt={artwork.title}
        />
      ))}
    </GridWrapper>
  );
}

export default PostGrid;
