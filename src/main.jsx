import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Leyout from './Lyout/Leyout.jsx';
import Home from './Component/Home/Home.jsx';
import Alproduct from './Component/Alproduct/Alproduct.jsx';
import Authprovider from './Authcontext/Authprovider.jsx';
import Register from './Component/Register/Register.jsx';
import ProductDatails from './Component/Home/ProductDatails.jsx';
import Bids from './Component/Home/Bids.jsx';
import PraivetRoute from './Component/PraivetRoute/PraivetRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Leyout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/allproduct',
        Component: Alproduct
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'bids',
        element: <PraivetRoute>
          <Bids></Bids>
        </PraivetRoute>
      },
      {
        path:'productdetails/:id',
        loader:({params})=>fetch(`http://localhost:3000/product/${params.id}`),
        element:<PraivetRoute>
           <ProductDatails></ProductDatails>
        </PraivetRoute>
      }
     
      

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router}></RouterProvider>
    </Authprovider>
  </StrictMode>,
)
