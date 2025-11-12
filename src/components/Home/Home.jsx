import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';


const LatestProductsPromise = fetch('http://localhost:3000/latest-products')
.then(res => res.json());

const Home = () => {
  return (
    <div>
      <h3 className='bg-primary'>This is home</h3>
      <LatestProducts LatestProductsPromise={LatestProductsPromise}></LatestProducts>
    </div>
  );
};

export default Home;