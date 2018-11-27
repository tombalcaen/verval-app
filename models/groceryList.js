const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

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
    Inventory.deleteMany({_id: { $in: list}},callback);
}