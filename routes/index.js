var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

// root
router.get('/', function(req, res) {
	res.redirect('/products');
});

// show all products
router.get('/products', function(req, res) {
	let searchCategories = req.query.searchCategories;
	let searchText = req.query.searchText;
	if (searchCategories === undefined || searchCategories === []) {
		searchCategories = [];
	} else if (!Array.isArray(searchCategories)) {
		searchCategories = [searchCategories];
	}
	let searchKeywords = [];
	if (searchText !== undefined && searchText !== "") {
		searchKeywords = searchText.trim().toLowerCase().split(' ');
	}
	let asyncFunc = async (searchCategories, searchText) => {
		let results = {}
		let p1 = await g.getProducts(results, "products");
		let p2 = await g.addCategories(results, "products");
		let p3 = await g.selectProducts(results, "products", searchCategories, searchKeywords);
		let p4 = await g.getCategories(results, "categories");
		results["user"] = g.resolveUser(req.session.user);
		results["lastCategories"] = searchCategories;
		results["lastSearchText"] = searchText;
		let p5 = await g.generateFilterString(results, "lastFilterString", searchCategories, searchKeywords, searchText);
		return Promise.resolve(results);
	}
	asyncFunc(searchCategories, searchText).then(result => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show products. 'index':");
            g.selectedPrint(result);
        }
        res.render('index', result); 
	})
});

// show one product
router.get('/products/:id', function(req, res) {
	let productID = req.params.id
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else {
			let asyncFunc = async (productID) => {
			let results = {}
			let p1 = await g.getProducts(results, "product");
			let p2 = await g.addCategories(results, "product");
			let p3 = await g.getCategories(results, "categories");
			results["product"] = results["product"][productID];
			results["product"]["productID"] = productID;  // reorganize for convenient
			results["user"] = g.resolveUser(req.session.user);
			return Promise.resolve(results);
		}
		asyncFunc(productID).then(result => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Show product by ID. 'show':");
	            g.selectedPrint(result);
	        }
	        res.render('show', result); 
		})
	}
});


module.exports = router;
