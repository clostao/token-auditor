"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerFactory = void 0;
const ethers_1 = require("ethers");
const Blockchain_1 = require("../Config/Blockchain");
const providerFactory = (blockchain) => new ethers_1.ethers.JsonRpcProvider(Blockchain_1.rpcByBlockchain[blockchain], Blockchain_1.chainIdByBlockchain[blockchain]);
exports.providerFactory = providerFactory;
//# sourceMappingURL=ConnectorFactory.js.map