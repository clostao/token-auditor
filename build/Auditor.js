"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLiquidityPool = void 0;
const GetLiquiditySuppliers_1 = require("./UseCases/GetLiquiditySuppliers");
const auditLiquidityPool = async ({ forbidOnlyEOASuppliers = false }, blockchain, token, lp) => {
    await (0, GetLiquiditySuppliers_1.getLiquiditySuppliers)(blockchain, lp);
    return true;
};
exports.auditLiquidityPool = auditLiquidityPool;
//# sourceMappingURL=Auditor.js.map