import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-primary py-4">
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
            <h5>Follow us on</h5>
            <ul>
            <img 
            src="images/fb.png" 
            alt="" 
            height=''/>
            <p>gamers254</p>

            <img
             src="images/in.png"
             alt="" />
             <p>gamers.center</p>

             <img
              src="images/x.png"
               alt="" /> 
               <p>Gamers_vibes</p> 
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