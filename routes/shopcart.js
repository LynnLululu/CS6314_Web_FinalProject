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
            let titles = ["products", "accounts", "user"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
        }
		res.render('shopcart', {
			"product" : results[0],
			"accounts" : results[1],
			"user": results[2]
		});
	});
});

module.exports = router;
