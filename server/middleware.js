var bodyParser = require('body-parser');
var session = require('express-session');


module.exports = function (app, express){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('build'));
  app.use(session({secret: 'cookie', resave: true, saveUninitialized: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

};