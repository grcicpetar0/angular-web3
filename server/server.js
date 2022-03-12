console.log('Loading Server');
const WEB = __dirname.replace('server', 'dist');

var express = require('express'); //have to have loaded this module onto your machine first
var logger = require('morgan');
var bodyParser = require('body-parser'); //NEW
var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const nconf = require('nconf');

nconf.argv().env().file({file: 'config.json'});

var routes = require('./api.js');
var dao = require('./mongo-dao.js');

var app = express();


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application
app.use(flash());
app.use(expressSession({ secret: nconf.get("sessionSecret"), resave: false, saveUninitialized: false }));


// app.use(function (req, res, next) {
//   console.log(`in my middleware, req.body:${JSON.stringify(req.body)}`);
//   next()
// })
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routes);

app.use(express.static(WEB)); //this turns it into a server like Apache server that we were using before //secret sauce //will feed your html your images
app.use(express.static(__dirname.replace('server', 'node_modules/@angular/material/prebuilt-themes')));

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/index.html');
});


var server = app.listen(nconf.get("port"), nconf.get("ip"), function() {
    console.log(`Server listening on ${nconf.get("ip")}:${nconf.get("port")}`);
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

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nconf.get('emailUser'),
        pass: nconf.get('emailPass')
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: nconf.get('emailUser'), // sender address
    to: nconf.get('emailRecipients'), // list of receivers
    subject: 'Weekly Todo Report', // Subject line
    text: '.....', // plain text body
};
                    //0:0:0 any day, any month, on Mondays
schedule.scheduleJob('0 0 0 * * 1', function(){
    // send mail with defined transport object
    dao.getAll(function(err, emps){
        if (err) console.log(err);
        mailOptions.text = "Weekly Report of Employee Todos: \n\n";
        emps.forEach(function(emp) {
            mailOptions.text += emp.name;
            mailOptions.text += '\n';
            emp.tasks.forEach(function(task){
                mailOptions.text += `\t${task.recurring ? "\u27f2" : "    "} ${task.done ? "\u2713" : "x  "} ${task.text}\n`;
            })
            mailOptions.text += '\n\n';
        }, this);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        dao.weeklyReset(function(err, result) {
          if(err) {
            console.log(err);
          }
        })
    });
});
