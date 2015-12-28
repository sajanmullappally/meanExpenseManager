var express = require('express');
var router = express.Router();

var Account = require('../models/account.js');

// router.get('/', function(req, res) {
//     res.json({ message: 'Express Router' });   
// });

router.route('/new-account')
.post(function(req, res) {
	var account = new Account();
	account.accountName = req.body.name;
	account.branch = req.body.branch;
	account.accountNumber = req.body.number;
	account.ifscCode = req.body.ifsc;
	account.accountBalance = req.body.balance;
	account.save(function(err, docs) {
		if (err)
			res.send(err);

		res.json(docs);
	});
});

router.route('/accounts')
.get(function(req, res) {
    Account.find(function(err, accounts) {
        if (err)
            res.send(err);

        res.json(accounts);
    });
});

router.route('/accounts/:id')
.get(function(req, res) {
    Account.findById(req.params.id, function(err, accounts) {
        if (err)
            res.send(err);
        res.json(accounts);
    });
});

router.route('/accounts/delete/:id')
.delete(function(req, res) {
    Account.remove({_id: req.params.id}, function(err, accounts) {
        if (err)
            res.send(err);
        res.json(accounts);
        console.log(req.params.id + "deleted");
    });
});

module.exports = router;