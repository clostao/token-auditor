"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiquiditySuppliers = void 0;
const ethers_1 = require("ethers");
const Blockchain_1 = require("../Config/Blockchain");
const ConnectorFactory_1 = require("../Utils/ConnectorFactory");
const fetch = require("node-fetch");
const TRANSFER_TOPIC = (0, ethers_1.id)("Transfer(address,address,uint256)");
const getTransferLogs = async (blockchain, lp) => {
    const apiBasePath = Blockchain_1.blockExplorerApiBaseURLByBlockchain[blockchain];
    const block = await (0, ConnectorFactory_1.providerFactory)(blockchain).getBlockNumber();
    return fetch(`${apiBasePath}/https://api.etherscan.io/api?module=logs&action=getLogs&address=${lp}&apikey=${process.env}&fromBlock=0&toBlock=${block}`)
        .then((response) => response.json())
        .then((object) => console.log(object));
};
const getLiquiditySuppliers = async (blockchain, lp) => {
    const transferLogs = await getTransferLogs(blockchain, lp);
    console.log(transferLogs);
};
exports.getLiquiditySuppliers = getLiquiditySuppliers;
//# sourceMappingURL=GetLiquiditySuppliers.js.map