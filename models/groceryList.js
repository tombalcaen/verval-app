const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const favorite = require('../models/favorite');

const groceryListSchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},    
});

const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);

module.exports.getList = function(uid,callback){    
    GroceryList.find({uid: uid},callback)
}

module.exports.addList = function(list,callback){    
    list.save(callback);
}

module.exports.deleteList = function(list,callback){ 
    list.deleteMany({_id: { $in: list}},callback);
}

module.exports.deleteAllForUid = function(uid,callback){
    GroceryList.deleteMany({uid: uid},callback)
}

module.exports.generateBasket = function(uid,callback){
    this.deleteAllForUid(uid,(err,res)=>{
        if(err) {
            console.log("errrrrrr")
            console.log(err)
            callback({success: false, message:"failed to generate basket. (delete old)"})
        }
        favorite.getFavorite(uid,(err, items)=>{
            if(err){
                console.log("getfavorites error;")
                console.log(err)
                callback({success: false, message: "failed to generate basket. (get favorites)"})
            } else {                
                callback(items.map((data)=>{
                    let newList = new GroceryList({
                        uid: data.uid,
                        name: data.name,
                    });
                    
                    this.addList(newList,(a,b)=>{
                        console.log(a)
                        console.log(b)
                    })
                }))
            }
        });
    })
}