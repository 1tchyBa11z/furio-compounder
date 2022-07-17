# Furio.io auto compounder

This script will automatically compound your FURIO accounts once the available FURIO is equal to your daily APR earnings, currently checks every 10 mins.

Enter your private key(s) into the .env file provided. The script is designed to accept a single private key or multiple private keys in a comma separated list ( no spaces )

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

