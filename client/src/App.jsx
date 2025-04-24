import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Home from './components/Home';
import CreateOrder from './components/CreateOrder';
import ViewOrders from './components/ViewOrders';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Blockchain Supply Chain</h1>
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-order" element={<CreateOrder />} />
              <Route path="/view-orders" element={<ViewOrders />} />
            </Routes>
          </main>
          <footer className="App-footer">
            <p>© 2025 Blockchain Supply Chain</p>
          </footer>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
