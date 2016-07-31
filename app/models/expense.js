var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema ({
	account: {type: Schema.Types.ObjectId, ref: 'account'},
	date: String,
	type: String,
	title: String,
	amount: Number,
	old_balance: Number,
	new_balance: Number
});

module.exports = mongoose.model('expense', expenseSchema);