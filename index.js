var server = require('./server/server.js')

var port = process.env.PORT || 3000;

server.listen(port);
console.log("Listening on port " + port);