var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/FoodProduct');

router.get('/', function(req, res) {
	var collection = db.get('Products');
	collection.find({}, function(err, products){
		if (err) throw err;
	  	res.json(products);
	});
});

router.get('/:id', function(req, res) {
	var collection = db.get('Products');
	collection.findOne({ _id: req.params.id }, function(err, product){
		if (err) throw err;
	  	res.render('show', {product : product});
	});
});


module.exports = router;