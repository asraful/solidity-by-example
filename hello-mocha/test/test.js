const assert = require('assert');
const ganache = require('ganache-cli'); 

const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const myModule = require('../compile');
const interface = myModule.interface;
const bytecode = myModule.bytecode;

const abi = interface.abi;

let accounts;
let inbox;


beforeEach(async () => {
	accounts = await web3.eth.getAccounts();


	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy( {data: bytecode, arguments: ['hello world'] })
		.send( {from: accounts[0],gas: '1000000' }); 

	inbox.setProvider(provider);

});


describe('Inbox', () => {
	it('deploys a contract', () 	=> {
		 assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.getMessage().call();
		assert.equal(message, 'hello world');
	});
});

/*
//example to use mocha
class Car {

	park() {
		return 'stopped';
	}

	drive() {
		return 'vroom';
	}
}

let car;

beforeEach(() => {
	car = new Car();
});

describe ('Car', () => {
	it('can park', () => {
		 assert.equal(car.park(), 'stopped');
	});

	it('can drive', () => {
		 assert.equal(car.drive(), 'vroom');
	});
});

*/
