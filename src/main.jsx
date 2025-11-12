import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import Register from './components/Register/Register.jsx';
import Login from './Login/Login.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import MyProducts from './MyProducts/MyProducts.jsx';
import MyBids from './MyBids/MyBids.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import CreateAProduct from './components/CreateAProduct/CreateAProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'allProducts',
        Component: AllProducts,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'myProducts',
        element: <PrivateRoutes>
          <MyProducts></MyProducts>
        </PrivateRoutes>,
      },
      {
        path: 'myBids',
        element: <PrivateRoutes>
          <MyBids></MyBids>
        </PrivateRoutes>,
      },
      {
        path: 'productDetails/:id',
        loader: ({params}) => fetch(`http://localhost:3000/productDetails/${params.id}`).then(res => res.json()),
        element: <PrivateRoutes>
          <ProductDetails></ProductDetails>
        </PrivateRoutes>
      },
      {
        path: 'createAProduct',
        
        element: <PrivateRoutes>
          <CreateAProduct></CreateAProduct>
        </PrivateRoutes>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
