# Blockchain Supply Chain Application

This project is a blockchain-based supply chain application built using React for the frontend and Express.js for the backend. It utilizes Hardhat for smart contract development and deployment on the Ethereum blockchain. It utilizes Hardhat for smart contract development and deployment on the Ethereum blockchain, connecting to the network via public RPC nodes instead of running its own.

## Project Structure

```
blockchain-supply-chain
├── client                # Frontend application
│   ├── public            # Public assets
│   │   └── index.html    # Main HTML file
│   ├── src               # Source files for React application
│   │   ├── components     # React components
│   │   │   ├── CreateOrder.jsx  # Component for creating orders
│   │   │   ├── Home.jsx         # Landing page component
│   │   │   ├── Navigation.jsx    # Navigation bar component
│   │   │   └── ViewOrders.jsx    # Component for viewing orders
│   │   ├── contexts          # Context API for state management
│   │   │   └── Web3Context.jsx  # Web3 context provider
│   │   ├── utils             # Utility functions
│   │   │   └── web3Utils.js   # Functions for blockchain interaction
│   │   ├── App.jsx           # Main application component
│   │   └── index.js          # Entry point for React application
│   └── package.json         # Client-side dependencies and scripts
├── server                  # Backend application
│   ├── controllers          # Controllers for handling requests
│   │   └── orderController.js  # Order-related API logic
│   ├── routes               # API routes
│   │   └── api.js           # API route definitions
│   ├── app.js               # Express application setup
│   └── server.js            # Entry point for the server
├── contracts               # Smart contracts
│   └── SupplyChain.sol      # Solidity smart contract
├── scripts                 # Deployment scripts
│   └── deploy.js            # Script for deploying the smart contract
├── test                    # Tests for smart contracts
│   └── SupplyChain.test.js   # Smart contract tests
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Overall project dependencies and scripts
└── README.md               # Project documentation
```

## Getting started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Hardhat (for smart contract development)

### Built with
<div align="center">
	<table>
		<tr>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/http.png" alt="HTTP" title="HTTP"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png" alt="Git" title="Git"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png" alt="GitHub" title="GitHub"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/visual_studio_code.png" alt="Visual Studio Code" title="Visual Studio Code"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" alt="HTML" title="HTML"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" alt="CSS" title="CSS"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/bootstrap.png" alt="Bootstrap" title="Bootstrap"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" alt="JavaScript" title="JavaScript"/></code></td>
		</tr>
		<tr>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" title="React"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/npm.png" alt="npm" title="npm"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" alt="Node.js" title="Node.js"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/solidity.png" alt="Solidity" title="Solidity"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/hardhat.png" alt="Hardhat" title="Hardhat"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/metamask.png" alt="Metamask" title="Metamask"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/ethereum.png" alt="Ethereum" title="Ethereum"/></code></td>
			<td><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/windows.png" alt="Windows" title="Windows"/></code></td>
		</tr>
	</table>
</div>

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/blockchain-supply-chain.git
   cd blockchain-supply-chain
   ```

2. Install dependencies for the client:

   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:

   ```
   cd ../server
   npm install
   ```

4. Install Hardhat globally if you haven't already:

   ```
   npm install -g hardhat
   ```

### Running the Application

1. Start the backend server:

   ```
   cd server
   node server.js
   ```

2. In a new terminal, start the frontend application:

   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Usage

- **Home Page**: The landing page of the application.
- **Create Order**: A form to create new orders in the supply chain.
- **View Orders**: A page to view existing orders.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
