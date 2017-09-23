const net = require('net');

let server = new net.Server();

server.on('connection' () => {
	let clientAddress = client.remoteAddress;

	console.log("A client connected, address: " + clientAddress);

	client.on('close', () => {

	})
})

server.on('listening', () => {
	console.log('Server is now listening.');
});

server.listen(9000);
