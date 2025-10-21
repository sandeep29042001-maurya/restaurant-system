import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/LoginContext'
import { getOrders } from '../servicesApi/Api';

function YourOrders() {
  let{isLogin,userId}=useContext(LoginContext);
  const[orders,setOrders] = useState([]);

    useEffect(() => {
    if (isLogin && userId) {
      fetchOrders(userId);
    }
  }, [isLogin, userId]); // ✅ dependency on both

  const fetchOrders = async(userId)=>{
    
    try{
      const res = await getOrders(userId);

      if (res.data.data === null || res.data.data.length === 0) {
        setOrders([]); // ✅ clear state if no orders
      } else {
        setOrders(res.data.data);
      }
    }
    catch(err)
    {
      console.error("Errror in fetching orders",err);
      
    }


  }
  return (
    <div>
      <div style={{ padding: "20px" }}>

      <div className='d-flex jsutify-content-center'><h2>My Orders</h2></div>

      {/* ✅ Condition if no orders */}
      {orders.length === 0 ? (
        <p style={{ color: "red", fontWeight: "bold" }}>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "40px" }}>
            <h3>Order #{order.id}</h3>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <table border="1" cellPadding="10" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.foodItems.name}</td>
                    <td>{item.foodItems.category.name}</td>
                    <td>{item.foodItems.description}</td>
                    <td>{item.foodItems.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.foodItems.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default YourOrders
