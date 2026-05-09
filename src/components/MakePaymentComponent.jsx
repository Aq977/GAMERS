import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const MakePaymentComponent = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.product_cost * (item.quantity || 1),
    0
  );

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const img_url =
    "https://maxwellhyrax.alwaysdata.net/static/images/";

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8d7da",
        }}
      >
        <div className="card p-5 shadow-lg border-0 text-center">
          <h3 className="text-danger">
            Your cart is empty
          </h3>

          <button
            className="btn btn-danger mt-3"
            onClick={() => navigate("/")}
          >
            Go Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const validatePhone = (phone) => {
    // Kenyan Mpesa format
    const regex = /^2547\d{8}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate phone
    if (!validatePhone(phone)) {
      setError(
        "Enter a valid Mpesa number e.g. 254712345678"
      );
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("amount", total);
      data.append("phone", phone);

      const response = await axios.post(
        "https://maxwellhyrax.alwaysdata.net/api/mpesa_payment",
        data
      );

      if (response.status === 200) {
        setSuccess(
          "Payment initiated successfully. Check your phone."
        );

        // Optional: clear cart after payment request
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Payment failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#f8d7da",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-center text-danger mb-4">
        Lipa Na Mpesa
      </h2>

      <div className="row justify-content-center">

        {/* CART */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 p-3">
            <h4 className="text-danger mb-3">
              Your Cart
            </h4>

            {cart.map((item) => (
              <div
                className="card mb-3 border-danger"
                key={item.product_id}
              >
                <div className="d-flex align-items-center p-2">
                  <img
                    src={img_url + item.product_image}
                    alt={item.product_name}
                    className="img-thumbnail"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="ms-3">
                    <h6 className="mb-1">
                      {item.product_name}
                    </h6>

                    <small>
                      Qty: {item.quantity || 1}
                    </small>

                    <br />

                    <strong className="text-danger">
                      KES {item.product_cost}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="card shadow-lg border-0 p-4">

            <h4 className="mb-3">
              Total:{" "}
              <span className="text-danger">
                KES {total.toLocaleString()}
              </span>
            </h4>

            <hr />

            {loading && (
              <h6 className="text-warning">
                Processing payment...
              </h6>
            )}

            {error && (
              <h6 className="text-danger">
                {error}
              </h6>
            )}

            {success && (
              <h6 className="text-success">
                {success}
              </h6>
            )}

            <form onSubmit={handleSubmit}>
              <label className="form-label fw-bold text-danger">
                Mpesa Phone Number
              </label>

              <input
                type="tel"
                className="form-control mb-4"
                placeholder="2547XXXXXXXX"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />

              <button
                type="submit"
                className="btn btn-danger w-100"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Pay Now"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentComponent;