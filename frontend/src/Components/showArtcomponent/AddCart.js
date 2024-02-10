import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main>
      <section>
        <div className="banner-innerpage">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 align-self-center text-center">
                <h1 className="title">Cart Listing</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="spacer">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-9">
                <div className="row shop-listing">
                  <table className="table shop-table">
                    <thead>
                      <tr>
                        <th className="b-0">Name</th>
                        <th className="b-0">Price</th>
                        <th className="b-0 text-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts && carts.length > 0 ? (
                        carts.map((item, i) => (
                          <tr key={item._id}>
                            <td><img  height="300px" width ="300px" src={require(`../../uploads/${item.image}`)}></img></td>
                            <td>{item.price}</td>
                            <td className="text-right">
                              <h5 className="font-medium m-b-30">
                                {item.price}
                              </h5>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" align="center">
                            No items in the cart
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" align="right">
                          Subtotal: {payload.subTotal}
                        </td>
                        <td colSpan="4" align="right">
                          <button className="btn btn-danger">Empty cart</button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
