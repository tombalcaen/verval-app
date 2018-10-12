const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const inventorySchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},
    amount: {type: Number},
    expiration_date: {type: Date, required: true}
});

const Inventory = module.exports = mongoose.model('inventory', inventorySchema);

module.exports.getInventory = function(uid,callback){
    console.log(uid)
    console.log('inside models inventory')
    Inventory.find({uid: uid},callback)
}

module.exports.addItem = function(item,callback){
    console.log(item)
    item.save(callback);
}

module.exports.deleteItem = function(items,callback){
    console.log(items)
    Inventory.delete({id: { $in: items}},callback);
}