const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 =  require('web3'); // capitalized because it is a constructor function
const web3 = new Web3(ganache.provider()); // instance of web3 to connect to local test network
const { interface, bytecode } = require('../compile'); 

let accounts;
let inbox;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox)
    });
});