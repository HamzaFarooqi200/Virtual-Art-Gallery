import React, { useState, useEffect } from "react";

export const AddCart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayloader] = useState({});
  const [hasError, setError] = useState(false);

  async function fetchCart() {
    try {
      const res = await fetch("api/carts/allCarts");
      const data = await res.json();

      console.log(data.cartItems);
      setCarts(data.cartItems);
      setPayloader(data);
    } catch (error) {
      setError(error);
    }
  }

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
                <h6 className="subtitle op-8">
                  We are small team of creative people working together
                </h6>
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
                            <td>{item.artid}</td>
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
