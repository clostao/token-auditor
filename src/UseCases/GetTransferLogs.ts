import { id } from "ethers";
import { blockExplorerApiBaseURLByBlockchain } from "../Config/Blockchain";
import { Blockchain } from "../Types/Blockchain";
import { providerFactory } from "../Utils/ConnectorFactory";
const fetch = require("node-fetch");

const TRANSFER_TOPIC = id("Transfer(address,address,uint256)");

export const getTransferLogs = async (
  blockchain: Blockchain,
  token: string
) => {
  const apiBasePath = blockExplorerApiBaseURLByBlockchain[blockchain];

  const block = await providerFactory(blockchain).getBlockNumber();

  return fetch(
    `${apiBasePath}?module=logs&action=getLogs&topic0=${TRANSFER_TOPIC}&address=${token}&apikey=${
      process.env[Blockchain + "_APIKEY"]
    }`
  )
    .then((response: Response) => response.json())
    .then((object: any) => object.result);
};
