import { ethers, Signer } from "ethers";
import { chainIdByBlockchain, rpcByBlockchain } from "../Config/Blockchain";
import { Blockchain } from "../Types/Blockchain";

export const providerFactory = (blockchain: Blockchain) =>
  new ethers.JsonRpcProvider(
    rpcByBlockchain[blockchain],
    chainIdByBlockchain[blockchain]
  );
