# SafeHarbor Decentralized Finance

![SafeHarbor DeFi](https://gateway.pinata.cloud/ipfs/QmaX61W1rbRquMzGjWs4CKFXtRjYhHEsNdtXGV45QZQ7nV)

## Prerequisites

    node --version 16.x
    git 
    yarn

### Clone repo

    git clone https://github.com/losMacos/SafeHarbor-Defi-Staking.git
    cd SafeHarbor-Defi-Staking

### Install Hardhat, compile, deploy and verify contracts on Goerli testnet
1) Install
    cd hardhat-backend
    yarn install

2) Setup `.env` - input values into `.env.example` then change name of file to `.env`

3) Compile, deploy and verify contracts

    yarn hardhat compile
    yarn hardhat deploy --network goerli

a) The RewardToken.sol deployment may not verify, so the following command will verify the contract:

    yarn hardhat verify --contract contracts/RewardToken.sol:RewardToken <contract address with no quotations> --network goerli

### Add deployed contract ABI's and new contract address into `front-end`

1) 



