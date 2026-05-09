import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const { message } = useCart(); //  get message from context
  const [showToast, setShowToast] = useState(false);

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user =
      storedUser && storedUser !== "undefined" && storedUser !== "null"
        ? JSON.parse(storedUser)
        : null;
  } catch {
    user = null;
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // 👇 control toast visibility
  useEffect(() => {
    if (message) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {/* 🔥 TOAST MESSAGE */}
      {showToast && message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#28a745",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {message}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger text-dark shadow-sm px-3">
        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/">
          GameTech Store
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV CONTENT */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav">
            {/* DROPDOWN MENU */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-black fw-bold"
                type="button"
                data-bs-toggle="dropdown"
              >
                Menu
              </button>

              <ul className="dropdown-menu shadow">
                <li>
                  <Link className="dropdown-item" to="/">
                    🏠 Home
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/addproduct">
                    ➕ Add Product
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/cartpage">
                    🛒 Cart Page
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/makepayment">
                    💳 Make Payment
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item text-primary fw-bold"
                    to="/chatbot"
                  >
                    🤖 Chatbot Assistant
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item text-danger fw-bold"
                    to="/admin"
                  >
                    🛠️ Admin Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item text-warning"
                    to="/admin/products"
                  >
                    📦 Manage Products
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {!user ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/signin">
                        🔐 Sign In
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/signup">
                        📝 Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="dropdown-item text-success fw-bold">
                      👤 {user.username}
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
