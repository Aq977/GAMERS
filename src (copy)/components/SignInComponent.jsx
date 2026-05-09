import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading("Please wait...");

    try {
      const user_data = new FormData();

      user_data.append("email", email);
      user_data.append("password", password);

      const response = await axios.post(
        "https://maxwellhyrax.alwaysdata.net/api/signin",
        user_data
      );

      if (response.data.user) {
        setSuccess(response.data.message);
        setLoading("");

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // Redirect
        navigate("/");
      } else {
        setLoading("");
        setError(response.data.message);
      }
    } catch (err) {
      setLoading("");
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8d7da",
      }}
    >
      <div
        className="col-md-5 card shadow-lg p-4 border-0"
        style={{
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center text-danger mb-4">
          Welcome Back
        </h2>

        <p className="text-center text-muted">
          Sign in to continue
        </p>

        {loading && (
          <h6 className="text-warning text-center">
            {loading}
          </h6>
        )}

        {error && (
          <h6 className="text-danger text-center">
            {error}
          </h6>
        )}

        {success && (
          <h6 className="text-success text-center">
            {success}
          </h6>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-danger w-100"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-danger text-decoration-none fw-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;