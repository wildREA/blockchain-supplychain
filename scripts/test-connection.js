// scripts/test-connection.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing with account:", deployer.address);

  const provider = ethers.provider;
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name, network.chainId);

  // Check if we're on the expected network (Hardhat local is chainId 31337)
  if (Number(network.chainId) !== 31337) {
    console.warn("You're not connected to the local Hardhat network!");
    console.warn("Expected chain ID 31337, got", network.chainId);
    console.warn("Please connect to the Hardhat local network in MetaMask");
    return;
  }

  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Fallback address
  console.log("Using test_con contract address:", address);
  const contract = SupplyChain.attach(address);
  
  try {
    const count = await contract.getOrderCount();
    console.log("Order count:", count.toString());
    console.log("Success! Contract is properly deployed and accessible");
  } catch (error) {
    console.error("Failed to call contract:", error);
    
    // Provide more specific guidance
    if (error.message.includes("call revert exception")) {
      console.error("This likely means the contract is not deployed at this address");
      console.error("Try deploying the contract first with: npx hardhat run scripts/deploy.js --network localhost");
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
