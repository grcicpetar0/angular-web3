var mongoall = require('mongodb');
var mongo = mongoall.MongoClient;
var o_id = mongoall.ObjectID;


var url = 'mongodb://localhost:27017/EmpTodos';

  mongo.connect(url, function(err, db) {
    if(err) callback(err);

    var collection = db.collection('history');

    collection.find({}).toArray(function(err, result){
      db.close();
      console.log(JSON.stringify(result, null, 2));
    });
  });
