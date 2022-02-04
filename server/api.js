var express = require('express');
var router = express.Router();
var dao = require('./mongo-dao.js');

router.get('/employees', function(req, res){
    dao.getAll(function(err, emps){
        if (err) throw err;
        res.send(emps);
        // console.log(emps);
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
