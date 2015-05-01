var mongoose = require('mongoose');

var blueSchema = mongoose.Schema({
	userId : String,
	lang : String,
	code : String,
	prog: String, 
	timeStamp: String
});

module.exports = mongoose.model('Blue', blueSchema);