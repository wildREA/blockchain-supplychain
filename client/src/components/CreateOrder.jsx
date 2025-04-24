import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { useNavigate, Link } from 'react-router-dom';

const CreateOrder = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { createOrder } = useWeb3();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Create order using context function
      await createOrder(product, parseInt(quantity));
      
      setSuccess(true);
      // Reset form
      setProduct('');
      setQuantity('');
      
      // Show success message then redirect after 2 seconds
      setTimeout(() => {
        navigate('/view-orders');
      }, 2000);
      
    } catch (err) {
      setError(`Failed to create order: ${err.message}`);
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-order-container">
      <h2>Create New Order</h2>
      
      <div className="page-navigation">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
        <Link to="/view-orders">
          <button>View Orders</button>
        </Link>
      </div>
      
      {success && (
        <div className="success-message">
          Order created successfully! Redirecting...
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product">Product Name</label>
          <input
            type="text"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Order...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
