import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import FooterComponent from "../Footer/Footer";

export const AddCart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayload] = useState({ subTotal: 0 });
  const [hasError, setError] = useState(false);

  async function fetchCart() {
    try {
      const res = await fetch("api/carts/allCarts");
      const data = await res.json();

      console.log("the response of cart data ", data);
      setCarts(data); 
      calculateSubtotal(data);
    } catch (error) {
      setError(error);
    }
  }

  // Calculate subtotal based on cart items
  const calculateSubtotal = (cartItems) => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += item.price;
    });
    setPayload({ subTotal });
  };

    // Function to handle emptying the cart
    const handleEmptyCart = async () => {
      try {
        const res = await fetch("api/carts/deleteAllCartItems", {
          method: "DELETE", // The method is DELETE
        });
  
        if (res.ok) {
          // Cart emptied successfully, fetch the updated cart
          fetchCart();
        } else {
          // Handle error if necessary
          console.error("Failed to empty the cart");
        }
      } catch (error) {
        console.error("Error while emptying the cart", error);
      }
    };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
       <React.Fragment>
        <br></br>
        <Navbar />
        <br></br>
       <br></br>
            
       <div className="border border-black">
       <h1 className="text-uppercase fs-1 fw-bold text-center text-bg-info text-white h-100 mt-14">Cart Listing</h1>
        
       
        {carts && carts.length > 0 ? (
                      carts.map((item, i) => (
                        
                        <div className="container border border-black d-flex justify-content-around">
                          <>
                          <div className="text-center p-2">
                          <img
                           height={900}
                           width={900}
                            src={require(`../../uploads/uploadedImages/${item.image}`)}
                            alt={item.name} />
                            <h5 className="fs-1 text-bg-info text-white fw-bold mt-4 text-center">Price: $ {item.price}</h5>
                            </div>
                            {/* <h5 className="font-medium m-b-30  fs-1">
                              {item.price}
                            </h5> */}
                          </>
                          </div>
                      
                      ))
                    ) : (
                      
                      <div className="container text-bg-info text-white justify-content-center">
                      <h5 className="fs-1 fw-bold mt-3 text-center">No items in the cart</h5>
                    </div>
                    )}:

<div className="container text-bg-info text-white justify-content-center">
    <h5 className="fs-1 fw-bold mt-3 text-center">Subtotal: $ {payload.subTotal}</h5>
  </div>
  <div className="container w-25 d-flex justify-content-center align-items-center">
    <button
      className="btn btn-danger btn-lg h-100" // You can adjust the button size as needed
      onClick={handleEmptyCart}
    >
      Empty cart
    </button>
  </div>                 

<FooterComponent />
       </div>
               
       </React.Fragment>
    
  );
};