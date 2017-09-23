const net = require('net');
let client = new net.Socket();

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

client.on('connect', () => {
	console.log('connected to the server!');
	rl.prompt();
});

client.connect({
	'host' : '172.18.1.76',
	'port' : 9000
});

rl.on('line', (input) => {
	client.write(input);
	rl.prompt();
});
