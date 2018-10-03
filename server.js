var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require("path");
var objectId = mongodb.ObjectID;
var db;
var uri = 'mongodb+srv://tombalcaen:updvrf5n@cluster0-maywt.gcp.mongodb.net/db1?retryWrites=true';

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

// Create link to Angular build directory

//var distDir = path.join(__dirname + '/dist/')
var distDir = __dirname + "/dist/verval-app/";
app.use(express.static(distDir));

mongodb.MongoClient.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true }, function (err, client) {
    db = client.db("db1");
    console.log("Database connection ready");

    var server = app.listen(process.env.PORT || 3000,()=>{
        console.log("App now running on port", server.address().port);
        console.log(__dirname)
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
});

app.get('/inventory/expired',(req,res)=>{   
    console.log(req.params) 
    db.collection('inventory').find({"expiration_date": {$lt : new Date()}}).toArray(function(err, docs) {        
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
});

app.get('/inventory/:id',(req,res)=>{    
    db.collection('inventory').find({"_id" : new objectId(req.params.id)}, (err, result)=>{
        if(err){
            handleError(res, err.message, "failed to get item.")
        } else {
            res.status(200).json(result);
        }
    })
})

app.post('/inventory',(req,res)=>{
    var newInvItem = req.body;
    newInvItem.expiration_date = new Date(newInvItem.expiration_date);
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
    var test = req.params.id.split(",").map((data)=>{
        return new objectId(data)            
    })

    db.collection('inventory').remove({"_id": { $in: test}}, function(err, result) {            
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(200).json(req.params.id);
        }
    });          

    /*db.collection('inventory').deleteOne({"_id": new objectId(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    });*/
  });

