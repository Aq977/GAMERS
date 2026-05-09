import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import NavbarComponent from "./NavbarComponent";
import CarouselComponent from "./CarouselComponent";

import { useCart } from "../context/CartContext";

const GetProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const navigate = useNavigate();

  // cart
  let addToCart = () => {};
  let message = "";

  try {
    const cart = useCart();
    addToCart = cart.addToCart;
    message = cart.message;
  } catch (err) {
    console.warn("CartProvider not found");
  }

  const img_url = "https://maxwellhyrax.alwaysdata.net/static/images/";

  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://maxwellhyrax.alwaysdata.net/api/get_product_details",
      );

      if (res.status === 200) {
        setProducts(res.data);
        console.log("available products", res.data)
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    }

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // SEARCH FILTER
  const filteredProducts = products.filter(
    (p) =>
      p.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.product_description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // PAGINATION LOGIC
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* <NavbarComponent /> */}
      <CarouselComponent />

      <div className="container">
        <h3 className="mt-5  text-center mb-4">Available Products</h3>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="alert alert-success text-center">{message}</div>
        )}

        {/* SEARCH */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              className="form-control shadow-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-warning">Loading products...</p>
        )}

        {/* ERROR */}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row">
          {!loading && currentProducts.length > 0
            ? currentProducts.map((product) => (
                <div key={product.product_id} className="col-md-3 mb-4">
                  <div className="card h-100 shadow border-0">
                    <img
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.product_name}</h5>

                      <p className="card-text text-muted small flex-grow-1">
                        {product.product_description}
                      </p>

                      <div className="mb-3">
                        <span className="badge bg-dark text-white fs-6">
                          KES {product.product_cost}
                        </span>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-dark text-white btn-sm"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>

                        <button
                          className="btn btn-dark btn-sm text-white"
                          onClick={() =>
                            navigate("/makepayment", {
                              state: { product },
                            })
                          }
                        >
                          Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : !loading && (
                <div className="col-12 text-center mt-5">
                  <p className="lead">No products found.</p>
                </div>
              )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 mb-5">
            <button
              className="btn btn-dark mx-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn mx-1 ${
                  currentPage === i + 1 ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-dark mx-1"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default GetProductsComponent;
