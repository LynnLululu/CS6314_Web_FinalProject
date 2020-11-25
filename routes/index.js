var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mp = require('../modules/m_products');
var mu = require('../modules/m_user');

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
		let p1 = await mp.getProducts(results, "products");
		let p2 = await mp.addCategories(results, "products");
		let p3 = await mp.selectProducts(results, "products", searchCategories, searchKeywords);
		let p4 = await mp.getCategories(results, "categories");
		results["user"] = mu.resolveUser(req.session.user);
		results["lastCategories"] = searchCategories;
		results["lastSearchText"] = searchText;
		if (searchText === undefined) {
			results["lastSearchText"] = "";
		}
		let p5 = await mp.generateFilterString(results, "lastFilterString", searchCategories, searchKeywords, searchText);
		return Promise.resolve(results);
	}
	asyncFunc(searchCategories, searchText).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show products. 'index':");
            g.selectedPrint(results);
        }
        res.render('index', results); 
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
			let p1 = await mp.getProducts(results, "product");
			let p2 = await mp.addCategories(results, "product");
			let p3 = await mp.getCategories(results, "categories");
			results["product"] = results["product"][productID];
			results["product"]["productID"] = productID;  // reorganize for convenient
			results["user"] = mu.resolveUser(req.session.user);
			results["lastCategories"] = [];
			results["lastSearchText"] = "";
			results["lastFilterString"] = "";
			return Promise.resolve(results);
		}
		asyncFunc(productID).then(results => {
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
	if (isNaN(Number(productID))) {  // unvalid productID
		res.send("Unvalid productID: " + productID);
	} else {
		let asyncFunc = async (productID) => {
			let results = {}
			let p1 = await mp.getProducts(results, "product");
			let p2 = await mp.addCategories(results, "product");
			let p3 = await mp.getCategories(results, "categories");
			results["product"] = results["product"][productID];
			results["product"]["productID"] = productID;
			results["user"] = mu.resolveUser(req.session.user);
			results["lastCategories"] = [];
			results["lastSearchText"] = "";
			results["lastFilterString"] = "";
			return Promise.resolve(results);
		}
		asyncFunc(productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Edit a product. 'form':");
	            g.selectedPrint(results);
	        }
	        res.render('form', results); 
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
			let product = {
				"productID": req.body.productID,
				"productName": req.body.productName,
				"categories": req.body.categories,
				"productPrice": req.body.productPrice,
				"description": req.body.description,
				"image": req.body.num,
				"visible": req.body.visible
			}
			let p1 = await mp.updateImage(product["image"]);
			let p2 = await mp.updateProduct(product);
			let p3 = await mp.updateCategories(product["categories"]);
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
	            console.log("Edit a new product. 'form':");
	            g.selectedPrint(results);
	        }
		res.render('form', results); 
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
				"image": req.body.num,
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
