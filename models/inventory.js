const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const inventorySchema = mongoose.Schema({
    uid: {type: String},
    listId: {type: String},
    name: {type: String, required: true},
    amount: {type: Number},
    expiration_date: {type: Date}
});

const Inventory = module.exports = mongoose.model('inventory', inventorySchema);

module.exports.getInventory = function(listId,callback){    
    Inventory.find({listId: listId},callback)
}

module.exports.addItem = function(item,callback){    
    console.log(item)
    item.save(callback);
}

module.exports.deleteItem = function(items,callback){ 
    Inventory.deleteMany({_id: { $in: items}},callback);
}