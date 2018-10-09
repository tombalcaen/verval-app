const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const inventorySchema = mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number},
    expiration_date: {type: Date, required: true}
});

const Inventory = module.exports = mongoose.model('inventory', inventorySchema);

module.exports.getInventory = function(){
    Inventory.find(callback)
}