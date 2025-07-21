import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card product-card h-100 shadow-sm">
      <img 
        src={product.image || 'https://placehold.co/300x200?text=Product+Image'}
        className="card-img-top product-img"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.description?.substring(0, 60)}...</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 text-primary">${product.price}</span>
          <div className="btn-group">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => addToCart(product.id)}
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
            <Link 
              to={`/product/${product.id}`}
              className="btn btn-sm btn-outline-secondary"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>
      </div>
      {product.category && (
        <div className="card-footer bg-transparent">
          <small className="text-muted">
            Category: {product.category}
          </small>
        </div>
      )}
    </div>
  );
};

export default ProductCard;