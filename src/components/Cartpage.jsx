import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
// import NavbarComponent from "./NavbarComponent";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  // TOTAL AMOUNT
  const total = cart.reduce(
    (sum, item) =>
      sum + item.product_cost * (item.quantity || 1),
    0
  );

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // CHECKOUT
  const handleCheckout = () => {
    if (cart.length === 0) return;

    navigate("/makepayment", {
      state: { cart, total },
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f8d7da",
        minHeight: "100vh",
      }}
    >
      {/* <NavbarComponent /> */}

      <div className="container py-5">
        <h2 className="text-center text-danger mb-4">
          Your Shopping Cart
        </h2>

        <hr />

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="card p-5 shadow-lg border-0 text-center">
            <h4 className="text-danger">
              Your cart is empty
            </h4>

            <p className="text-muted">
              Add products to continue shopping
            </p>

            <button
              className="btn btn-danger mt-3"
              onClick={() => navigate("/")}
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="row">
            {/* CART ITEMS */}
            <div className="col-md-8">
              {cart.map((item) => (
                <div
                  className="card mb-3 shadow border-0"
                  key={item.product_id}
                >
                  <div className="row g-0 align-items-center p-3">
                    {/* IMAGE */}
                    <div className="col-md-2 text-center">
                      <img
                        src={`https://maxwellhyrax.alwaysdata.net/static/images/${item.product_photo}`}
                        className="img-fluid rounded"
                        alt={item.product_name}
                        style={{
                          height: "90px",
                          width: "90px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.product_name}
                        </h5>

                        <p className="text-muted small">
                          {item.product_description}
                        </p>
                      </div>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="col-md-2 text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            decreaseQuantity(
                              item.product_id
                            )
                          }
                        >
                          -
                        </button>

                        <span className="fw-bold">
                          {item.quantity || 1}
                        </span>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            increaseQuantity(
                              item.product_id
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="col-md-2 text-center">
                      <p className="fw-bold text-danger mb-1">
                        KES {item.product_cost}
                      </p>

                      <small className="text-muted">
                        Total: KES{" "}
                        {item.product_cost *
                          (item.quantity || 1)}
                      </small>
                    </div>

                    {/* REMOVE BUTTON */}
                    <div className="col-md-2 text-end">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          removeFromCart(
                            item.product_id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="col-md-4">
              <div className="card p-4 shadow-lg border-0">
                <h4 className="text-danger mb-4">
                  Order Summary
                </h4>

                {/* TOTAL ITEMS */}
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Items:</span>

                  <span className="fw-bold">
                    {totalItems}
                  </span>
                </div>

                {/* TOTAL AMOUNT */}
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Amount:</span>

                  <span className="fw-bold text-danger">
                    KES {total}
                  </span>
                </div>

                <hr />

                {/* CHECKOUT BUTTON */}
                <button
                  className="btn btn-danger w-100"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;