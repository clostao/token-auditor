import "dotenv/config";
import process, { exit } from "process";
import { ethers } from "ethers";
import { auditLiquidityPool } from "./Auditor";
import { Blockchain } from "./Types/Blockchain";

if (process.argv.length !== 4) {
  console.error(
    "Bad args count: expected ${tokenAddress} ${liquidityPoolAddress}"
  );
  exit(0);
}

const [_, __, tokenAddress, lpAddress] = process.argv;

if (ethers.isAddress(tokenAddress) == false) {
  console.error("Token address is bad formatted");
  exit(0);
}

if (ethers.isAddress(lpAddress) == false) {
  console.error("Liquidity pool address is bad formatted");
  exit(0);
}

auditLiquidityPool(
  { minimumSuppliers: 0 },
  Blockchain.Ethereum,
  tokenAddress,
  lpAddress
).then((passed) => console.log(passed));
