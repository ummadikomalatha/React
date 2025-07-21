import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, cartCount, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">ShopEase</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown">
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/1">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/category/2">Clothing</Link></li>
                <li><Link className="dropdown-item" to="/category/3">Home & Kitchen</Link></li>
              </ul>
            </li>
          </ul>
          
          <div className="d-flex">
            <Link to="/cart" className="btn btn-outline-light me-2 position-relative">
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
              Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  {user.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-light">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;