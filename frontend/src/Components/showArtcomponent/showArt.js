import styled from "styled-components";
import { Button } from "./ShowArt/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "./ShowArt/dropdown-menu";
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
          const userResponse = await fetch(`/api/userProfile/getUserProfileData?email=${artwork.uploadedBy}`);
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
    border-radius: 50%;
    padding: 4px;
    flex-basis: 40%;
  `;
  console.log("artworks are as" ,artworks)
  return (
    <div>
      <div>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
      {artworks.map((artwork) => (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 md:p-6">
      
        <div className="flex-grow lg:w-1/3">
          <ScrollArea className="h-[650px]">
            <div className="grid gap-4">
              <Card className="rounded-none shadow-none border-0">
                <CardHeader className="p-5 flex flex-row items-center">
                  <div
                    className="flex items-center gap-5 text-sm font-semibold"
                    href="#"
                  >
        
              {artwork.userDetails.map((userDetail) => ( 
                <div>
                  <ProfileImage src={require(`../../uploads/ProfileImage/${userDetail.image}`)} />
                  {userDetail.firstName}
                </div>
              ))}



                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="ml-10 w-8 h-8 rounded-full "
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontalIcon
                            className="w-4 h-4"
                            onClick={handleButtonClick}
                          />
                        </Button>
                      </DropdownMenuTrigger>

                      {isDropdownVisible && (
                        <DropdownMenuContent onClick={closeDropdown}>
                          <div
                            className="border border-gray-20 bg-white top-0 right-0 mt-2 ml-6"
                            style={{
                              boxShadow: "10px 10px 5px #888888",
                              padding: "10px",
                            }}
                          >
                            <DropdownMenuItem>
                              <div className="ml-3 flex">
                                <BookmarkIcon className="row" />
                                <div className="ml-4">Save</div>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <div className="ml-3 flex">
                                <StarIcon className="row" />
                                <div className="ml-4">Add to favorites</div>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <hr />
                            <DropdownMenuItem>
                              <div className="ml-3 flex">
                                <FileWarningIcon className="row" />
                                <div className="ml-4">Report</div>
                              </div>
                            </DropdownMenuItem>
                          </div>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </div>
                  {/* </div> */}
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-2 text-sm w-full grid gap-1.5">
            
                      {artwork.description} 😃👍
                  
                  </div>

                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
        <>
          <ScrollArea className="h-[650px]">
            <div className="grid gap-4">
             
                <Card
                  key={artwork._id}
                  className="rounded-none shadow-none border-0"
                >
                  <CardContent className="p-0">
                    <img
                      alt="Artwork Here"
                      className="aspect-square object-cover"
                      height={600}
                      //Dynamic Image SRC
                      src={require(`../../uploads/${artwork.image}`)}
                      //src={reel}
                      width={500}
                    />

                    <div
                      style={{
                        display: "flex",
                        marginTop: "15px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        position: "center",
                      }}
                    >
                      <Button className="btn btn-success mr-2" variant="ghost">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <HeartIcon className="w-4 h-4" />
                        </div>
                      </Button>

                      {/* new changes */}

                      <Button className="btn btn-success mr-2" variant="ghost">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <BookmarkIcon
                            className="w-4 h-4"
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ShoppingBagIcon className="w-4 h-4" />
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
      
            </div>
          </ScrollArea>
        </>
        <div className="flex-grow lg:w-1/3">
          <ScrollArea className="h-[250px]">
            <div className="grid gap-4">
              <Card className="rounded-none shadow-none border-0 mt-8">
                <CardHeader className="p-4 flex flex-row items-center justify-between mt-8">
                  <h2 className="text-lg font-semibold">Filters</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-2 text-sm w-full grid gap-1.5">
                    <div className="flex items-center">
                      <input
                        className="mr-2"
                        id="category1"
                        name="category1"
                        type="checkbox"
                        value="Category 1"
                      />
                      <label htmlFor="category1">Painting</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="mr-2"
                        id="category2"
                        name="category2"
                        type="checkbox"
                        value="Category 2"
                      />
                      <label htmlFor="category2">Sketching</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="mr-2"
                        id="category3"
                        name="category3"
                        type="checkbox"
                        value="Category 3"
                      />
                      <label htmlFor="category3">Photography</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="mr-2"
                        id="category4"
                        name="category4"
                        type="checkbox"
                        value="Category 4"
                      />
                      <label htmlFor="category4">Calligraphy</label>
                    </div>
                  </div>
                </CardContent>
                <>
                  <CardFooter className="p-4 flex flex-row items-center justify-between">
                    {" "}
                    
                      <h2 className="text-lg font-semibold">
                        Price: ${artwork.price}
                      </h2>

                  </CardFooter>
                </>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    ))}
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

function FileWarningIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

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

function MoreHorizontalIcon(props) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

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

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}