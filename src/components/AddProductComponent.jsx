import { useState } from "react";
import axios from "axios";

const AddProductComponent = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_photo, setProductImage] = useState(null);

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading("Please wait...");

    try {
      const product_data = new FormData();

      product_data.append("product_name", product_name);
      product_data.append("product_cost", product_cost);
      product_data.append("product_category", product_category);
      product_data.append(
        "product_description",
        product_description
      );
      product_data.append("product_photo", product_photo);

      const response = await axios.post(
        "https://maxwellhyrax.alwaysdata.net/api/add_product",
        product_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setLoading("");

        // Clear form
        setProductName("");
        setProductCost("");
        setProductCategory("");
        setProductDescription("");
        setProductImage(null);
      }
    } catch (err) {
      setLoading("");
      setSuccess("");

      setError(
        err.response?.data?.message ||
          "Failed to add product"
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
        className="col-md-6 card shadow-lg p-4 border-0"
        style={{
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center text-danger mb-4">
          Add Product
        </h2>

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
            type="text"
            className="form-control mb-3"
            required
            placeholder="Enter product name"
            value={product_name}
            onChange={(e) =>
              setProductName(e.target.value)
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            required
            placeholder="Enter product cost"
            value={product_cost}
            onChange={(e) =>
              setProductCost(e.target.value)
            }
          />

          <select
            required
            value={product_category}
            onChange={(e) =>
              setProductCategory(e.target.value)
            }
            className="form-select mb-3"
          >
            <option value="">
              Select category
            </option>

            <option value="controller">
              Controllers
            </option>

            <option value="v.g equipment">
              Video Game Equipment
            </option>

            <option value="laptops">
              Laptops
            </option>

            <option value="phones">
              Phones
            </option>
          </select>

          <textarea
            required
            value={product_description}
            onChange={(e) =>
              setProductDescription(e.target.value)
            }
            rows="5"
            className="form-control mb-3"
            placeholder="Enter product description"
          ></textarea>

          <label className="form-label fw-bold text-danger">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            required
            className="form-control mb-4"
            onChange={(e) =>
              setProductImage(e.target.files[0])
            }
          />

          <button className="btn btn-danger w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductComponent;