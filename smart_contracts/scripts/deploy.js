const hre = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deployers Address:", deployer.address);
  //  console.log("Deployers balance:", (await deployer.getBalance('ethers.eth')).toString());
  const transactions = await hre.ethers.deployContract("Transactions");
  // const deploy = await Tranactions.deployContract();
  const addr = await transactions.waitForDeployment();

  console.log("Deployed To", addr.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
