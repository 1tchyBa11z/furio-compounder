# Furio.io auto compounder
This script will automatically compound your FURIO accounts once the available FURIO is equal to your daily APR earnings, currently checks every 10 mins.

Enter your private key(s) into the .env file provided. The script is designed to accept a single private key or multiple private keys in a comma separated list ( no spaces )

If you are having issues with communicating with BSC, consider changing your RPC within the .env file.

## Download / clone
```
git clone https://github.com/1tchyBa11z/furio-compounder
```
Edit .env file for PRIVATE_KEYS, representing your wallet private key(s)
```
cd furio-compounder
vim .env
```
Can use whatever text editor you prefer

## Build without docker
yarn build
Never share your private keys with anyone, this equates to giving all rights over the account in question.

Anyone that has access to these private keys can take any funds located within that wallet, from any chain.

Run
node compound.js
## Docker build
Repeat above process of cloning repository / Alternatively click the green code button and select download as zip. Proceed to extract zip

```
cd furio-compounder
```

edit .env file, then
```
docker build  . -t furio-compounder
Docker run
docker run furio-compounder
```





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

