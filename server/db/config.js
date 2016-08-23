// exports.host = 'localhost';    // RethinkDB host
exports.host = '104.236.171.14';
exports.port = 28015;          // RethinkDB driver port
exports.db = 'smitten';           // Database that we are going to use
exports.expressPort = process.env.PORT || 3000;    // Port used by express