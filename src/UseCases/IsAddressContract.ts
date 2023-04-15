import { Blockchain } from "../Types/Blockchain";
import { providerFactory } from "../Utils/ConnectorFactory";

export const isAddressContract = async (
  blockchain: Blockchain,
  address: string
): Promise<boolean> => {
  const provider = providerFactory(blockchain);

  return provider.getCode(address).then((code) => {
    return code !== "0x";
  });
};
