import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({LatestProductsPromise}) => {
  
  const products = use(LatestProductsPromise);
  // console.log(products);

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

export default LatestProducts;