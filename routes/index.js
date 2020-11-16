var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

router.get('/', function(req, res) {
	res.redirect('/products');
});


router.get('/products', function(req, res) {
	let promises = [];
	promises.push(g.getProducts("select * from PRODUCT"));
	promises.push(g.getCategories("select * from CATEGORY"));
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('index', { "products" : results[0], "categories" : results[1] });
	});
});

router.get('/products/:id', function(req, res) {
	let promises = [];
	let _id = req.params.id
	promises.push(g.getProducts("select * from PRODUCT where ProductID=" + _id));
	promises.push(g.getCategories("select * from CATEGORY NATURAL JOIN PRODUCT_OWN_CATEGORY where ProductID=" + _id));	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('show', { "product" : results[0][0], "categories" : results[1] });
	});
});

router.get('/favorite', function(req, res) {
	let promises = [];
	promises.push(g.getProducts("select * from PRODUCT"));
	promises.push(g.getCategories("select * from CATEGORY"));
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('favorite', { "products" : results[0], "categories" : results[1] });
	});
});

router.get('/shopcart', function(req, res) {
	let promises = [];
	promises.push(g.getProducts("select * from PRODUCT"));
	promises.push(g.getCategories("select * from CATEGORY"));
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('shopcart', { "products" : results[0], "categories" : results[1] });
	});
});


module.exports = router;
