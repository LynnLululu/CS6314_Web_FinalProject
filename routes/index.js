var express = require('express');
var router = express.Router();

let db = require('../modules/database');

router.get('/', function(req, res) {
	var products = new Promise((resolve, reject) => {
	    let sql = "select * from PRODUCT";
	    let array = [];
	    db.query(sql, (err, rows) => {
	        if (err) {
	            throw err;
	        }
	        else {
	        	console.log("Products:");
	            for (let elem of rows) {
	                let tmp = {};
	                tmp["productID"] = elem['ProductID'];
	                tmp["productName"] = elem['Name'];
	                console.log(elem['Name']);
	                tmp["productPrice"] = elem['Price'];
	                tmp["description"] = elem['Description'];
	                tmp["image"] = elem['Image'];
	                tmp["num"] = elem['Num'];
	                if (elem['Visible'] == 0) {
	                    tmp["visible"] = false;
	                } else {
	                    tmp["visible"] = true;
	                }
	                array.push(tmp);
	            }
	            resolve(array);
	        };
	    });
	});
	var catagories = new Promise((resolve, reject) => {
	    let sql = "select * from CATAGORY";
	    let array = [];
	    db.query(sql, (err, rows) => {
	        if (err) {
	            throw err;
	        }
	        else {
	        	console.log("Catagories:");
	            for (let elem of rows) {
	                let tmp = {};
	                tmp["catagoryID"] = elem['CatagoryID'];
	                tmp["catagoryName"] = elem['Name'];
	                console.log(elem['Name']);
	                array.push(tmp);
	            }
	            resolve(array);
	        };
	    });
	});
	var promises = [products, catagories];
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		res.render('index', { "products" : results[0], "catagories" : results[1]})
	}).catch(err => console.log(err));
    console.log("show_product.js.");
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

// show product
  

module.exports = router;
