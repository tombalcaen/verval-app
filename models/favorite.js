const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    uid: {type: String},
    // listId: {type: String},
    name: {type: String, required: true}
});

const Favorite = module.exports = mongoose.model('favorite', favoriteSchema);

module.exports.getFavorite = function(uid,callback){  
    console.log("get favorites in favorite: " + uid)  
    Favorite.find({uid: uid},callback)
}

module.exports.addItem = function(item,callback){    
    item.save(callback);
}

module.exports.deleteItem = function(items,callback){ 
    Favorite.deleteMany({_id: { $in: items}},callback);
}