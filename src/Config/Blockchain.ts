import { Blockchain } from "../Types/Blockchain";

export const blockExplorerApiBaseURLByBlockchain: Record<Blockchain, string> = {
  [Blockchain.Ethereum]: "https://api.etherscan.io/api",
  [Blockchain.Goerli]: "https://api-goerli.etherscan.io/api",
};

export const rpcByBlockchain: Record<Blockchain, string> = {
  [Blockchain.Ethereum]: "https://ethereum.publicnode.com",
  [Blockchain.Goerli]:
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const chainIdByBlockchain: Record<Blockchain, number> = {
  [Blockchain.Ethereum]: 1,
  [Blockchain.Goerli]: 2,
};
