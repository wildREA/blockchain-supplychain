import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Blockchain Supply Chain</h2>
      <p>
        This application demonstrates a simplified supply chain management system.
        You can create orders and track them through the fulfillment process.
      </p>
      <div className="home-buttons">
        <Link to="/create-order">
          <button>Create New Order</button>
        </Link>
        <Link to="/view-orders">
          <button>View All Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
