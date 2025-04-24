import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SupplyChainArtifact from '../contracts/SupplyChain.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add console logs to debug
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
      try {
        console.log("Initializing Web3 context...");
        
        // Check if MetaMask is available
        if (window.ethereum) {
          console.log("MetaMask detected");
          try {
            // Check if ethereum is properly initialized before proceeding
            if (!window.ethereum || typeof window.ethereum.request !== 'function') {
              throw new Error("MetaMask not properly initialized");
            }
            
            // Connect to the Ethereum network via MetaMask
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("Connected to Ethereum network");

            // Request account access - add error handling here
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts' 
            }).catch(err => {
              console.error("Failed to get accounts:", err);
              throw new Error("Failed to connect to MetaMask. Please unlock your wallet.");
            });
            
            if (!accounts || accounts.length === 0) {
              throw new Error("No accounts found. Please create an account in MetaMask.");
            }
            
            const currentAccount = accounts[0];
            console.log("Connected account:", currentAccount);
            setAccount(currentAccount);
            
            // Get the signer
            const signer = provider.getSigner();
            
            // Get contract address with fallback for development
            let contractAddress;
            try {
              const envAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
              console.log("All env vars:", import.meta.env);

              if (typeof envAddress === "string" && envAddress.trim() !== "") {
                contractAddress = envAddress;
                console.log("Using contract address from env:", contractAddress);
              } else {
                throw new Error("Contract address is empty or not defined.");
              }
            } catch (err) {
              contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Fallback contract address
              console.log("Using fallback contract address:", contractAddress);
            }
            
            if (!SupplyChainArtifact || !SupplyChainArtifact.abi) {
              console.error("ABI not found:", SupplyChainArtifact);
              throw new Error("Contract ABI not found or invalid");
            }
            
            // Create contract instance
            const supplyChainContract = new ethers.Contract(
              contractAddress,
              SupplyChainArtifact.abi,
              signer
            );
            
            console.log("Contract instance created");
            setContract(supplyChainContract);

            // Verify contract connection
            try {
              const testCall = await supplyChainContract.getOrderCount(); // Test call to check connection
              console.log("Contract connection verified!");
            } catch (error) {
              console.error("Contract verification failed:", error);
              throw new Error("Contract not properly deployed or wrong address");
            }
            
            // Initialize with empty orders array rather than trying to load right away
            setOrders([]);
            
            // Load orders from blockchain (separate try/catch to isolate errors)
            try {
              await loadOrders(supplyChainContract);
            } catch (loadError) {
              console.error("Error loading orders:", loadError);
              setError(`Error loading orders: ${loadError.message}`);
            }
            
            // Set up event listener for new orders
            supplyChainContract.on("OrderCreated", (id, product, quantity, owner) => {
              console.log("New order created event:", id.toNumber());
              setOrders(prevOrders => [
                ...prevOrders, 
                { 
                  id: id.toNumber(), 
                  product, 
                  quantity: quantity.toNumber(), 
                  owner,
                  fulfilled: false 
                }
              ]);
            });
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
              console.log("Account changed to:", accounts[0]);
              setAccount(accounts[0]);
              loadOrders(supplyChainContract);
            });
            
          } catch (err) {
            console.error("Initialization error:", err);
            setError(`Failed to initialize Web3: ${err.message}`);
          } finally {
            setLoading(false);
          }
        } else {
          console.error("MetaMask not installed");
          setError("MetaMask not installed. Please install MetaMask to use this application.");
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError(`Failed to initialize Web3: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    init();
    
    // Cleanup listeners
    return () => {
      if (contract) {
        contract.removeAllListeners();
      }
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);
  
  // Load orders from blockchain
  const loadOrders = async (contractInstance) => {
    if (!contractInstance) {
      console.error("No contract instance provided to loadOrders");
      return;
    }
    
    try {
      console.log("Loading orders from blockchain...");
      setLoading(true);
      console.log("Contract instance:", contractInstance);
      // Get order count from contract
      const orderCount = await contractInstance.getOrderCount();
      console.log("Order count:", orderCount.toNumber());

      const loadedOrders = [];
      
      // Load each order
      for (let i = 1; i <= orderCount.toNumber(); i++) {
        console.log("Loading order ID:", i);
        const order = await contractInstance.getOrder(i);
        loadedOrders.push({
          id: order[0].toNumber(), // Make sure to access the tuple values correctly
          product: order[1],
          quantity: order[2].toNumber(),
          owner: order[3],
          fulfilled: order[4]
        });
      }
      
      console.log("Orders loaded:", loadedOrders);
      setOrders(loadedOrders);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError(`Failed to load orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  /**
   * State-changing function: creates an order on the blockchain
   * Sends a transaction that updates contract state
   * 
   * @param {string} product - The product name
   * @param {number} quantity - The quantity of the product
   * @returns {Promise<Object>} - The transaction object
   * @throws {Error} - If the transaction fails
   */
  // Create a new order on the blockchain
  const createOrder = async (product, quantity) => {
    if (!contract) throw new Error("Contract not initialized");
    
    try {
      console.log(`Creating order: ${product}, quantity: ${quantity}`);
      
      // Call the contract method
      const tx = await contract.createOrder(product, quantity, {
        maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
        maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
        gasLimit: 500000,
      });
      console.log("Transaction object:", tx);
      console.log("Transaction sent:", tx.hash);
      
      // Wait for transaction to be mined
      await tx.wait();
      console.log("Transaction mined");
      
      // Note: We don't need to update orders state manually here
      // because the OrderCreated event will trigger the state update
      
      return tx;
    } catch (err) {
      console.error("Contract error:", err);
      throw new Error(`Blockchain transaction failed: ${err.message}`);
    }
  };
  
  // Function to fulfill an order
  const fulfillOrder = async (orderId) => {
    if (!contract) throw new Error("Contract not initialized");
    
    try {
      console.log("Fulfilling order ID:", orderId);
      const tx = await contract.fulfillOrder(orderId);
      console.log("Fulfill transaction sent:", tx.hash);
      
      await tx.wait();
      console.log("Fulfill transaction mined");
      
      // Update the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, fulfilled: true } : order
        )
      );
      
      return tx;
    } catch (err) {
      console.error("Contract error:", err);
      throw new Error(`Blockchain transaction failed: ${err.message}`);
    }
  };
  
  return (
    <Web3Context.Provider value={{ 
      account, 
      orders, 
      loading, 
      error,
      createOrder,
      fulfillOrder,
      refreshOrders: () => contract && loadOrders(contract)
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
