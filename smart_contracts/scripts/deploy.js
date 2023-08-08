const hre = require("hardhat");

const main = async () => {
  const Tranactions = await hre.ethers.getContractFactory("Transactions");
  const deploy = await Tranactions.deploy();

  console.log("Deployed To", deploy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
