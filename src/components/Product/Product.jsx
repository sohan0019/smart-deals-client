import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {

  const { _id, title, price_min, price_max, image } = product;
  
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mx-auto">
        <figure className="p-4">
          <img
            src={image || 'path/to/placeholder-image.png'}
            alt="Shoes"
            className="rounded-xl w-full h-80" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Price: ${price_min} - {price_max}</p>
          <div className="card-actions">
            <Link to={`/productDetails/${_id}`} className="btn btn-outline border-primary text-primary w-full">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;