import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-warning text-dark py-4">
      <div className="container">
        <div className="row">
          
          {/* Section 1 */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We provide you with all gaming equipment at affordable prize.
              We are located at GrrenWood Mall along Meru-Nanyuki road.
            </p>
          </div>

          {/* Section 2 */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Signin</a></li>
              <li><a href="/about" className="text-light text-decoration-none">Signup</a></li>
              <li><a href="/services" className="text-light text-decoration-none">Add product</a></li>
               <li><a href="/services" className="text-light text-decoration-none">Get product</a></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: Gamers@gmail.com</p>
            <p>Phone: +254748623320</p>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">
          <small>© 2026 Your Company. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;