import { Link, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  // GET USER EMAIL
  const userEmail = localStorage.getItem("useremail");

  // ALLOWED ADMIN EMAIL
  const adminEmail = "salah@gmail.com";

  // BLOCK ACCESS
  if (userEmail !== adminEmail) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 p-5 text-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-primary">
          🛠️ Admin Dashboard
        </h2>

        <p className="text-muted mb-4">
          Welcome Admin
        </p>

        <Link
          className="btn btn-success btn-lg"
          to="/addproduct"
        >
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;