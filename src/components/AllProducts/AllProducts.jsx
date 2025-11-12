import React, { useContext, useEffect, useState } from 'react';
import Product from '../Product/Product';
import { AuthContext } from '../../Context/AuthContext';

const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const { loading } = useContext(AuthContext)

  
  useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    })
  }, [])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }


  return (
    <div>
      <h2 className='text-5xl text-center my-10'>Recent <span className='text-primary'>Products</span></h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
        {
          products.map(product => <Product key={product._id} product={product}></Product>)
        }
      </div>
    </div>
  );
};

export default AllProducts;