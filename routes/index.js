var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

router.get('/', function(req, res) {
	var promises = [g.getProducts, g.getCatagories];
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('index', { "products" : results[0], "catagories" : results[1]});
	});
});


router.get('/products', function(req, res) {
	var collection = db.get('Products');
	collection.find({}, function(err, products){
		if (err) throw err;
	  	res.json(products);
	});
});


router.get('products/:id', function(req, res) {
	var collection = db.get('Products');
	collection.findOne({ _id: req.params.id }, function(err, product){
		if (err) throw err;
	  	res.render('show', {product : product});
	});
});


module.exports = router;
