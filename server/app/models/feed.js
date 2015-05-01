var mongoose = require('mongoose');

var feedSchema = mongoose.Schema({
	data : String,
	timeStamp: String
});

module.exports = mongoose.model('Feed', feedSchema);