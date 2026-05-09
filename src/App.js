import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import "./App.css";

// Components
import NavbarComponent from "./components/NavbarComponent";
import GetProductsComponent from "./components/GetProductsComponet";
import AddProductComponent from "./components/AddProductComponent";
import SignUpComponent from "./components/SignUpComponent";
import SignInComponent from "./components/SignInComponent";
import MakePaymentComponent from "./components/MakePaymentComponent";
import CartPage from "./components/Cartpage";
import ChatbotComponent from "./components/ChatbotComponent";
import FooterComponent from "./components/FooterComponent";

// ADMIN
import AdminDashboard from "./Admin/AdminDashboard";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* HEADER */
function AppHeader() {
  const words = ["Buy", "Sell", "Trade"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="text-black text-center py-5 shadow"
      style={{
        background:
          "linear-gradient(135deg, #dc3545, #b02a37)",
      }}
    >
      <h1 className="fw-bold display-5">
        GameTech Store{" "}
        <span className="badge bg-dark px-3 py-2">
          {words[index]}
        </span>
      </h1>

      <p className="mt-2">
        Your trusted gaming marketplace
      </p>
    </header>
  );
}

function App() {
  // ADMIN EMAIL
  const adminEmail = "salah@gmail.com";

  // LOGGED USER EMAIL
  const userEmail =
    localStorage.getItem("useremail");

  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* HEADER */}
      <AppHeader />

      {/* MAIN */}
      <div
        style={{
          backgroundColor: "#f8d7da",
          minHeight: "100vh",
          paddingBottom: "40px",
        }}
      >
        <div className="container mt-4">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={<GetProductsComponent />}
            />

            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                userEmail === adminEmail ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* ADD PRODUCT */}
            <Route
              path="/addproduct"
              element={
                userEmail === adminEmail ? (
                  <AddProductComponent />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* SIGNUP */}
            <Route
              path="/signup"
              element={<SignUpComponent />}
            />

            {/* SIGNIN */}
            <Route
              path="/signin"
              element={<SignInComponent />}
            />

            {/* PAYMENT */}
            <Route
              path="/makepayment"
              element={<MakePaymentComponent />}
            />

            {/* CART */}
            <Route
              path="/cartpage"
              element={<CartPage />}
            />

            {/* CHATBOT */}
            <Route
              path="/chatbot"
              element={<ChatbotComponent />}
            />
          </Routes>

          {/* FOOTER */}
          <FooterComponent />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;