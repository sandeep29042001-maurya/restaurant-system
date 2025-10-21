import React from 'react';
import ReactDOM from 'react-dom/client';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './userComponents/Home';
import Register from './userComponents/Register';
import Login from './userComponents/Login';
import Cart from './userComponents/Cart';
import LoginProvider from './context/LoginContext';
import AdminDashboard from './adminComponents/AdminDashboard.js';
import ManageFooditems from './adminComponents/foodCRUD/ManageFooditems.js';
import AddFood from './adminComponents/foodCRUD/AddFood.js';
import ManageCategories from './adminComponents/categoriesCRUD/ManageCategories.js';
import UpdateFooditem from './adminComponents/foodCRUD/UpdateFooditem.js';
import AllOrders from './adminComponents/foodCRUD/AllOrders.js';
import FetchFoods from './userComponents/foodComponents/FetchFoods.js';
import YourOrders from './userComponents/YourOrders.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes =createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    children:[
      {
        path:"/",
        element:<FetchFoods/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/yourOrders",
        element :<YourOrders/>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<AdminDashboard/>,
    children:[
      {
        path:"/dashboard",
        element:<ManageFooditems/>
      },
      {
        path:"/dashboard/add-food",
        element:<AddFood/>
      },
      {
        path:'/dashboard/all-orders',
        element:<AllOrders/>
      },
      {
        path:"/dashboard/manage-categories",
        element:<ManageCategories/>
      },
      {
        path:"/dashboard/update-food/:foodId",
        element:<UpdateFooditem/>
      }
      
    ]
  }
])

root.render(
  <LoginProvider>
    <RouterProvider router={routes}></RouterProvider>
  </LoginProvider>
);


