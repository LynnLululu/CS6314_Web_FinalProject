var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

// root
router.get('/', function(req, res) {
	res.redirect('/products');
});
/*
var filterProducts  = async function(products, categories, text) {
	let promise = await new Promise((resolve, reject) => {
		let arr = [];
		let clist = (categories == undefined || categories == '') ? [] : categories.split(' ');
		let kwlist = (text == undefined || text == '') ? [] : text.trim().toLowerCase().split(' ');
		products.forEach((product) => {
			let flag = true;
			for (let i = 0; i < clist.length; i++) {
				
			}
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
*/
// show all products
router.get('/products', function(req, res) {
	let promises = [];
	let categories = req.params.searchCategories;
	let text = req.params.searchText;
	console.log(categories);
	console.log(text);
	console.log("test####");
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

// show one product
router.get('/products/:id', function(req, res) {
	let promises = [];
	let _id = req.params.id;
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
