import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Link } from 'react-router-dom';

const ViewOrders = () => {
  const { orders, loading, error: web3Error, fulfillOrder } = useWeb3();
  const [error, setError] = useState(null);

  const handleFulfill = async (id) => {
    try {
      await fulfillOrder(id);
      // Order status updated in context
    } catch (err) {
      setError('Failed to fulfill order: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error || web3Error) {
    return <div className="error-message">{error || web3Error}</div>;
  }

  return (
    <div className="view-orders-container">
      <h2>All Orders</h2>
      
      <div className="page-navigation">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
        <Link to="/create-order">
          <button>Create New Order</button>
        </Link>
      </div>
      
      {orders.length === 0 ? (
        <div className="no-orders">No orders found. Create one first!</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>{order.product}</h3>
              <div className="order-details">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Owner:</strong> {order.owner}</p>
                <p><strong>Status:</strong> {order.fulfilled ? 'Fulfilled' : 'Pending'}</p>
                
                {!order.fulfilled && (
                  <button 
                    onClick={() => handleFulfill(order.id)}
                    className="fulfill-button"
                  >
                    Mark as Fulfilled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
