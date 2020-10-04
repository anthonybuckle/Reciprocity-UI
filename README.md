
![Reciprocity Logo](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/reciprocity_logo.png)

Reciprocity UI

Reciprocity UI is the interface for the experimental blockchain Reciprocity. The UI supports basic transactions, mining and limited smart contracts. I started this project in 2017 as a hobby. The primary goal of the project was to develop a skill set in another programming language and as a tool to learn core blockchain principles. My wife April helped design and created the reciprocity logo and wallet theme. I started experimenting with atomic swaps, side chains and multi-signatures transactions. I did not finish their implementation. To date reciprocity is not under development, so I have decided to release the code for others to gain value from my experiences. The mobile IOS and android wallets do not support all of the Reciprocity feature set and their implementation is not finished.

Reciprocity uses port 8912 for wallet json rpc requests.

MIT Licensed

Reciprocity CLI supports more features than Reciprocity UI.

Reciprocity UI requires the following:

* Requires NodeJS
* Requires Lerna
* Requires js-sha3
* Requires Yarn

To run the web wallet:

Under the root of Reciprocity UI run, 

> npm install --global lerna (If lerna is not installed) 
 
> yarn run reset

> cd web

> yarn start

Reciprocity Web Wallet Examples

1) Get accounts and balances:

![Accounts](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Accounts.png)

2) Start the mining process for blocks and transactions:

![Mining](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Mining.png)

4) Send a transaction

![Send Transaction](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Transaction1.png)

![Send Transaction](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Transaction2.png)

5) Deploy a smart erc20 token smart contract with an initial balance of 10000

![Deploy Contract](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Deploy1.png)

![Deploy Contract](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Deploy2.png)

![Contracts](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-Contracts.png)

6) Call a erc20 smart contract method totalSupply(), which returns 10000 for the balance.

![Call Contract](https://github.com/anthonybuckle/Reciprocity-UI/blob/main/shared/img/Web-ContractCall.png)

To build Reciprocity UI in a Docker Container

> docker build --rm -f "Dockerfile" -t reciprocity_ui:latest .

> docker run --rm -d -p 3000:3000 --name reciprocity_ui reciprocity_ui:latest

> docker exec -it <container> bash

IOS

> pod install

Android

> export ANDROID_HOME=$HOME/Library/Android/sdk

> export PATH=$PATH:$ANDROID_HOME/emulator

> export PATH=$PATH:$ANDROID_HOME/tools

> export PATH=$PATH:$ANDROID_HOME/tools/bin

> export PATH=$PATH:$ANDROID_HOME/platform-tools