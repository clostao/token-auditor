"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddressContract = void 0;
const ConnectorFactory_1 = require("../Utils/ConnectorFactory");
const isAddressContract = async (blockchain, address) => {
    const provider = (0, ConnectorFactory_1.providerFactory)(blockchain);
    return provider.getCode(address).then((code) => {
        return code !== "0x";
    });
};
exports.isAddressContract = isAddressContract;
//# sourceMappingURL=IsAddressContract.js.map