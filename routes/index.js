var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var mo = require('../modules/m_order');

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
	let user = mu.resolveUser(req.session.user);
	let asyncFunc = async (user, searchCategories, searchText) => {
		let results = {}
		let p1 = await mp.getProducts(results, "products");
		let p2 = await mp.addCategories(results, "products");
		let products = results["products"];
		let p3 = await mp.selectProducts(results, "selected", products, searchCategories, searchKeywords);
		let p4 = await mp.getCategories(results, "categories");
		results["user"] = user;
		results["lastCategories"] = searchCategories;
		results["lastSearchText"] = searchText;
		if (searchText === undefined) {
			results["lastSearchText"] = "";
		}
		let p5 = await mp.generateFilterString(results, "lastFilterString", searchCategories, searchKeywords, searchText);
		let p6 = await mp.getCategories(results, "categories");
		let categories = results["categories"];
		let p7 = await mo.findHotProducts(results, "hot");
		let hot = results["hot"];
		let p8 = await mp.selectCarousel(results, "carousel", products, categories, hot);
		return Promise.resolve(results);
	}
	asyncFunc(user, searchCategories, searchText).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show products. 'index':");
            g.selectedPrint(results);
        }
        res.render('index', results); 
	})
});

// show one product
router.get('/products/:id', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else {
		let asyncFunc = async (user, productID) => {
			let results = {}
			let p1 = await mp.getProducts(results, "products");
			let p2 = await mp.addCategories(results, "products");
			let p3 = await mp.getCategories(results, "categories");
			if (results["products"].hasOwnProperty(productID)) {  // if id not found
				results["product"] = results["products"][productID];
			} else {
				results["product"] = mp.EMPTYPRODUCT;
			}
			results["product"]["productID"] = productID;  // reorganize for convenient
			results["user"] = user;
			results["lastCategories"] = [];
			results["lastSearchText"] = "";
			results["lastFilterString"] = "";
			return Promise.resolve(results);
		}
		asyncFunc(user, productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Show a product. 'show':");
	            g.selectedPrint(results);
	        }
	        res.render('show', results); 
		})
	}
});

// show one product
router.get('/products/:id/edit', function(req, res) {
	let productID = req.params.id
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else {
		let asyncFunc = async (user, productID) => {
			let results = {}
			let p1 = await mp.getProducts(results, "products");
			let p2 = await mp.addCategories(results, "products");
			let p3 = await mp.getCategories(results, "categories");
			results["product"] = results["product"][productID];
			results["product"]["productID"] = productID;
			results["user"] = user;
			results["lastCategories"] = [];
			results["lastSearchText"] = "";
			results["lastFilterString"] = "";
			return Promise.resolve(results);
		}
		asyncFunc(user, productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Edit a product. 'tbd':");
	            g.selectedPrint(results);
	        }
	        res.render('tbd', results); 
		})
	}
});

// update one product
router.post('/products/:id/edit/update', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else if (user["category"] != "admin") {
		res.send("Unvalid user: " + user["category"] + user["email"]);
	} else {
		let asyncFunc = async (productID) => {
			let results = {};
			let p1 = await mp.getCategories(results, "categories");
			let product = {
				"productName": req.body.productName,
				"categories": req.body.categories,
				"productPrice": req.body.productPrice,
				"description": req.body.description,
				"image": req.body.image,
				"visible": req.body.visible
			}
			let p2 = await mp.updateImage(product["image"]);
			let p3 = await mp.updateProduct(productID, product);
			let p4 = await mp.relaxCategories(productID, product, results["categories"]);
			return Promise.resolve(product);
		}
		asyncFunc(productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update a product.:");
	            g.selectedPrint(results);
	        }
	        res.redirect('/products/' + results["productID"]); 
		})
	}
});

// remove one product (soft delete)
router.post('/products/:id/edit/remove', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else if (user["category"] != "admin") {
		res.send("Unvalid user: " + user["category"] + user["email"]);
	} else {
		let asyncFunc = async (productID) => {
			let p1 = await mp.deleteProduct(productID);
			return Promise.resolve(product);
		}
		asyncFunc(productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Soft-Delete a product.:");
	        }
	        res.redirect('/'); 
		})
	}
});

// new product
router.get('/products/new', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "admin") {
		res.send("Unvalid user: " + user["category"] + user["email"]);
	} else {
		if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Edit a new product. 'tbd':");
	        }
		res.render('tbd', results); 
	}
});

// add product
router.post('/products/new/add', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "admin") {
		res.send("Unvalid user: " + user["category"] + user["email"]);
	} else {
		let asyncFunc = async (productID) => {
			let product = {
				"productID": undefined,
				"productName": req.body.productName,
				"categories": req.body.categories,
				"productPrice": req.body.productPrice,
				"description": req.body.description,
				"image": req.body.image,
				"visible": req.body.visible
			}
			let p1 = await mp.getNextProductID(results, "product");
			let p2 = await mp.updateImage(product["image"]);
			let p3 = await mp.updateProduct(product);
			let p4 = await mp.updateCategories(product["categories"]);
			return Promise.resolve(results);
		}
		asyncFunc(productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Add a new product.:");
	            g.selectedPrint(results);
	        }
	        res.redirect('/products/' + results["productID"]); 
		})
	}
});

module.exports = router;
