var express = require('express');
var router = express.Router();

var Expense = require('../models/expense.js');

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

		console.log(req.body);
		res.json(docs);
	});
});

// Get All Expenses
router.route('/expenses')
.get(function(req, res) {
    Expense.find(function(err, expenses) {
        if (err)
            res.send(err);

        res.json(expenses);
    });
});

module.exports = router;