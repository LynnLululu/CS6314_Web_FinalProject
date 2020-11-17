var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

// root
router.get('/', function(req, res) {
	res.redirect('/products');
});

// show all products
router.get('/products', function(req, res) {
	let promises = [];
	promises.push(g.getProducts("select * from PRODUCT"));
	promises.push(g.getCategories("select * from CATEGORY"));
	promises.push(g.getAccountJSON());
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show all products. index:");
            let titles = ["products", "categories", "accounts"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
            g.selectedPrint("Current user", req.session.user);
        }
		res.render('index', {
			"products": results[0],
			"categories": results[1],
			"accounts": results[2],
			"user": req.session.user
		});  // promises and results are paired
	});
});

router.post('/products/signin', function(req, res) {
	req.session.user = g.sessionForSignIn(req.body.emailx, req.body.pwdx);
	res.redirect('/products');
});

router.post('/products/signup', function(req, res) {
	req.session.user = g.sessionForSignUp(req.body.userName, req.body.email, req.body.pwd);
	res.redirect('/products');
});

router.post('/products/signout', function(req, res) {
	req.session.user = undefined;
	res.redirect('/products');
});

// show one product
router.get('/products/:id', function(req, res) {
	let promises = [];
	let _id = req.params.id
	promises.push(g.getProducts("select * from PRODUCT where ProductID=" + _id));
	promises.push(g.getCategories("select * from CATEGORY NATURAL JOIN PRODUCT_OWN_CATEGORY where ProductID=" + _id));
	promises.push(g.getAccountJSON());
	Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show one product. show:");
            let titles = ["product", "categories", "accounts"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
            g.selectedPrint("Current user", req.session.user);
        }
		res.render('show', {
			"product" : results[0][0],
			"categories" : results[1],
			"accounts" : results[2],
			"user": req.session.user
		});
	});
});


module.exports = router;
