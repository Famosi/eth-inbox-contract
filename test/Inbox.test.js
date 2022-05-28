// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli'); // local test network provider
const Web3 = require('web3'); // construnctor function
const web3 = new Web3(ganache.provider()); // connect web3 instance to the local network 

const {interface, bytecode} = require("../compile")

let accounts;
let inbox;

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    // Use one of those to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode,
            arguments: ['Hi there!']
        })
        .send({ from: accounts[0], gas: '1000000' });
});


describe('Inbox', () => {
    it('deploys a contract', () => {
       // check that the contract has an address
       assert.ok(inbox.options.address);
    });

    it('has default msg', async () => {
        const message = await inbox.methods.message().call();
        assert.ok(message);
        assert.equal(message, 'Hi there!');
    });

    it('can change msg', async () => {
        // set message is a method that requires 
        // to change the blockchain (sc) status
        // so we need to send a transaction
        const tx = await inbox.methods.setMessage('Ciao').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Ciao');
    });
});

/*
class Car {
    park(){
        return "stopped!";
    }

    drive(){
        return "vrooom!";
    }
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Car Test', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped!')
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vrooom!')
    });
});*/

