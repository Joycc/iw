var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8888;
var conn = new Array();

var server = net.createServer();
server.listen(PORT);
console.log('Server listening on ' + server.address().address + ":" + server.address().port);

server.on('connection', function(sock) {
    console.log('CONNECTED: ' +
        sock.remoteAddress +':'+ sock.remotePort);
	conn.push(sock)

	console.log(conn.length)

	sock.on('data', function(data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);

		for(var index in conn) {
			console.log('tcpserver write' + data)
			if(conn[index].writable){
			    conn[index].write(data)
			}
		}
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });
});
