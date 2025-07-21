import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;
  if (!product) return <div className="alert alert-warning my-5">Product not found</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img 
            src={product.image || 'https://placehold.co/600x400?text=Product+Image'}
            className="img-fluid rounded"
            alt={product.name}
          />
        </div>
        
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon 
                  icon={faStar} 
                  key={i} 
                  className={i < 4 ? 'text-warning' : 'text-secondary'}
                />
              ))}
            </div>
            <span className="text-muted">(24 reviews)</span>
          </div>
          
          <h3 className="text-primary mb-3">${product.price}</h3>
          
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex flex-wrap gap-2 mb-4">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => addToCart(product.id)}
            >
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              Add to Wishlist
            </button>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product Details</h5>
              <ul className="list-unstyled">
                <li><strong>Category:</strong> {product.category || 'N/A'}</li>
                <li><strong>Availability:</strong> In Stock</li>
                <li><strong>Shipping:</strong> Free shipping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {/* Related products would be fetched similarly */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;