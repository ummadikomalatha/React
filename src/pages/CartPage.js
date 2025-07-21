import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const CartPage = ({ cart, removeFromCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await axios.post('http://localhost:5000/api/orders', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Normally would redirect to order confirmation
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                {cart.map(item => (
                  <div key={item.id} className="row mb-4 border-bottom pb-3 align-items-center">
                    <div className="col-md-2">
                      <img 
                        src={item.image || 'https://placehold.co/100x100?text=Product'}
                        className="img-fluid"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-5">
                      <h5>{item.name}</h5>
                      <p className="text-muted">${item.price}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input 
                          type="number" 
                          className="form-control" 
                          value={item.quantity}
                          min="1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">Order Summary</h4>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  <span>$0.00</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <h5>Total:</h5>
                  <h5>${calculateTotal()}</h5>
                </div>
                
                <button 
                  className="btn btn-primary w-100"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : (
                    <>
                      <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                      Proceed to Checkout
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <Link to="/" className="btn btn-outline-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;