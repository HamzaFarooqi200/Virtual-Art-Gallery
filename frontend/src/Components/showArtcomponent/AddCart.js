import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export const AddCart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayloader] = useState({});
  const [hasError, setError] = useState(false);
  async function fetchCart() {
    const res = await fetch("http://localhost:4000/cart");
    res
      .json()
      .then((res) => {
        console.log(res.data.items);
        setCarts(res.data.items);
        setPayloader(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }
  async function emptyCart() {
    try {
      const res = await fetch("http://localhost:4000/cart/empty-cart", {
        method: "DELETE",
      });
      await res.json();
      fetchCart();
      props.history.push("/");
    } catch (err) {
      console.log(err);
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
                    <tr>
                      <th className="b-0">Name</th>
                      <th className="b-0">Price</th>
                      <th className="b-0 text-right">Total Price</th>
                    </tr>
                    {carts.map((item, i) => (
                      <tr>
                        <td>{item.productId.name}</td>
                        <td>{item.productId.price}</td>
                        <td className="text-right">
                          <h5 className="font-medium m-b-30">{item.total}</h5>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan="3" align="right">
                        Subtotal :{payload.subTotal}
                      </td>
                      <td colspan="4" align="right">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => emptyCart()}
                        >
                          Empty cart
                        </button>
                      </td>
                    </tr>
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
