console.log('Loading Server');
const WEB = __dirname.replace('server', 'dist');

var express = require('express'); //have to have loaded this module onto your machine first
var logger = require('morgan');
var bodyParser = require('body-parser'); //NEW

var routes = require('./api.js');

var app = express();


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application

app.use('/api', routes);

app.use(express.static(WEB)); //this turns it into a server like Apache server that we were using before //secret sauce //will feed your html your images 

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/index.html');
});


var server = app.listen('8080', '127.0.0.1', function() {
    console.log(`Server listening on 127.0.0.1:8080`);
});

function gracefullShutdown() {
    console.log('Starting Shutdown');
    // dbProc.kill();
    process.exit();
    server.close(function() {
        console.log('Shutdown Complete');
    });
}

process.on('SIGTERM', function() { //kill (terminate)
    gracefullShutdown();
});

process.on('SIGINT', function() { //Ctrl+C (interrupt)
    gracefullShutdown();
});