import styled from "styled-components";
import { Button } from "./ShowArt/button";
// import {
//   DropdownMenuTrigger,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuContent,
//   DropdownMenu,
// } from "./ShowArt/dropdown-menu";
import { CardHeader, CardContent, Card, CardFooter } from "./ShowArt/card";
import { ScrollArea } from "./ShowArt/scroll-area";
import { React, useState } from "react";
//import dp from "../showArtcomponent/placeholder.jpg";
//import reel from "../../images/hamzaPic.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar";

export default function NewItem() {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [hasError, setError] = useState(false);

  // const [userDetails, setUserDetails] = useState({});
  // const [userDetailsError, setUserDetailsError] = useState(false);

  const handleButtonClick = () => {
    console.log("Button clicked");
    setIsDropdownVisible((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  async function fetchArtworks() {
    try {
      const response = await fetch("api/artworks/allArtworks");
      const data = await response.json();

      // Fetch user details for each artwork
      const artworksWithUserDetails = await Promise.all(
        data.map(async (artwork) => {
          const userResponse = await fetch(
            `/api/userProfile/getUserProfileData?email=${artwork.uploadedBy}`
          );
          const userData = await userResponse.json();
          return {
            ...artwork,
            userDetails: userData,
          };
        })
      );
      setArtworks(artworksWithUserDetails);
      //console.log("These are the Artworks with user details: ", artworksWithUserDetails);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchArtworks();
  });

  //add to art dunction
  async function addToCart(id, description, price, image) {
    console.log("Add to cart Button has been clicked");
    const email = localStorage.getItem("email");
    console.log(email);

    try {
      const response = await fetch("api/carts/uploadCart", {
        method: "POST",
        body: JSON.stringify({
          currentUser: email,
          artid: id,
          price: price,
          description: description,
          image: image,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      alert("Item Added To Cart");
      console.log("Cart item data here ");
      console.log(data);
      navigate("/AddCart");
    } catch (err) {
      alert("Something Went Wrong");
      console.log(err);
    }
  }

  const ProfileImage = styled.img`
    max-width: 80px;
    border: 1px solid #919191;
    border-radius: 60%;
    padding: 5px;
    flex-basis: 40%;
  `;
  console.log("artworks are as", artworks);
  return (
    <div>

      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="grid place-items-center gap-4">
        <Card className="rounded-none shadow-none border-0 mt-8 w-full">
          <CardHeader className="p-4 flex flex-row items-center justify-between mt-8">
            <h2 className="text-lg font-semibold">Filters</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-2 w-full grid gap-4 md:flex md:flex-wrap justify-center">
              <div className="flex items-center">
                <input
                  className="mr-2 h-6 w-6" // Increase checkbox size
                  id="category1"
                  name="category1"
                  type="checkbox"
                  value="Category 1"
                />
                <label htmlFor="category1" className="text-lg">
                  Painting
                </label>{" "}
                {/* Increase font size */}
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 h-6 w-6" // Increase checkbox size
                  id="category2"
                  name="category2"
                  type="checkbox"
                  value="Category 2"
                />
                <label htmlFor="category2" className="text-lg">
                  Sketching
                </label>{" "}
                {/* Increase font size */}
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 h-6 w-6" // Increase checkbox size
                  id="category3"
                  name="category3"
                  type="checkbox"
                  value="Category 3"
                />
                <label htmlFor="category3" className="text-lg">
                  Photography
                </label>{" "}
                {/* Increase font size */}
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 h-6 w-6" // Increase checkbox size
                  id="category4"
                  name="category4"
                  type="checkbox"
                  value="Category 4"
                />
                <label htmlFor="category4" className="text-lg">
                  Calligraphy
                </label>{" "}
                {/* Increase font size */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container">
        <div className="row">
          {artworks.map((artwork) => (
            <div className="col-md-12" key={artwork._id}>
              <ScrollArea className="border border-success-subtle">
                
                  <div className="ml-20 flex items-center gap-5 text-sm font-semibold">
                    {artwork.userDetails.map((userDetail) => (
                      <div
                        className="flex mt-5 items-center justify-center"
                        key={userDetail.id}
                      >
                        <ProfileImage
                          src={require(`../../uploads/ProfileImage/${userDetail.image}`)}
                        />
                        <div className="fs-3 mt-10 ml-5 ">
                          {userDetail.firstName} <hr></hr>
                        </div>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                  <div className="fs-3 mt-5 mb-2 ml-5">
                    {artwork.description} 😃👍
                  </div>
                  <hr></hr>

                <div className="col-md-11 ml-10 mr-10 border border-black">
                  <Card
                    key={artwork._id}
                    className="rounded-none shadow-none border-2"
                  >
                    
                    <div className="aspect-ratio aspect-w-16 aspect-h-9">
                      <img
                        alt="Artwork Here"
                        className="object-cover w-full h-full"
                        src={require(`../../uploads/${artwork.image}`)}
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                    <hr />
                   
                    <div className="fw-bolder text-center">
                      <h1>Price: ${artwork.price}</h1>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button className="btn btn-success mr-2" variant="ghost">
                        <div className="flex items-center justify-center">
                          <HeartIcon className="w-5 h-5" />
                        </div>
                      </Button>
                      <Button
                        className="btn btn-success mr-2 ml-2"
                        variant="ghost"
                      >
                        <div className="flex items-center justify-center">
                          <BookmarkIcon
                            className="w-5 h-5"
                            onClick={(e) =>
                              addToCart(
                                artwork._id,
                                artwork.description,
                                artwork.price,
                                artwork.image
                              )
                            }
                          />
                        </div>
                      </Button>
                      <Button className="btn btn-success" variant="ghost">
                        <div className="flex items-center justify-center">
                          <ShoppingBagIcon className="w-5 h-5" />
                        </div>
                      </Button>
                    </div>

                    <br></br>
                  </Card>
                </div>
                <br></br>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

// function FileWarningIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
//       <path d="M12 9v4" />
//       <path d="M12 17h.01" />
//     </svg>
//   );
// }

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

// function MoreHorizontalIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="1" />
//       <circle cx="19" cy="12" r="1" />
//       <circle cx="5" cy="12" r="1" />
//     </svg>
//   );
// }

function ShoppingBagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// function StarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="18"
//       height="18"
//       viewBox="0 0 20 20"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   );
// }
