const FooterComponent = () => {
  return (
    <footer className="bg-danger text-white text-center p-4 mt-4">
      <h3 className="text-dark">GameTech Store</h3>

      <p>Your one-stop shop for gaming equipment.</p>

      <div className="row text-start mt-4">

        {/* Social Media Section */}
        <div className="col-md-4">
          <h5 className="text-primary">Follow Us</h5>

          <a href="https://instagram.com" className="text-white d-block mb-2">
            <i className="bi bi-instagram me-2"></i>
            Instagram: GameTech Store
          </a>

          <a href="https://facebook.com" className="text-white d-block mb-2">
            <i className="bi bi-facebook me-2"></i>
            Facebook: GameTech Store
          </a>

          <a href="https://x.com" className="text-white d-block">
            <i className="bi bi-twitter-x me-2"></i>
            X: GameTech Store
          </a>
        </div>

        {/* About Section */}
        <div className="col-md-4">
          <h5 className="text-primary">About Us</h5>

          <p>
            We are a modern e-commerce platform dedicated to providing quality
            products at affordable prices.
          </p>
        </div>

        {/* Contact Section */}
        <div className="col-md-4">
          <h5 className="text-primary">Contact</h5>

          <p>Email: gametech@gmail.com</p>
          <p>Phone: +254 748623320</p>
        </div>
      </div>

      <hr className="bg-light" />

      <p>© 2026 GameTech Store. All rights reserved.</p>
    </footer>
  );
};

export default FooterComponent;