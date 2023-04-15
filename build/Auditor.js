"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLiquidityPool = void 0;
const GetLiquiditySuppliers_1 = require("./UseCases/GetLiquiditySuppliers");
const ConnectorFactory_1 = require("./Utils/ConnectorFactory");
const IsAddressContract_1 = require("./UseCases/IsAddressContract");
const auditLiquidityPool = async ({ forbidOnlyEOASuppliers = false, minimumSuppliers }, blockchain, token, lp) => {
    const provider = (0, ConnectorFactory_1.providerFactory)(blockchain);
    const suppliers = await (0, GetLiquiditySuppliers_1.getLiquiditySuppliers)(blockchain, lp);
    if (suppliers.length < minimumSuppliers) {
        console.log("Not enough suppliers");
        return false;
    }
    if (forbidOnlyEOASuppliers) {
        const promises = await Promise.all(suppliers.map((supplier) => (0, IsAddressContract_1.isAddressContract)(blockchain, supplier)));
        if (promises.every((isContract) => isContract === false)) {
            console.log("Only EOA suppliers");
            return false;
        }
    }
    return true;
};
exports.auditLiquidityPool = auditLiquidityPool;
//# sourceMappingURL=Auditor.js.map