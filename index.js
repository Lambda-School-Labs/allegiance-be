// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
// console.log(numCPUs)
// console.log(cluster)
// console.log(cluster.fork())

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   console.log('2 \n',cluster)

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   console.log(`DOWN`);

//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');
//     console.log(`Worker PID ${process.pid} is called`);
//   }).listen(8000);

//   console.log(`Worker ${process.pid} started`);
// }

// const express = require('express');
// const cluster = require('cluster');
// const net = require('net');
// const socketio = require('socket.io');
// const socketMain = require('./socketMain');
// // const expressMain = require('./expressMain');
// const middleware = require('./middleware')
// const port = 5000;
// const num_processes = require('os').cpus().length;
// // Brew breaks for me more than it solves a problem, so I 
// // installed redis from https://redis.io/topics/quickstart
// // have to actually run redis via: $ redis-server (go to location of the binary)
// // check to see if it's running -- redis-cli monitor
// const io_redis = require('socket.io-redis');
// const farmhash = require('farmhash');

// if (cluster.isMaster) {
// 	// This stores our workers. We need to keep them to be able to reference
// 	// them based on source IP address. It's also useful for auto-restart,
// 	// for example.
// 	let workers = [];

// 	// Helper function for spawning worker at index 'i'.
// 	let spawn = function(i) {
// 		console.log('.FORK() method 🥁 ',cluster.fork())
// 		workers[i] = cluster.fork();

// 		// Optional: Restart worker on exit
// 		workers[i].on('exit', function(code, signal) {
// 			console.log('respawning worker i:', i);
// 			spawn(i);
// 		});
//     };

//     // Spawn workers.
// 	for (var i = 0; i < num_processes; i++) {
// 		spawn(i);
// 	}

// 	// Helper function for getting a worker index based on IP address.
// 	// This is a hot path so it should be really fast. The way it works
// 	// is by converting the IP address to a number by removing non numeric
//     // characters, then compressing it to the number of slots we have.
// 	//
// 	// Compared against "real" hashing (from the sticky-session code) and
// 	// "real" IP number conversion, this function is on par in terms of
// 	// worker index distribution only much faster.
// 	const worker_index = function(ip, len) {
// 		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
// 	};


//     // in this case, we are going to start up a tcp connection via the net
//     // module INSTEAD OF the http module. Express will use http, but we need
//     // an independent tcp port open for cluster to work. This is the port that 
//     // will face the internet
// 	const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
// 		// We received a connection and need to pass it to the appropriate
// 		// worker. Get the worker for this connection's source IP and pass
// 		// it the connection.
// 		let worker = workers[worker_index(connection.remoteAddress, num_processes)];
// 		worker.send('sticky-session:connection', connection);
//     });
//     server.listen(port);
//     console.log(`Master listening on port ${port}`);
// } else {
//     // Note we don't use a port here because the master listens on it for us.
//     let app = express();
//     // app.use(express.static(__dirname + '/public'));
// 	middleware(app)
	
//     app.get("/", (req, res) => {
//       res.send("Welcome to Allegiance!");
//     });	
//     // Don't expose our internal server to the outside world.
//     const server = app.listen(0, 'localhost');
//     console.log("Worker listening...");    
// 	const io = socketio(server);

// 	// Tell Socket.IO to use the redis adapter. By default, the redis
// 	// server is assumed to be on localhost:6379. You don't have to
// 	// specify them explicitly unless you want to change them.
// 	// redis-cli monitor
// 	io.adapter(io_redis({ host: '127.0.0.1', port: 16379 }));
// 	socketMain(io)
// 	console.log(`connected to worker: ${cluster.worker.id}`);

// // Here you might use Socket.IO middleware for authorization etc.
// 	// on connection, send the socket over to our module with socket stuff
//     // io.on('connection', function(socket) {
// 		// socketMain(io,socket);
// 		// // console.log(`connected to worker: ${cluster.worker.id}`);
//     // });


// 	// Listen to messages sent from the master. Ignore everything else.
// 	process.on('message', function(message, connection) {
// 		if (message !== 'sticky-session:connection') {
// 			return;
// 		}

// 		// Emulate a connection event on the server by emitting the
// 		// event with the connection the master sent us.
// 		server.emit('connection', connection);

// 		connection.resume();
// 	});
// }

var express = require('express'),
    cluster = require('cluster'),
    net = require('net'),
    sio = require('socket.io'),
    sio_redis = require('socket.io-redis'),
    farmhash = require('farmhash');

var port = 8000,
    num_processes = require('os').cpus().length;

if (cluster.isMaster) {
	// This stores our workers. We need to keep them to be able to reference
	// them based on source IP address. It's also useful for auto-restart,
	// for example.
	var workers = [];

	// Helper function for spawning worker at index 'i'.
	var spawn = function(i) {
		workers[i] = cluster.fork();

		// Optional: Restart worker on exit
		workers[i].on('exit', function(code, signal) {
			console.log('respawning worker', i);
			spawn(i);
		});
    };

    // Spawn workers.
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}
	// Helper function for getting a worker index based on IP address.
	// This is a hot path so it should be really fast. The way it works
	// is by converting the IP address to a number by removing non numeric
  // characters, then compressing it to the number of slots we have.
	//
	// Compared against "real" hashing (from the sticky-session code) and
	// "real" IP number conversion, this function is on par in terms of
	// worker index distribution only much faster.
	var worker_index = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
	};

	// Create the outside facing server listening on our port.
	var server = net.createServer({ pauseOnConnect: true }, function(connection) { //socket 
		// We received a connection and need to pass it to the appropriate
		// worker. Get the worker for this connection's source IP and pass
    // it the connection.
    console.log(
      "this is connection =>", connection
    )
    var worker = workers[worker_index(connection.remoteAddress, num_processes)];
    console.log(worker)

		worker.send('sticky-session:connection', connection);
	}).listen(port);
} else {
    // Note we don't use a port here because the master listens on it for us.
  var app = new express();
  app.use(require('helmet')())

	// Here you might use middleware, attach routes, etc.

	// Don't expose our internal server to the outside.
	var server = app.listen(0, 'localhost'),
	    io = sio(server);

	// Tell Socket.IO to use the redis adapter. By default, the redis
	// server is assumed to be on localhost:6379. You don't have to
	// specify them explicitly unless you want to change them.
  io.adapter(sio_redis({ host: '127.0.0.1', port: 16379 }));


	// Here you might use Socket.IO middleware for authorization etc.

	// Listen to messages sent from the master. Ignore everything else.
	process.on('message', function(message, connection) {
		if (message !== 'sticky-session:connection') {
			return;
		}

		// Emulate a connection event on the server by emitting the
		// event with the connection the master sent us.
		server.emit('connection', connection);

		connection.resume();
	});
}