var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// signed
router.get('/issigned', function(req, res) {
	if (req.session.user) {
		let user = req.session.user;
	} else {
		;
	}
});

// sign in
router.post('/signin', function(req, res) {
	let promises = [];
	let email = req.query.email;
	let password = req.query.password;
	promises.push(g.getCustomers("select * from CUSTOMER where Email=" + email + " AND Password=" + password));
	promises.push(g.getAdmins("select * from ADMIN where Email=" + email + " AND Password=" + password));
	Promise.all(promises).then(function(results) {
		let customers = results[0];
		let admins = results[1];
		if (customers.length > 0) {
			;
		} else if (admins.length > 0) {
			;
		} else {
			;
		}
		res.render('show', { "product" : results[0][0], "categories" : results[1] });
	});
});

module.exports = router;
