var express = require('express');
var app = express();
// 'app' is a function handler to be used in the HTTP server created below
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./middleware.js')(app, express);
require('./routes.js')(app, express);

io.on('connection', function(socket) {
  console.log('a user connected');
});

// export 'server' instead of 'app' to have it listen for a port in index.js
module.exports = server;