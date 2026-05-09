import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const getPasswordStrength = (password) => {
  let score = 0;

  const checks = [
    /.{8,}/,
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[^A-Za-z0-9]/,
  ];

  checks.forEach((regex) => {
    if (regex.test(password)) score++;
  });

  if (score <= 2) return { label: "Weak", color: "#dc3545" };
  if (score === 3 || score === 4)
    return { label: "Medium", color: "#ff6b6b" };

  return { label: "Strong", color: "#198754" };
};

const SignUpComponent = () => {
  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [phone, updatePhone] = useState("");
  const [password, updatePassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user_data = new FormData();

      user_data.append("username", username);
      user_data.append("email", email);
      user_data.append("phone", phone);
      user_data.append("password", password);

      const response = await axios.post(
        "https://maxwellhyrax.alwaysdata.net/api/signup",
        user_data
      );

      setSuccess(response.data.message || "Account created successfully");

      updateUsername("");
      updateEmail("");
      updatePhone("");
      updatePassword("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
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
          Create Account
        </h2>

        {loading && (
          <h6 className="text-warning text-center">
            Submitting...
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
            type="text"
            className="form-control my-3"
            placeholder="Enter username"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-control my-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            className="form-control my-3"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => updatePhone(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control my-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            required
          />

          {/* Password Strength */}
          {password && (
            <div className="my-2">
              <div className="progress" style={{ height: "7px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width:
                      strength.label === "Weak"
                        ? "33%"
                        : strength.label === "Medium"
                        ? "66%"
                        : "100%",
                    backgroundColor: strength.color,
                  }}
                ></div>
              </div>

              <small style={{ color: strength.color }}>
                Password Strength: {strength.label}
              </small>
            </div>
          )}

          <button
            className="btn btn-danger w-100 mt-3"
            disabled={loading || strength.label === "Weak"}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="text-center mt-3">
            <Link
              to="/signin"
              className="text-danger text-decoration-none"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;