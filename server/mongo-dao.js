var _ = require('lodash');
var mongoall = require('mongodb');
var mongo = mongoall.MongoClient;
var o_id = mongoall.ObjectID;
const nconf = require('nconf');

nconf.argv().env().file({file: 'config.json'});


var url = `mongodb://${nconf.get("mongoHost")}/EmpTodos`;

var exports;

exports.getAll = function(callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err);

        var collection = db.collection('employees');

        collection.find({}).toArray(function(err, emps){
            var taskCollection = db.collection('tasks');
            taskCollection.find({}).toArray(function(err, tasks){
                var groupedTasks = _.groupBy(tasks, 'empid');
                emps.forEach(emp => emp.tasks = groupedTasks[emp._id] || []);
                db.close();
                callback(err, emps);
            });
        });
    });
};

exports.deleteTask = function(taskid, callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err);

        var collection = db.collection('tasks');

        collection.deleteOne({_id:o_id(taskid)}, function(err, result){
          db.close();
          callback(err, result);
        });
    });
}

exports.addTask = function(task, callback){
    mongo.connect(url, function(err, db){
        if(err) callback(err);

        var collection = db.collection('tasks');
        collection.insertOne(task, function(err, result){
          db.close();
          callback(err, result);
        });
    })
}

exports.updateTask = function(taskid, done, callback) {
    mongo.connect(url, function(err, db) {
      if(err) callback(err);

      var collection = db.collection('tasks');
      collection.updateOne( {_id:o_id(taskid)}, {$set:{done:done.done}}, function(err, result){
        db.close();
        callback(err, result);
      });
    })
}

exports.findUser = function(username, callback){
    mongo.connect(url, function(err, db) {
        if(err) callback(err);

        var collection = db.collection('employees');

        collection.findOne({username:username}, function(err, result){
            db.close();
            callback(err, result);
        });
    });
}

exports.weeklyReset = function(callback) {
  mongo.connect(url, function(err, db) {
    if(err) callback(err);

    var taskCollection = db.collection('tasks');

    taskCollection.find({}).toArray(function(err, tasks){
      var empCollection = db.collection("employees");
      empCollection.find({}).toArray(function(err, emps) {
        var historyCollection = db.collection("history");
        historyCollection.insertOne({tasks:tasks, employees:emps}, function(err, result){

          taskCollection.deleteMany({recurring:false}, function(err, result) {
            db.close();
            callback(err, result);
          })
        })
      })
    })


  })

}

module.exports = exports;
