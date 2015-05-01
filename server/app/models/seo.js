var mongoose = require('mongoose');

var seoSchema = mongoose.Schema({
	userId : String,
	url : String,
	timeStamp: String
});

module.exports = mongoose.model('Seo', seoSchema);