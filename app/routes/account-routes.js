var express = require('express');
var router = express.Router();

var Account = require('../models/account.js');

// router.get('/', function(req, res) {
//     res.json({ message: 'Express Router' });   
// });

router.route('/new-account')
.post(function(req, res) {
	var account = new Account();
	account.name = req.body.name;
	account.branch = req.body.branch;
	account.number = req.body.number;
	account.ifsc = req.body.ifsc;
	account.balance = req.body.balance;
	account.save(function(err, docs) {
		if (err)
			res.send(err);

		res.json(docs);
	});
});

// Get All Accounts
router.route('/accounts')
.get(function(req, res) {
    Account.find(function(err, accounts) {
        if (err)
            res.send(err);

        res.json(accounts);
    });
});

// Get Specific Account by ID
router.route('/accounts/:id')
.get(function(req, res) {
    Account.findById(req.params.id, function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
});

// Update Specific Account by ID
router.route('/accounts/:id')
.put(function(req, res) {
        console.log(req.params.id + " updated");
        var update = { 
            name: req.body.name,
            branch: req.body.branch,
            number: req.body.number,
            ifsc: req.body.ifsc,
            balance: req.body.balance
        };

        Account.findByIdAndUpdate(req.params.id, update, function(err, account) {
            if(err) {
                return res.send(err);
            }

            res.json(account);
        });
});

// Delete Account
router.route('/accounts/:id')
.delete(function(req, res) {
    Account.remove({_id: req.params.id}, function(err, accounts) {
        if (err)
            res.send(err);
        res.json(accounts);
        console.log(req.params.id + " deleted");
    });
});

module.exports = router;