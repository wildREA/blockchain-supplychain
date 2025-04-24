import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-navigation">
      <div className="nav-buttons">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/create-order">
          <button>Create Order</button>
        </Link>
        <Link to="/view-orders">
          <button>View Orders</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
