let db = require('../modules/database');

// log level control
const Level = {
    DEVELOPING: 0,
    DEBUGGING: 1,
    OPERATING: 2,
    NOLOGGING: 3,
}
var logLevel =  Level.DEVELOPING;
exports.Level = Level;
exports.logLevel = logLevel;

// products
var getProducts = function(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let products = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["productID"] = elem['ProductID'];
                    tmp["productName"] = elem['Name'];
                    tmp["productPrice"] = elem['Price'];
                    tmp["description"] = elem['Description'];
                    tmp["image"] = elem['Image'];
                    tmp["num"] = elem['Num'];
                    if (elem['Visible'] == 0) {
                        tmp["visible"] = false;
                    } else {
                        tmp["visible"] = true;
                    }
                    products.push(tmp);
                }
                if (logLevel <= Level.OPERATING) {
                    console.log("Get products:");
                }
                if (logLevel <= Level.DEBUGGING) {
                    console.log(products);
                }
                resolve(products);
            }
        });
    });
};
exports.getProducts = getProducts;

// categories
var getCategories = function(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let categories = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["categoryID"] = elem['CategoryID'];
                    tmp["categoryName"] = elem['Name'];
                    categories.push(tmp);
                }
                if (logLevel <= Level.OPERATING) {
                    console.log("Get categories:");
                }
                if (logLevel <= Level.DEBUGGING) {
                    console.log(categories);
                }
                resolve(categories);
            }
        });
    });
};
exports.getCategories = getCategories;

