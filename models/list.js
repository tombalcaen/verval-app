const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const listSchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},    
});

const List = module.exports = mongoose.model('list', listSchema);

module.exports.getList = function(uid,callback){
    List.find({uid: uid},callback)
}

module.exports.addList = function(list,callback){    
    list.save(callback);
}

module.exports.deleteList = function(list,callback){ 
    list.deleteMany({_id: { $in: list}},callback);
}