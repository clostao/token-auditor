# Token auditor

A cli program to identify if a token is either legit or scam provided the address and main LP address.

# When a token is legit

- Liquidity supply: It is analysed the liquidity status of the pool. We retrieve all the Transfers events of the LP token in order to have the balance of each holder.

There are two configurable values:

- `minimumSuppliers`: If the suppliers for that LP is less than this value the audit would fail.
- `forbidOnlyEOASuppliers (default = false)`: If all suppliers are EOAs the audit would fail.

# How to build

Since this is a NodeJS package the project is built:

```bash
yarn
yarn build
```

# How to use

Once the package has been built run the following command:

```bash
yarn run auditor ${tokenAddress} ${lpTokenAddress}
```
