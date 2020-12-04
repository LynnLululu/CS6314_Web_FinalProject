var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var msc = require('../modules/m_shopcart');
var mo = require('../modules/m_order');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
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
	let pid = req.body.productID;
	let num = req.body.num;
	if (isNaN(Number(pid)) || isNaN(Number(num)) || num <= 0) {
		res.send("Unvalid input in post shopcart/add.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
		res.send("Guest or admin has no shopcart.");
	}
	let asyncFunc = async (user, pid, num) => {
		let results = {}
		let cid = user["customerID"];
		let p1 = await msc.getCartNum(results, "cartNum", cid, pid);
		let total = Number(results["cartNum"]) + Number(num);
		let p2 = await msc.updateInCart(cid, pid, total);
		results["total"] = total;
		let p3 = await msc.updateCartTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid, num).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Add " + num + " product " + pid + "s to shopcart.");
            g.selectedPrint(results);
        }
        res.send("Add " + num + " product " + pid + "s to shopcart."); 
	})
});

router.post('/update', function(req, res) {
	let pid = req.body.productID;
	let num = req.body.num;
	if (isNaN(Number(pid)) || isNaN(Number(num))) {
		res.send("Unvalid input in post shopcart/update.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
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
            console.log("Update product " + pid + "s' number in shopcart to " + num + ".");
            g.selectedPrint(results);
        }
        res.redirect('/shopcart');
	})
});

router.post('/remove', function(req, res) {
	let pid = req.body.productID;
	if (isNaN(Number(pid))) {
		res.send("Unvalid input in post shopcart/remove.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
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
            console.log("Remove product " + pid + " from shopcart.");
            g.selectedPrint(results);
        }
        res.redirect('/shopcart');
	})
});

router.get('/checkout', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
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
	if (!purchase || isNaN(Number(totalPrice))) {
		res.send("Unvalid input in post shopcart/remove.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
		res.send("Guest or admin cannot pay.");
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
            console.log("Payment success. Have a nice day!");
            g.selectedPrint(results);
        }
        res.redirect('/products');
	})
});

module.exports = router;
