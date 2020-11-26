var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var msc = require('../modules/m_shopcart');
var mo = require('../modules/m_order');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user === undefined || user["category"] !== "customer") {
		res.send("Guest or admin has no shopcart.");
	}
	let asyncFunc = async (user) => {
		let customerID = user["customerID"];
		let results = { "user" : mu.resolveUser(user) };
		let p1 = await msc.getCart(results, "cart", customerID);
		let p2 = await mp.addCategories(results, "cart");
		let cart = results["cart"];
		let p3 = await msc.getTotal(results, "summary", cart);
		return Promise.resolve(results);
	}
	asyncFunc(user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show shopcart. 'shopcart':");
            g.selectedPrint(results);
        }
        res.render('shopcart', results);
	})
});

router.post('/add', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	let pid = req.body.productID;
	let num = req.body.num;
	if (user["category"] != "customer") {
		res.send("Guest or admin has no shopcart.");
	}
	let asyncFunc = async (user, pid, num) => {
		let results = {}
		let cid = user["customerID"];
		let p1 = await msc.getCartNum(results, "cartNum", cid, pid);
		let total = Number(results["cartNum"]) + Number(num);
		if (total > 0) {
			let p2 = await msc.updateInCart(cid, pid, total);
		} else {
			let p3 = await msc.removeFromCart(cid, pid);
		}
		results["total"] = total;
		let p4 = await msc.updateCartTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid, num).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Add products to cart");
            g.selectedPrint(results);
        }
        res.send("Add " + num + " product" + pid + "to cart. Cart remains " + results["total"] + "."); 
	})
});

router.post('/update', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	let pid = req.body.productID;
	let num = req.body.num;
	if (user["category"] != "customer") {
		res.send("Guest or admin has no shopcart.");
	}
	let asyncFunc = async (user, pid, num) => {
		let results = {}
		let cid = user["customerID"];
		if (num > 0) {
			let p1 = await msc.updateInCart(cid, pid, num);
		} else {
			let p2 = await msc.removeFromCart(cid, pid);
		}
		let p3 = await msc.updateCartTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid, num).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update products in cart");
            g.selectedPrint(results);
        }
        res.send("Update product" + pid + "in cart to " + num + "."); 
	})
});

router.post('/remove', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	let pid = req.body.productID;
	if (user["category"] != "customer") {
		res.send("Guest or admin has no shopcart.");
	}
	let asyncFunc = async (user, pid) => {
		let results = {}
		let cid = user["customerID"];
		let p1 = await msc.removeFromCart(cid, pid);
		let p2 = await msc.updateCartTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Remove products in cart");
            g.selectedPrint(results);
        }
        res.send("Remove product" + pid + "in cart."); 
	})
});

router.get('/checkout', function(req, res) {
	let user = req.session.user;
	if (user === undefined || user["category"] !== "customer") {
		res.send("Guest or admin cannot purchase.");
	}
	let asyncFunc = async (user) => {
		let customerID = user["customerID"];
		let results = { "user" : mu.resolveUser(user) };
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
	    let p3 = await msc.getTotal(results, "summary", checkout);
		return Promise.resolve(results);
	}
	asyncFunc(user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Checkout from cart. 'shopcart':");
            g.selectedPrint(results);
        }
        res.render('shopcart', results);
	})
});

router.post('/pay', function(req, res) {
	let purchase = req.body.purchase;
	let totalPrice = req.body.totalPrice;
	let user = mu.resolveUser(req.session.user);
	if (user["category"] != "customer") {
		res.send("Guest or admin cannot pay.");
	}
	if (purchase === undefined) {
		res.send("Non-purchase exit.");
	}
	let asyncFunc = async (user, purchase, totalPrice) => {
		let results = {};
		let cid = user["customerID"];
		let p1 = await mp.sellProducts(results, "sell", purchase);
		let p2 = await mo.getNextOrderID(results, "newID");
		let newID = results["newID"];
		let p3 = await mo.newOrder(newID, cid, totalPrice, purchase);
		let p4 = await msc.deleteCart(cid);
		return Promise.resolve(results);
	}
	asyncFunc(user, purchase, totalPrice).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Payment process.");
            g.selectedPrint(results);
        }
        res.send("Payment success. Have a nice day!"); 
	})
});

module.exports = router;
