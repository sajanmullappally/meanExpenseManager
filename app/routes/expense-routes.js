var express = require('express');
var router = express.Router();

var Expense = require('../models/expense.js');
var Account = require('../models/account.js');

router.route('/new-expense')
.post(function(req, res) {
	var expense = new Expense();
	expense.account = req.body.selectedAccount;
	expense.date = req.body.date;
	expense.type = req.body.selectedExpenseType.name;
	expense.title = req.body.title;
	expense.amount = req.body.amount;
	expense.old_balance = req.body.selectedAccount.balance;
	expense.new_balance = req.body.new_balance;
	expense.save(function(err, docs) {
		if (err)
			res.send(err);

		res.json(docs);
	});

	// Expense.findOne({ _id: req.body.selectedAccount})
	// .populate('account')
	// .exec(function (err, story) {
	// 	if (err) return handleError(err);
	// 	console.log(story.name);
	// });

	Account.findOne({ _id: req.body.selectedAccount._id }, function (err, account){
		account.balance = req.body.new_balance;
		account.save();
	});
});

// Get All Expenses
router.route('/expenses')
.get(function(req, res) {
    Expense.find(function(err, expenses) {
        if (err)
            res.send(err);

        res.json(expenses);
    })
    .populate('account', 'name');
});

// Delete Expense
router.route('/expenses/:id/:acc_id/:exp_type/:exp_old_bal/:exp_new_bal')
.delete(function(req, res) {
	console.log(req.params);
    Expense.remove({_id: req.params.id}, function(err, expenses) {
        if (err)
            res.send(err);
        res.json(expenses);
    });
});

module.exports = router;