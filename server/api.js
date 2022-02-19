var express = require('express');
var router = express.Router();
var dao = require('./mongo-dao.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

passport.use(new jwtStrategy({jwtFromRequest: extractJwt.fromBodyField("token"), secretOrKey: "secret"}, function(payload, done){
  dao.findUser(payload.username, function(err, user){
    if(err) return done(err, false);
    if(user) done(null, user);
    else done(null, false);
  })
}))

passport.use(new LocalStrategy(
  function(username, password, done) {
    //   console.log(`in passport.use(), u:${username}, p:${password}`);
    dao.findUser(username, function(err, user) {
    //   console.log(`in dao.finduserCALLBACK(), u:${JSON.stringify(user)}`);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.post('/login',
  passport.authenticate('local'),
                                //    failureFlash: true })
    function(req, res) {
        // console.log(`in passport.authenticateCALLBACK, req.user: ${JSON.stringify(req.user)}`);
      req.user.token = jwt.sign(req.user, "secret");
      res.send(req.user);
});

router.post('/tokenLogin',
  passport.authenticate('jwt'), function (req, res){
    res.send(req.user);
  }
);

passport.serializeUser(function(user, cb) {
    // console.log(`in serialize, user: ${JSON.stringify(user)}`);
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
//   console.log(`in deserialize, username: ${username}`);
  dao.findUser(username, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.get('/employees', function(req, res){
    dao.getAll(function(err, emps){
        if (err) throw err;
        // console.log(emps);
        res.send(emps);
        // res.sendStatus(200);
    });
})

router.get('/tasks/:empid', function(req, res) {
    console.log("got get for " + req.params.empid);
    res.sendStatus(200);
});

router.delete('/tasks/:taskid', function(req, res) {
    dao.deleteTask(req.params.taskid, function(err, result){
        if(err) throw err;
        res.sendStatus(200);
    });
});

router.post('/tasks', function(req, res) {
    dao.addTask(req.body, function(err, result){
        if(err) throw err;
        res.send(result.insertedId);
    });
});

router.patch('/tasks/:taskid', function(req, res) {
  console.log(req.body)
  dao.updateTask(req.params.taskid, req.body, function(err, result){
    if(err) throw err;
    res.sendStatus(200);
  })
})
module.exports = router;
