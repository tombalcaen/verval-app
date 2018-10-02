var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = mongodb.ObjectID;
var db;
var uri = 'mongodb+srv://tombalcaen:updvrf5n@cluster0-maywt.gcp.mongodb.net/test?retryWrites=true';

var app = express();

//enable cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());

mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
    db = client.db("db1");
    console.log("Database connection ready");

    var server = app.listen(process.env.PORT || 3000,()=>{
        console.log("App now running on port", server.address().port);
    })

   //client.close();
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get('/inventory',(req,res)=>{
    db.collection('inventory').find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
})

app.get('/inventory/:search',(req,res)=>{
    console.log(req.params.search)
    db.collection('inventory').find({"name" : req.params.search}, (err, result)=>{
        if(err){
            handleError(res, err.message, "failed to get item.")
        } else {
            res.status(200).json(result);
        }
    })
})

app.post('/inventory',(req,res)=>{
    var newInvItem = req.body;
    newInvItem.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection("inventory").insertOne(newInvItem, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new inventory item.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
        });
    }
})

app.delete("/inventory/:id", function(req, res) {
    console.log(req.params)
    db.collection('inventory').deleteOne({"_id": new objectId(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });

