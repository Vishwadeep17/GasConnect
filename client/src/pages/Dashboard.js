import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's order history from the backend API
    fetch('/api/transactions/record-payment', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your authentication token if needed
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserOrders(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>Here, you can view your recent orders and account information.</p>
      
      <h2>Your Recent Orders</h2>
      <ul>
        {userOrders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}, Date: {order.date}, Total: ${order.total}
          </li>
        ))}
      </ul>
      
      <h2>Order History</h2>
      {isLoading ? (
        <p>Loading order history...</p>
      ) : userOrders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No order history available.</p>
      )}

      <h2>Account Information</h2>
      <p>
        Your account information can be displayed here, including your name,
        contact details, and account settings.
      </p>
    </div>
  );
}

export default Dashboard;
