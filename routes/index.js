var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

// root
router.get('/', function(req, res) {
	res.redirect('/products');
});

// show all products
router.get('/products', function(req, res) {
	let promises = [];
	promises.push(g.getProducts("select * from PRODUCT"));
	promises.push(g.getCategories("select * from CATEGORY"));
	promises.push(g.getAccountJSON());
	promises.push(g.resolveUser(req.session.user));
	// promises and results are paired
	Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show all products. 'index':");
            let titles = ["products", "categories", "accounts", "user"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
        }
		res.render('index', {
			"products": results[0],
			"categories": results[1],
			"accounts": results[2],
			"user": results[3]
		});  // promises and results are paired
	});
});

var filterProducts  = async function(products, categories, searchWrod) {
	let promise = await new Promise((resolve, reject) => {
		let arr = [];
		let clist = categories
		products.forEach((product) => {
			let flag = true;
			if (genre != undefined && genre != '' && genre != video.genre) {
				flag = false;
			}
			if (title != undefined && title != '') {
				let keywords = title.trim().toLowerCase().split(' ');
				for (let i = 0; i < keywords.length; i++) {
					if (flag && video.title.toLowerCase().search(keywords[i]) == -1) {
						flag = false;
					}
				}
			}
			if (flag) {
				arr.push(video);
			}
		})
		resolve(arr);
	});
	return promise;
};
// show one product
router.get('/products/:id', function(req, res) {
	let promises = [];
	let _id = req.params.id;
	let categories = req.params.gategories;
	let searchWord = req.params.searchWord;
	console.log(categories);
	console.log(searchWord);
	promises.push(g.getProducts("select * from PRODUCT where ProductID=" + _id));
	promises.push(g.getCategories("select * from CATEGORY NATURAL JOIN PRODUCT_OWN_CATEGORY where ProductID=" + _id));
	promises.push(g.getAccountJSON());
	promises.push(g.resolveUser(req.session.user));
	Promise.all(promises).then(function(results) {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Show one product. 'show':");
            let titles = ["product", "categories", "accounts", "user"];
            for (let i = 0; i < results.length; i++){
            	g.selectedPrint(titles[i], results[i]);
            }
        }
		res.render('show', {
			"product" : results[0][0],
			"categories" : results[1],
			"accounts" : results[2],
			"user": results[3]
		});
	});
});


module.exports = router;
