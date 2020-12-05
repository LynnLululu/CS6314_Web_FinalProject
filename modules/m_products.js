let db = require('../modules/database');
let g = require('../modules/globals');
let async = require('async');

const EMPTYPRODUCT = {
    "productID": -1,
    "productName": "",
    "categories": [],
    "productPrice": 0,
    "description": "",
    "image": "",
    "storeNum": 0,
    "visible": false,
}
exports.EMPTYPRODUCT = EMPTYPRODUCT;

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
                    tmp["productID"] = elem['ProductID'];
                    tmp["productName"] = elem['Name'];
                    tmp["categories"] = [];
                    tmp["productPrice"] = elem['Price'];
                    tmp["description"] = elem['Description'];
                    tmp["image"] = elem['Image'];
                    tmp["storeNum"] = elem['Num'];
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

// get all products by ids
var getProductsByIDS = function(dic, key, idDic) {
    return new Promise((resolve, reject) => {
        let sql = "select * from PRODUCT";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = {};
                for (let elem of rows) {
                    let tmp = {};
                    let productID = elem['ProductID'];
                    if (idDic.hasOwnProperty(productID)) {
                        tmp["productName"] = elem['Name'];
                        tmp["categories"] = [];
                        tmp["productPrice"] = elem['Price'];
                        tmp["description"] = elem['Description'];
                        tmp["image"] = elem['Image'];
                        tmp["storeNum"] = elem['Num'];
                        if (elem['Visible'] == 0) {
                            tmp["visible"] = false;
                        } else {
                            tmp["visible"] = true;
                        }
                        results[productID] = tmp;
                    }
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getProductsByIDS");
                    console.log(results);
                }
                dic[key] = results;
                resolve();
            }
        });
    });
};
exports.getProductsByIDS = getProductsByIDS;

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
                    if (dic[key].hasOwnProperty(productID)) {
                        dic[key][productID]["categories"].push(categoryName);
                    }
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
var selectProducts = function(dic, key, products, categories, keywords) {
    return new Promise((resolve, reject) => {
        let selected = {};
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
        let sql = "select * from CATEGORY order by CategoryID ASC";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    results.push({
                        "categoryID": elem['CategoryID'],
                        "categoryName": elem['Name'],
                    });
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
var updateImage = function(image) {  // TODO
    return new Promise((resolve, reject) => {
        resolve();
    });
};
exports.updateImage = updateImage;

// update product
var updateProduct = function(productID, product) {
    return new Promise((resolve, reject) => {
        let visible = product["visible"] ? 1 : 0;
        let sql = "update PRODUCT SET Name='" + product["productName"] + "', Price=" + product["productPrice"] + ", Description='" + product["description"] + "', Image='" + product["image"] + "', Visible=" + visible + ", Num=" + product["storeNum"] + " where ProductID=" + productID;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateProduct");
                }
                resolve();
            }
        });
    });
};
exports.updateProduct = updateProduct;

// soft delete product
var deleteProduct = function(productID) {
    return new Promise((resolve, reject) => {
        let sql = "update PRODUCT SET Visible=0, Num=0 where ProductID=" + productID;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("deleteProduct");
                }
                resolve();
            }
        });
    });
};
exports.deleteProduct = deleteProduct;

// relax categories
var relaxCategories = function(productID, product, categories) {
    return new Promise((resolve, reject) => {
        let cdic = {};
        let nextID = 0;
        for (let c of categories) {
            cdic[c["categoryName"]] = c["categoryID"];
            if (c["categoryID"] >= nextID) {
                nextID = c["categoryID"] + 1;
            }
        }
        let sqls = "delete FROM PRODUCT_OWN_CATEGORY where ProductID=" + productID + ";";
        for (let c of product["categories"]) {
            if (!cdic.hasOwnProperty(c)) {
                sqls = sqls + "insert INTO CATEGORY (CategoryID, Name) VALUES (" + nextID +", 'c');";
                maxID = maxID + 1;
            }
            sqls = sqls + "insert INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID) VALUES(" + productID + ", " + cdic[c] + ");"

        }
        async.eachSeries(sqls, function(sql, callback) {
            db.query(sql, (err, rows) => {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        }, function(err) {  // callback after all queries
            if (err) {
                console.log(err);
            } else {
                if (g.logLevel <= g.Level.DEBUGGING) {
                    console.log("relaxCategories");
                }
                resolve();
            }
        });
    });
};
exports.relaxCategories = relaxCategories;

// sell products
var sellProducts = function(purchase) {
    return new Promise((resolve, reject) => {
        let sqls = [];
        for (let [pid, num] of purchase) {
            sqls.push("update PRODUCT SET Num=Num+" + num + " where ProductID=" + pid);
        }
        async.eachSeries(sqls, function(sql, callback) {
            db.query(sql, (err, rows) => {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        }, function(err) {  // callback after all queries
            if (err) {
                console.log(err);
            } else {
                if (g.logLevel <= g.Level.DEBUGGING) {
                    console.log("sellProducts");
                }
                resolve();
            }
        });
    });
}
exports.sellProducts = sellProducts;


const CAROUSELSIZE = 4;
// select products for carousel
var selectCarousel = function(dic, key, products, categories, hot) {
    return new Promise((resolve, reject) => {
        let selected = { "Hot": [] };
        for (let category of categories) {
            selected[category["categoryName"]] = [];
        }
        for (let elem of hot) {
            let productID = elem["productID"];
            let product = products[productID];
            if (selected["Hot"].length < CAROUSELSIZE) {
                selected["Hot"].push({ productID: product});
            }
            for (let category of product["categories"]) {
                if (selected[category].length < CAROUSELSIZE) {
                    selected[category].push({ productID: product});
                }
            }
        }
        let empty = [];
        Object.keys(selected).forEach(function(title) {
            if (selected[title].length === 0) {
                empty.push(title);
            }
        })
        for (let title of empty) {
            delete selected[title];
        }
        if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("selectCarousel");
            console.log(selected);
        }
        dic[key] = selected;
        resolve();
    });
}
exports.selectCarousel = selectCarousel;


