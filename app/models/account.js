var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema ({
	name: String,
	branch: String,
	number: Number,
	ifsc: String,
	balance: Number
});

module.exports = mongoose.model('account', accountSchema);