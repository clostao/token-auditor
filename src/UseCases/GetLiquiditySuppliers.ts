import { ethers, getBigInt, id, Log, toBigInt } from "ethers";
import { blockExplorerApiBaseURLByBlockchain } from "../Config/Blockchain";
import { Blockchain } from "../Types/Blockchain";
import { providerFactory } from "../Utils/ConnectorFactory";
import { getTransferLogs } from "./GetTransferLogs";

const fetch = require("node-fetch");

export const getLiquiditySuppliers = async (
  blockchain: Blockchain,
  lp: string
) => {
  const transferLogs: Log[] = await getTransferLogs(blockchain, lp);
  const coder = ethers.AbiCoder.defaultAbiCoder();

  console.log(transferLogs.length);

  const map = transferLogs
    .map(({ topics, data }) => {
      const [_, from, to] = topics;

      const [amount] = coder.decode(["uint256"], data).toArray() as [BigInt];

      return { from, to, amount: amount.valueOf() };
    })
    .reduce((acc, trx) => {
      if (trx.from !== ethers.ZeroHash) {
        let newBalance: bigint = acc[trx.from] ?? toBigInt(0) - trx.amount;
        acc[trx.from] = newBalance;
      }
      if (trx.to !== ethers.ZeroHash) {
        let newBalance: bigint = acc[trx.to] ?? toBigInt(0) + trx.amount;
        acc[trx.to] = newBalance;
      }
      return acc;
    }, {} as Record<string, bigint>);

  return Object.entries(map)
    .filter(([_account, balance]) => balance > 0)
    .map(([account, _balance]) => account);
};
