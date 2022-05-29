require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://rinkeby.infura.io/v3/d779a1b3c7754f1a8620ccb75cc2d755'
)

// web3 isntance
const web3 = new Web3(provider);

// deploy
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi There!']
        })
        .send({from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}
deploy();
