var mongoall = require('mongodb');
var mongo = mongoall.MongoClient;

var url = 'mongodb://localhost:27017/EmpTodos';

mongo.connect(url, function(err, db){
  db.dropCollection('employees', function(){
    var collection = db.collection('employees');
    collection.insertMany([
      {
        name: "Sally Salamander"
      },
      {
        name: "John Johnson"
      },
      {
        name: "Catbert"
      }
    ], function(err, result){
      // console.log(result);
      db.dropCollection('tasks', function(){
        var taskCollection = db.collection('tasks');
        taskCollection.insertMany([
          {text:"clean computers", done:true, empid:result.insertedIds[0]},
          {text:"email frank", done:false, empid:result.insertedIds[0]},
          {text:"make invoice", done:false, empid:result.insertedIds[0]},
          {text:"clean toilet", done:false, empid:result.insertedIds[1]},
          {text:"take out trash", done:false, empid:result.insertedIds[1]},
          {text:"mop floors", done:false, empid:result.insertedIds[1]},
          {text:"Fire Dilbert", done:false, empid:result.insertedIds[2]},
          {text:"Cackle", done:true, empid:result.insertedIds[2]},
          {text:"Yell at Wally", done:false, empid:result.insertedIds[2]}
        ], function(err, result){
          db.close();
        })
      })
    })
  })
})
