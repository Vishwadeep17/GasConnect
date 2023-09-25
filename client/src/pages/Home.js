// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Gas Connect</h1>
        <p>Your trusted source for gas supply</p>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Order Gas</h2>
          <p>Place a new gas order quickly and easily.</p>
          {/* <Link to="/order">Place Order</Link> */}
        </div>

        <div className="feature">
          <h2>View Orders</h2>
          <p>Track your current orders and order history.</p>
          {/* <Link to="/orders">View Orders</Link> */}
        </div>

        <div className="feature">
          <h2>Inventory</h2>
          <p>Check the availability of gas products in stock.</p>
          {/* <Link to="/inventory">View Inventory</Link> */}
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Gas Connect is a leading provider of high-quality gas products.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
          dolor justo.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us.</p>
        {/* <Link to="/contact">Contact Us</Link> */}
      </section>
    </div>
  );
}

export default Home;