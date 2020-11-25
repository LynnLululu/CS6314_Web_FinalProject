let db = require('../modules/database');
let g = require('../modules/globals');

// get all products
var getProducts = function(dic, key) {
    return new Promise((resolve, reject) => {
        let sql = "select * from PRODUCT order by ProductID DESC";  // new products at the front
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = {};
                for (let elem of rows) {
                    let tmp = {};
                    let productID = elem['ProductID'];
                    tmp["productName"] = elem['Name'];
                    tmp["categories"] = [];
                    tmp["productPrice"] = elem['Price'];
                    tmp["description"] = elem['Description'];
                    tmp["image"] = elem['Image'];
                    tmp["num"] = elem['Num'];
                    if (elem['Visible'] == 0) {
                        tmp["visible"] = false;
                    } else {
                        tmp["visible"] = true;
                    }
                    results[productID] = tmp;
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getProducts");
                    console.log(results);
                }
                dic[key] = results;
                resolve();
            }
        });
    });
};
exports.getProducts = getProducts;

// fill categories for all products
var addCategories = function(dic, key) {
    return new Promise((resolve, reject) => {
        let sql = "select * from CATEGORY AS C, PRODUCT_OWN_CATEGORY AS PC where C.CategoryID=PC.CategoryID";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                for (let elem of rows) {
                    let productID = elem['ProductID'];
                    let categoryName = elem['Name'];
                    dic[key][productID]["categories"].push(categoryName);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("addCategories");
                    console.log(dic[key]);
                }
                resolve();
            }
        });
    });
}
exports.addCategories = addCategories;

// select products by categoreis and keywords
var selectProducts = function(dic, key, categories, keywords) {
    return new Promise((resolve, reject) => {
        let selected = {};
        let products = dic[key];
        Object.keys(products).forEach(function(productID) {
            let flag = true;
            let productCategories = products[productID]["categories"];
            let productNameLC = products[productID]["productName"].toLowerCase();
            for (let category of categories){
                if (flag && productCategories.indexOf(category) === -1){
                    flag = false;
                    if (g.logLevel <= g.Level.DEBUGGING) {
                        console.log(products[productID]);
                        console.log(category);
                    }
                }
            }
            for (let keyword of keywords){
                if (flag && productNameLC.indexOf(keyword) === -1){
                    flag = false;
                    if (g.logLevel <= g.Level.DEBUGGING) {
                        console.log(products[productID]);
                        console.log(keyword);
                    }
                }
            }
            if (flag) {
                selected[productID] = products[productID];
            }
        })
        dic[key] = selected;
        if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("selectProducts");
            console.log(categories);
            console.log(keywords);
        }
        resolve();
    });
}
exports.selectProducts = selectProducts;

// get all categories
var getCategories = function(dic, key) {
    return new Promise((resolve, reject) => {
        let sql = "select * from CATEGORY";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    results.push(elem['Name']);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getCategories");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.getCategories = getCategories;

// generate filter string
var generateFilterString = function(dic, key, categories, keywords, text) {
    return new Promise((resolve, reject) => {
        if (g.logLevel <= g.Level.DEVELOPING) {
            console.log("generateFilterString");
            console.log(categories);
            console.log(keywords);
            console.log(text);
        }
        if (categories.length > 0) {
            if (keywords.length > 0) {
                dic[key] = "All " + categories.join(', ') + ": " + text;
                resolve();
            } else {
                dic[key] = "All " + categories.join(', ') + ":";
                resolve();
            } 
        } else {
            if (keywords.length > 0) {
                dic[key] = "All categories: " + text;
                resolve();
            } else {
                dic[key] = "";
                resolve();
            }
        }
    });
};
exports.generateFilterString = generateFilterString;

// update image
var updateImage = function(image) {
    return new Promise((resolve, reject) => {
        results();
    });
};
exports.updateImage = updateImage;

// update product
var updateProduct = function(product) {
    return new Promise((resolve, reject) => {
        results();
    });
};
exports.updateProduct = updateProduct;


// update product
var updateCategories = function(categories) {
    return new Promise((resolve, reject) => {
        results();
    });
};
exports.updateCategories = updateCategories;

// soft delete product
var deleteProduct = function(productID) {
    return new Promise((resolve, reject) => {
        results();
    });
};
exports.updateProduct = updateProduct;

