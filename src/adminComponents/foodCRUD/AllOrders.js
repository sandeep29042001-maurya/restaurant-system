import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../servicesApi/Api';

function AllOrders() {
  const [orders, setOrders] = useState([]);

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert(`Order #${orderId} status updated to ${newStatus}`);
      fetchOrders(); // refresh list after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All User Orders</h2>

      {orders.length === 0 ? (
        <p className="text-danger text-center">No orders found</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Placed At</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user.name} <br />
                  <small>{order.user.email}</small>
                </td>
                <td>
                  {order.user.address.fullAddress} <br />
                  <small>{order.user.address.pincode}</small>
                </td>
                <td>
                  <ul className="list-unstyled">
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        {item.foodItems.name} (x{item.quantity}) - ₹
                        {item.foodItems.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "bg-warning"
                        : order.status === "completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllOrders
