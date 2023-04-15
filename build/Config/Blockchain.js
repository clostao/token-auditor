"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainIdByBlockchain = exports.rpcByBlockchain = exports.blockExplorerApiBaseURLByBlockchain = void 0;
const Blockchain_1 = require("../Types/Blockchain");
exports.blockExplorerApiBaseURLByBlockchain = {
    [Blockchain_1.Blockchain.Ethereum]: "https://api.etherscan.io/api",
    [Blockchain_1.Blockchain.Goerli]: "https://api-goerli.etherscan.io/api",
};
exports.rpcByBlockchain = {
    [Blockchain_1.Blockchain.Ethereum]: "https://ethereum.publicnode.com",
    [Blockchain_1.Blockchain.Goerli]: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};
exports.chainIdByBlockchain = {
    [Blockchain_1.Blockchain.Ethereum]: 1,
    [Blockchain_1.Blockchain.Goerli]: 2,
};
//# sourceMappingURL=Blockchain.js.map