"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiquiditySuppliers = void 0;
const ethers_1 = require("ethers");
const Blockchain_1 = require("../Config/Blockchain");
const Blockchain_2 = require("../Types/Blockchain");
const ConnectorFactory_1 = require("../Utils/ConnectorFactory");
const fetch = require("node-fetch");
const TRANSFER_TOPIC = (0, ethers_1.id)("Transfer(address,address,uint256)");
const getTransferLogs = async (blockchain, lp) => {
    const apiBasePath = Blockchain_1.blockExplorerApiBaseURLByBlockchain[blockchain];
    const block = await (0, ConnectorFactory_1.providerFactory)(blockchain).getBlockNumber();
    return fetch(`${apiBasePath}?module=logs&action=getLogs&topic0=${TRANSFER_TOPIC}&address=${lp}&apikey=${process.env[Blockchain_2.Blockchain + "_APIKEY"]}`)
        .then((response) => response.json())
        .then((object) => object.result);
};
const getLiquiditySuppliers = async (blockchain, lp) => {
    const transferLogs = await getTransferLogs(blockchain, lp);
    const coder = ethers_1.ethers.AbiCoder.defaultAbiCoder();
    console.log(transferLogs.length);
    const map = transferLogs
        .map(({ topics, data }) => {
        const [_, from, to] = topics;
        const [amount] = coder.decode(["uint256"], data).toArray();
        return { from, to, amount: amount.valueOf() };
    })
        .reduce((acc, trx) => {
        var _a, _b;
        if (trx.from !== ethers_1.ethers.ZeroHash) {
            let newBalance = (_a = acc[trx.from]) !== null && _a !== void 0 ? _a : (0, ethers_1.toBigInt)(0) - trx.amount;
            acc[trx.from] = newBalance;
        }
        if (trx.to !== ethers_1.ethers.ZeroHash) {
            let newBalance = (_b = acc[trx.to]) !== null && _b !== void 0 ? _b : (0, ethers_1.toBigInt)(0) + trx.amount;
            acc[trx.to] = newBalance;
        }
        return acc;
    }, {});
    return Object.entries(map)
        .filter(([account, balance]) => balance > 0)
        .map(([account, balance]) => account);
};
exports.getLiquiditySuppliers = getLiquiditySuppliers;
//# sourceMappingURL=GetLiquiditySuppliers.js.map