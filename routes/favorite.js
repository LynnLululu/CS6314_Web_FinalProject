var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');
var mp = require('../modules/m_products');
var mf = require('../modules/m_favorite');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (user === undefined || user["category"] !== "customer") {
		res.send("Guest or admin has no favorite.");
	}
	let asyncFunc = async (user) => {
		let customerID = user["customerID"];
		let results = { "user" : mu.resolveUser(user) };
		let p1 = await mf.getFavorite(results, "favorite", customerID);
		let p2 = await mp.addCategories(results, "favorite");
		return Promise.resolve(results);
	}
	asyncFunc(user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show favorite. 'favorite':");
            g.selectedPrint(results);
        }
        res.render('favorite', results);
	})
});

router.post('/add', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	let pid = req.body.productID;
	let num = req.body.num;
	if (user == undefined || user["category"] != "customer") {
		res.send("Guest or admin has no favorite.");
	}
	let asyncFunc = async (user, pid) => {
		let results = {}
		let cid = user["customerID"];
		let p1 = await mf.addToFavorite(cid, pid);
		let p2 = await mf.updateFavoriteTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Add products to favorite");
            g.selectedPrint(results);
        }
        res.send("Add product" + pid + "to favorite."); 
	})
});

router.post('/remove', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	let pid = req.body.productID;
	if (g.logLevel <= g.Level.DEBUGGING) {
        console.log("Remove product " + pid + " from " + user["email"] + "'s favorite.");
    }
	if (user == undefined || user["category"] != "customer") {
		res.send("Guest or admin has no favorite.");
	}
	let asyncFunc = async (user, pid) => {
		let results = {}
		let cid = user["customerID"];
		let p1 = await mf.removeFromFavorite(cid, pid);
		let p2 = await mf.updateFavoriteTable();
		return Promise.resolve(results);
	}
	asyncFunc(user, pid).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Remove products in favorite");
            g.selectedPrint(results);
        }
        res.send("Remove product" + pid + "to favorite."); 
	})
});

module.exports = router;
