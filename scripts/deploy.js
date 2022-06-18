const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const BlockHash = await hre.ethers.getContractFactory("BlockHash");
  const blockhash = await BlockHash.deploy();

  await blockhash.deployed();

  console.log("BlockHash deployed to:", blockhash.address);

  fs.writeFileSync(
    "./utils/contractAddress.js",
    `
  export const BlockHashAddress = "${blockhash.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
