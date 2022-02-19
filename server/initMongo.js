var mongoall = require('mongodb');
var mongo = mongoall.MongoClient;

var url = 'mongodb://localhost:27017/EmpTodos';

mongo.connect(url, function(err, db){
  db.dropCollection('employees', function(){
    var collection = db.collection('employees');
    collection.insertMany([
      {
        name: "Sally Salamander",
        username: "ssmander",
        password: "lizardcity",
        role: "employee"
      },
      {
        name: "John Johnson",
        username: "jjohnson",
        password: "123456",
        role: "employee"
      },
      {
        name: "Catbert",
        username: "yournightmare",
        password: "suffering",
        role: "employer"
      }
    ], function(err, result){
      // console.log(result);
      db.dropCollection('tasks', function(){
        var taskCollection = db.collection('tasks');
        taskCollection.insertMany([
          {text:"clean computers", done:true, empid:result.insertedIds[0], recurring:false},
          {text:"email frank", done:false, empid:result.insertedIds[0], recurring:false},
          {text:"make invoice", done:false, empid:result.insertedIds[0], recurring:false},
          {text:"clean toilet", done:false, empid:result.insertedIds[1], recurring:false},
          {text:"take out trash", done:false, empid:result.insertedIds[1], recurring:true},
          {text:"mop floors", done:false, empid:result.insertedIds[1], recurring:true},
          {text:"Fire Dilbert", done:false, empid:result.insertedIds[2], recurring:true},
          {text:"Cackle", done:true, empid:result.insertedIds[2], recurring:true},
          {text:"Yell at Wally", done:false, empid:result.insertedIds[2], recurring:true}
        ], function(err, result){
          db.close();
        })
      })
    })
  })
})
