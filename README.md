# Furio.io auto compounder

This script will automatically compound your FURIO accounts once the available FURIO is over the value you set it to within the .env file, currently  checks every 10 mins.

Enter your private key(s) into the .env file provided. The script is designed to accept a single private key or multiple private keys in a comma separated list ( no spaces )

In the .env file you must specify the number of tokens you wish to be available before compounding initiates. Populate the VALUE parameter with the number of tokens to compound, the order of the VALUES must be in the same order as the PRIVATE_KEYS.

If you are having issues with communicating with BSC, consider changing your RPC within the .env file.

## Build

```
yarn build
```

__Never share your private keys with anyone, this equates to giving all rights over the account in question.__

__Anyone that has access to these private keys can take any funds located within that wallet, from any chain.__


## Run

```
node compound.js
```

