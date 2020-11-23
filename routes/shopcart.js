var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

router.get('/', function(req, res) {
    let promises = [];
    let user = g.resolveUser(req.session.user);
    console.log(user);
    promises.push(g.getCart(user));
	promises.push(g.getAccountJSON());
	promises.push(g.resolveUser(user));
	Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show one's shopcart. 'shopcart':");
            let titles = ["cart", "accounts", "user"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
        }
		res.render('shopcart', {
			"cart" : results[0],
			"accounts" : results[1],
			"user": results[2]
		});
	});
});

router.post('/add', function(req, res) {
	let user = g.resolveUser(req.session.user);
	let pid = req.body.productID;
	let num = req.body.num;
	if (g.logLevel <= g.Level.DEBUGGING) {
        console.log("Add " + num + " product " + pid + " to " + user["email"] + "'s shopcart.");
    }
	if (user == undefined || user["category"] != "customer") {
		res.send([]);
	} else {
		let promises = [];
		promises.push(g.addToCart(user, pid, num));
		Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("After adding to shopcart:");
            g.selectedPrint("cart", results[0]);
        }
		res.send(results[0]);
	});
	}
});

router.post('/update', function(req, res) {
	let user = g.resolveUser(req.session.user);
	let pid = req.body.productID;
	let num = req.body.num;
	if (g.logLevel <= g.Level.DEBUGGING) {
        console.log("Update product " + pid + " in " + user["email"] + "'s shopcart to " + num + ".");
    }
	if (user == undefined || user["category"] != "customer") {
		res.send([]);
	} else {
		let promises = [];
		promises.push(g.updateInCart(user, pid, num));
		Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("After update in shopcart:");
            g.selectedPrint("cart", results[0]);
        }
		res.send(results[0]);
	});
	}
});

router.post('/remove', function(req, res) {
	let user = g.resolveUser(req.session.user);
	let pid = req.body.productID;
	if (g.logLevel <= g.Level.DEBUGGING) {
        console.log("Remove product " + pid + " from " + user["email"] + "'s shopcart.");
    }
	if (user == undefined || user["category"] != "customer") {
		res.send([]);
	} else {
		let promises = [];
		promises.push(g.removeFromCart(user, pid));
		Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("After remove from shopcart:");
            g.selectedPrint("cart", results[0]);
        }
		res.send(results[0]);
	});
	}
});

module.exports = router;
