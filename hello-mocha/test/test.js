const assert = require('assert');
const ganache = require('ganache-cli'); 
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

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

});


describe('Inbox', () => {
	it('deploys a contract', () => {
		 console.log(inbox);
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
