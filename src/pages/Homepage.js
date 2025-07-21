import React from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = ({ products, categories, addToCart }) => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Welcome to ShopEase</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;