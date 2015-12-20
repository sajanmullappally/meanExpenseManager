var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema ({
	accountName: String,
	branch: String,
	accountNumber: Number,
	ifscCode: String,
	accountBalance: Number
});

module.exports = mongoose.model('account', accountSchema);