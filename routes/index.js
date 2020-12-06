var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var mf = require('../modules/m_favorite');
var mo = require('../modules/m_order');

// root
router.get('/', function(req, res) {
	res.status(200).redirect('/products');
});

// show all products
router.get('/products', function(req, res) {
	let searchCategories = req.query.searchCategories;
	let searchText = req.query.searchText;
	if (searchCategories === undefined) {
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
		results["lastCategories"] = searchCategories;
		results["lastSearchText"] = searchText;
		if (searchText === undefined) {
			results["lastSearchText"] = "";
		}
		let p5 = await mp.generateFilterString(results, "lastFilterString", searchCategories, searchKeywords, searchText);
		let categories = results["categories"];
		let p7 = await mo.findHotProducts(results, "hot");
		let hot = results["hot"];
		let p8 = await mp.selectCarousel(results, "carousel", products, categories, hot);
		return Promise.resolve(results);
	}
	asyncFunc(user, searchCategories, searchText).then(results => {
        // update carousel in session
		req.session.carousel = results["carousel"];
		if (!req.session.hasOwnProperty("bfavorite")) {
	    		req.session.bfavorite = {};
	    	}
		req.session.save();
        let dataframe = {
        	"user": user,
        	"bfavorite": req.session.bfavorite,
        	"carousel": req.session.carousel,
        	"selected": results["selected"],
        	"categories": results["categories"],
        	"products": results["products"],
        	"lastCategories": results["lastCategories"],
        	"lastSearchText": results["lastSearchText"],
        	"lastFilterString": results["lastFilterString"],
        	"lastSearchText": results["lastSearchText"],
        }
        if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show products. 'index':");
            g.selectedPrint(dataframe);
        }
        if (g.logLevel <= g.Level.DEVELOPING) {
            g.selectedPrint(results);
        }
        res.status(200).render('index', dataframe); 
	})
});

// new product
router.get('/products/new', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "admin") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only admins can new product");
        }
		res.status(400).redirect('/products');
	} else {
		let asyncFunc = async (user) => {
			let results = {
				"user" : user,
				"bfavorite": req.session.bfavorite,
				"carousel": req.session.carousel,
			};
			let p1 = await mp.getCategories(results, "categories");
			return Promise.resolve(results);
		}
		asyncFunc(user).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Edit a new product. 'new':");
	        }
			res.status(200).render('new', results); 
		})
	}
});

/*
// add product
router.post('/products/new/add', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "admin") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only admins can new product");
        }
        res.status(400).send("Only admins can new product");
	} else {
		let asyncFunc = async (productID) => {
			let product = {
				"productID": undefined,
				"productName": req.body.productName,
				"categories": req.body.categories,
				"productPrice": req.body.productPrice,
				"description": req.body.description,
				"image": req.body.image,
				"visible": req.body.visible,
				"storeNum": req.body.storeNum
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
	        res.status(200).redirect('/products/' + results["productID"]); 
		})
	}
});
*/

router.post('/products/new/add', upload.array('photo', 12), function(req, res) {
	let productName = req.body.productName;
	let description = req.body.description;
	let productPrice = req.body.productPrice;
	let storeNum = req.body.storeNum;
	let categories = req.body.categories;
	let user = mu.resolveUser(req.session.user);
	let img = req.files;
	console.log(categories);
	console.log(img);

	let upload = multer
	
	res.send(0);
});

// show one product
router.get('/products/:id', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in get products/:id");
            g.selectedPrint(results);
        }
        res.status(400).redirect('/products');
	} else {
		let asyncFunc = async (user, productID) => {
			let results = {
				"user" : user,
				"bfavorite": req.session.bfavorite,
    			"carousel": req.session.carousel,
			};
			let p1 = await mp.getProducts(results, "products");
			let p2 = await mp.addCategories(results, "products");
			let p3 = await mp.getCategories(results, "categories");
			if (results["products"].hasOwnProperty(productID)) {  // if id not found
				results["product"] = results["products"][productID];
			} else {
				results["product"] = mp.EMPTYPRODUCT;
			}
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
	        res.status(200).render('show', results); 
		})
	}
});

// show one product
router.get('/products/:id/edit', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in get products/:id/edit");
        }
        res.status(400).redirect('/products/' + results["productID"]); 
	} else if (user["category"] != "admin") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only admins can edit product");
        }
		res.status(400).redirect('/products/' + results["productID"]); 
	} else {
		let asyncFunc = async (user, productID) => {
			let results = {
				"user" : user,
				"bfavorite": req.session.bfavorite,
    			"carousel": req.session.carousel,
			};
			let p1 = await mp.getProducts(results, "products");
			let p2 = await mp.addCategories(results, "products");
			let p3 = await mp.getCategories(results, "categories");
			results["product"] = results["products"][productID];
			results["user"] = user;
			results["lastCategories"] = [];
			results["lastSearchText"] = "";
			results["lastFilterString"] = "";
			return Promise.resolve(results);
		}
		asyncFunc(user, productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Edit a product. 'edit':");
	            g.selectedPrint(results);
	        }
	        res.status(200).render('edit', results); 
		})
	}
});

// update one product
router.post('/products/:id/edit/update', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	let product = {
		"productName": req.body.productName,
		"categories": req.body.categories,
		"productPrice": req.body.productPrice,
		"description": req.body.description,
		"image": req.body.image,
		"visible": req.body.visible
	};
	if (isNaN(Number(productID))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post products/:id/edit/update");
        }
        res.status(400).send("Unvalid input in post products/:id/edit/update");
	} else if (user["category"] != "admin") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only admins can edit product");
        }
        res.status(400).send("Only admins can edit product");
	} else {
		let asyncFunc = async (productID, product) => {
			let results = { "product" : product};
			let p1 = await mp.getCategories(results, "categories");
			let image = product["image"];
			let p2 = await mp.updateImage(results, "state", image);
			if (!results["state"]) {
				return Promise.reject("relaxCategories");
			}
			let p3 = await mp.updateProduct(results, "state", productID, product);
			if (!results["state"]) {
				return Promise.reject("updateProduct");
			}
			let categories = results["categories"];
			let p4 = await mp.relaxCategories(results, "state", productID, product, categories);
			if (!results["state"]) {
				return Promise.reject("relaxCategories");
			} else {
				return Promise.resolve(results);
			}
		}
		asyncFunc(productID, product).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update a product:");
	            g.selectedPrint(results);
	        }
	        res.status(200).redirect('/products/' + results["productID"]);
	    }, (func) => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update a product fail in " + func);
	        }
	        res.status(400).redirect('/products');
		});
	}
});

// remove one product (soft delete)
router.post('/products/:id/edit/remove', function(req, res) {
	let productID = req.params.id;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(productID))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post products/:id/edit/remove");
        }
        res.status(400).send("Unvalid input in post products/:id/edit/remove");
	} else if (user["category"] != "admin") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only admins can edit product");
        }
        res.status(400).send("Only admins can edit product");
	} else {
		let asyncFunc = async (productID) => {
			let results = {};
			let p1 = await mp.deleteProduct(results, "state", productID);
			if (!results["state"]) {
				return Promise.reject("deleteProduct");
			} else {
				return Promise.resolve(results);
			}
		}
		asyncFunc(productID).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update a product:");
	            g.selectedPrint(results);
	        }
	        res.status(200).redirect('/products');
	    }, (func) => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update a product fail in " + func);
	        }
	        res.status(400).redirect('/products');
		});
	}
});

module.exports = router;
