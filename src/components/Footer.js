import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>ShopEase</h5>
            <p>Your one-stop shop for all your needs. Quality products at affordable prices.</p>
          </div>
          
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-white text-decoration-none">Products</Link></li>
              <li><Link to="/cart" className="text-white text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQs</a></li>
              <li><a href="#" className="text-white text-decoration-none">Returns Policy</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5>Stay Connected</h5>
            <div className="social-links">
              <a href="#" className="text-white me-2">Facebook</a>
              <a href="#" className="text-white me-2">Twitter</a>
              <a href="#" className="text-white">Instagram</a>
            </div>
          </div>
        </div>
        
        <hr className="bg-light" />
        
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;