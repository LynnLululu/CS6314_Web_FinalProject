var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var msc = require('../modules/m_shopcart');
var mo = require('../modules/m_order');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have shopcart");
        }
		res.status(400).redirect('/products');
	} else {
		let asyncFunc = async (user) => {
			let customerID = user["customerID"];
			let results = {
				"user" : user,
				"bfavorite": req.session.bfavorite,
    			"carousel": req.session.carousel,
			};
			let p1 = await msc.getCart(results, "cart", customerID);
			let p2 = await mp.addCategories(results, "cart");
			let cart = results["cart"];
			let dob = user["details"]["dateOfBirth"];
			let p3 = await msc.getTotal(results, "summary", cart, dob);
			return Promise.resolve(results);
		}
		asyncFunc(user).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Show shopcart. 'shopcart':");
	            g.selectedPrint(results);
	        }
	        res.status(200).render('shopcart', results);
		})
	}
});

router.post('/add', function(req, res) {
	let pid = req.body.productID;
	let num = req.body.num;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(pid)) || isNaN(Number(num)) || num <= 0) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post shopcart/add");
        }
        res.status(400).send("Unvalid input in post shopcart/add");
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have shopcart");
        }
        res.status(400).send("Only customers have shopcart");
	} else {
		let asyncFunc = async (user, pid, num) => {
			let results = {}
			let cid = user["customerID"];
			let p1 = await msc.getCartNum(results, "cartNum", cid, pid);
			let total = Number(results["cartNum"]) + Number(num);
			let p2 = await msc.updateInCart(results, "state", cid, pid, total);
			results["total"] = total;
			let p3 = await msc.updateCartTable(results, "state2");
			return Promise.resolve(results);
		}
		asyncFunc(user, pid, num).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Add " + num + " product " + pid + "s to shopcart.");
	            g.selectedPrint(results);
	        }
	        res.status(200).send("Add " + num + " product " + pid + "s to shopcart."); 
		})
	}
});

router.post('/update', function(req, res) {
	let pid = req.body.productID;
	let num = req.body.num;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(pid)) || isNaN(Number(num))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post shopcart/update");
        }
        res.status(400).send("Unvalid input in post shopcart/update");
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have shopcart");
        }
        res.status(400).send("Only customers have shopcart");
	} else {
		let asyncFunc = async (user, pid, num) => {
			let results = {}
			let cid = user["customerID"];
			if (num > 0) {
				let p1 = await msc.updateInCart(results, "state", cid, pid, num);
			} else {
				let p2 = await msc.removeFromCart(results, "state2", cid, pid);
			}
			let p3 = await msc.updateCartTable(results, "state3");
			return Promise.resolve(results);
		}
		asyncFunc(user, pid, num).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Update product " + pid + "s' number in shopcart to " + num + ".");
	            g.selectedPrint(results);
	        }
	        res.status(200).redirect('/shopcart');
		})
	}
});

router.post('/remove', function(req, res) {
	let pid = req.body.productID;
	let user = mu.resolveUser(req.session.user);
	if (isNaN(Number(pid))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post shopcart/remove");
        }
        res.status(400).send("Unvalid input in post shopcart/remove");        res.send(false);
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have shopcart");
        }
        res.status(400).send("Only customers have shopcart");
	} else {
		let asyncFunc = async (user, pid) => {
			let results = {}
			let cid = user["customerID"];
			let p1 = await msc.removeFromCart(results, "state", cid, pid);
			let p2 = await msc.updateCartTable(results, "state2");
			return Promise.resolve(results);
		}
		asyncFunc(user, pid).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Remove product " + pid + " from shopcart.");
	            g.selectedPrint(results);
	        }
	        res.status(200).redirect('/shopcart');
		})
	}
});

router.get('/checkout', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers can checkout");
        }
		res.status(400).redirect('/shopcart');
	} else {
		let asyncFunc = async (user) => {
			let customerID = user["customerID"];
			let results = {
				"user" : user,
				"bfavorite": req.session.bfavorite,
    			"carousel": req.session.carousel,
			};
			let p1 = await msc.getCart(results, "cart", customerID);
			let p2 = await mp.addCategories(results, "cart");
			let cart = results["cart"];
			let checkout = {};
			Object.keys(cart).forEach(function(productID) {
		        checkout[productID] = cart[productID];
		        if (cart["cartNum"] > cart["storeNum"]) {
		            checkout[productID]["cartNum"] = cart[productID]["storeNum"];
		        }
		    })
		    results["checkout"] = checkout;
		    let dob = user["details"]["dateOfBirth"];
		    let p3 = await msc.getTotal(results, "summary", checkout, dob);
			return Promise.resolve(results);
		}
		asyncFunc(user).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Checkout from cart. 'shopcart':");
	            g.selectedPrint(results);
	        }
	        res.status(200).render('shopcart', results);
		})
	}
});

router.post('/checkout/pay', function(req, res) {
	let purchase = req.body.purchase;
	let totalPrice = req.body.totalPrice;
	let user = mu.resolveUser(req.session.user);
	if (!purchase || isNaN(Number(totalPrice))) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post shopcart/checkout/pay");
        }
        res.status(400).send("Unvalid input in post shopcart/checkout/pay");
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers can checkout");
        }
        res.status(400).send("Only customers can checkout");
	} else {
		let asyncFunc = async (user, purchase, totalPrice) => {
			let results = {};
			let cid = user["customerID"];
			let p1 = await mp.sellProducts(results, "sell", purchase);
			let p2 = await mo.getNextOrderID(results, "newID");
			let newID = results["newID"];
			let p3 = await mo.newOrder(results, "state", newID, cid, totalPrice, purchase);
			let p4 = await msc.deleteCart(results, "state2", cid);
			return Promise.resolve(results);
		}
		asyncFunc(user, purchase, totalPrice).then(results => {
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Payment success. Have a nice day!");
	            g.selectedPrint(results);
	        }
	        res.status(200).redirect('/products');
		})
	}
});

module.exports = router;
