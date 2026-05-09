import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">

      {/* Navbar */}
      <NavbarComponent />

      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Admin Panel</h4>

          <ul className="list-group">
            <li className="list-group-item">
              Dashboard
            </li>

            <li className="list-group-item">
              Add Product
            </li>

            <li className="list-group-item">
              View Products
            </li>

            <li className="list-group-item">
              Orders
            </li>

            <li className="list-group-item">
              Users
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">

          <h2 className="mb-4">
            Welcome Admin 👋
          </h2>

          {/* Dashboard Cards */}
          <div className="row">

            <div className="col-md-4">
              <div className="card shadow p-4 text-center">
                <h5>Total Products</h5>
                <h2 className="text-primary">20</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow p-4 text-center">
                <h5>Total Orders</h5>
                <h2 className="text-success">15</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow p-4 text-center">
                <h5>Total Users</h5>
                <h2 className="text-danger">10</h2>
              </div>
            </div>

          </div>

          {/* Recent Products */}
          <div className="mt-5">
            <h3>Recent Products</h3>

            <table className="table table-bordered table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Gaming Laptop</td>
                  <td>Laptops</td>
                  <td>KES 80,000</td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>PS5 Controller</td>
                  <td>Controllers</td>
                  <td>KES 9,000</td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>Gaming Headset</td>
                  <td>Accessories</td>
                  <td>KES 5,000</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default AdminDashboard;