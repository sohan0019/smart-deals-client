import React, { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const ProductDetails = () => {

  const { _id: productID, image, condition, usage, description, title, price_min, price_max, created_at, category, seller_name, seller_image, email, location, seller_contact, status } = useLoaderData();
  // console.log(product);
  const bidModalRef = useRef(null);
  const { user } = useAuth();
  const [bids, setBids] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/products/bids/${productID}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(data => {
      console.log('After axios get', data);
      setBids(data.data);
    })
  }, [productID, user.accessToken])
  
  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${productID}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('Bids for this product', data);
  //       setBids(data);
  //     })
  // }, [productID, user.accessToken])


  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log({ productID, name, email, bid });

    const newBid = {
      product: productID,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: 'pending',
    }

    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBid),
    })
      .then(res => res.json())
      .then(data => {
        console.log('After placeing bid', data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed.",
            showConfirmButton: false,
            timer: 1500
          });
          //add the new bid to the state
           newBid._id = data.insertedId;
           const newBids = [...bids, newBid];
           newBids.sort((a, b) => b.bid_price - a.bid_price) 
           setBids(newBids);
        }
      })
  }

  return (
    <div className='py-20 bg-[#F5F5F5] space-y-10'>
      {/* Product info */}
      <div className=' flex flex-row gap-10'>
        <div className='space-y-[30px] w-[40%]'>
          <div className='border-2 border-white rounded-2xl'>
            <img className='rounded-2xl w-full h-[400px]' src={image} alt="" />
          </div>
          <div className='space-y-6 bg-white p-6 rounded-xl'>
            <h3 className='text-2xl font-semibold'>Product Description</h3>
            <div className='flex justify-between py-3 border-b'>
              <h3 className='text-blue-600 font-semibold'>Condition : <span className='text-black'>{condition}</span></h3>
              <h3 className='text-blue-600 font-semibold'>Usage Time : <span className='text-black'>{usage}</span></h3>
            </div>
            <p className='text-[#969A9D] font-medium'>{description}</p>
          </div>
        </div>

        <div className='w-[60%] my-auto'>
          <Link className='flex flex-row items-center gap-2 text-xl font-medium text-purple-800' to="/allProducts"><FaArrowLeft /> Back To Products</Link>

          <h1 className='text-3xl font-semibold py-3'>{title} For Sale</h1>
          <span className='bg-blue-200 py-1.5 px-2.5 rounded-full'>{category}</span>

          <div className='p-6 bg-white rounded-lg my-6'>
            <h2 className='text-[28px] font-bold text-[#4CAF50]'>${price_min} - {price_max}</h2>
            <p>Price starts from</p>
          </div>

          <div className='p-6 bg-white rounded-lg'>
            <h2 className='text-2xl font-semibold mb-6'>Product Details</h2>
            <h3 className='font-semibold'>Product ID: </h3>
            <h3 className='font-semibold'>Posted: <span className='font-normal'>{created_at}</span></h3>
          </div>

          <div className='p-6 bg-white rounded-lg my-6'>
            <h2 className='text-2xl font-semibold mb-6'>Seller Information</h2>
            <div className='flex flex-row gap-4'>
              <img className='w-20 h-20' src={seller_image} alt="" />
              <div className='my-auto space-y-2'>
                <h4 className='font-semibold'>{seller_name}</h4>
                <h4 className='text-gray-500'>{email}</h4>
              </div>
            </div>

            <h3 className='font-semibold mt-3'>Location: <span className='font-normal'>{location}</span></h3>
            <h3 className='font-semibold py-3'>Contact: <span className='font-normal'>{seller_contact}</span></h3>
            <h3 className='font-semibold'>Status: <span className='bg-blue-200 py-1.5 px-2.5 rounded-full'>{status}</span></h3>
          </div>


          <button onClick={handleBidModalOpen} className='btn btn-primary w-full text-center'>
            I want to Buy this Product
          </button>

          <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give the best offer!</h3>
              <p className="py-4">Offer something seller can not resist.</p>

              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input type="text" className="input w-full" name='name' defaultValue={user?.displayName || ''} readOnly />
                  <label className="label">Email</label>
                  <input type="email" className="input w-full" name='email' defaultValue={user?.email || ''} readOnly />
                  <label className="label">Bid</label>
                  <input type="text" className="input w-full" name='bid' placeholder='Your Bid' />

                  <button className="btn btn-neutral mt-4">Place your Bid</button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>


      {/* Bids for product */}

      <div>
        <h3 className='text-3xl'>Bids for this Product: <span className='text-primary'>{bids.length}</span></h3>

        <div className="overflow-x-auto">
          <table className="table bg-white mt-4 text-center">
            {/* head */}
            <thead>
              <tr>
                <th>
                  SL No.
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                bids.map((bid, index) => <tr key={index}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={bid.buyer_image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.buyer_name}</div>
                    </div>
                  </div>
                </td>
                <td>{bid.buyer_email}</td>
                <td>{bid.bid_price}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>)
              }
      
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;