import { getLiquiditySuppliers } from "./UseCases/GetLiquiditySuppliers";
import { Blockchain } from "./Types/Blockchain";
import { ethers } from "ethers";
import { providerFactory } from "./Utils/ConnectorFactory";
import { isAddressContract } from "./UseCases/IsAddressContract";

interface Config {
  // if neither of the liquidity suppliers is a smart contract the audit would fail
  forbidOnlyEOASuppliers?: boolean;
  // minimum number of liquidity suppliers
  minimumSuppliers: number;
}

export const auditLiquidityPool = async (
  { forbidOnlyEOASuppliers = false, minimumSuppliers }: Config,
  blockchain: Blockchain,
  token: string,
  lp: string
): Promise<boolean> => {
  const provider = providerFactory(blockchain);
  const suppliers = await getLiquiditySuppliers(blockchain, lp);

  if (suppliers.length < minimumSuppliers) {
    console.log("Not enough suppliers");
    return false;
  }

  if (forbidOnlyEOASuppliers) {
    const promises = await Promise.all(
      suppliers.map((supplier) => isAddressContract(blockchain, supplier))
    );
    if (promises.every((isContract) => isContract === false)) {
      console.log("Only EOA suppliers");
      return false;
    }
  }

  return true;
};
