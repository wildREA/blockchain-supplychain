const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();
  const contract = await SupplyChain.connect(deployer).deploy();
  
  await contract.waitForDeployment();
  await supplyChain.waitForDeployment();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("SupplyChain deployed to:", await supplyChain.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
