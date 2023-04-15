"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importStar(require("process"));
const ethers_1 = require("ethers");
const Auditor_1 = require("./Auditor");
const Blockchain_1 = require("./Types/Blockchain");
if (process_1.default.argv.length !== 4) {
    console.error("Bad args count: expected ${tokenAddress} ${liquidityPoolAddress}");
    (0, process_1.exit)(0);
}
const [_, __, tokenAddress, lpAddress] = process_1.default.argv;
if (ethers_1.ethers.isAddress(tokenAddress) == false) {
    console.error("Token address is bad formatted");
    (0, process_1.exit)(0);
}
if (ethers_1.ethers.isAddress(lpAddress) == false) {
    console.error("Liquidity pool address is bad formatted");
    (0, process_1.exit)(0);
}
(0, Auditor_1.auditLiquidityPool)({}, Blockchain_1.Blockchain.Ethereum, tokenAddress, lpAddress).then((passed) => console.log(passed));
//# sourceMappingURL=index.js.map