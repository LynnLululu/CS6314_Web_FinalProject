let db = require('../modules/database');
let g = require('../modules/globals');
let async = require('async');

const SALESTAX = 0.0825;
const SHIPPING = 0;

// products in cart
var getCart = function(dic, key, customerID) {
    return new Promise((resolve, reject) => {
        // cannot distinguish CP.Num and P.Num
        let sql = "select CP.ProductID, CP.Num CartNum, P.Name, P.Price, P.Description, P.Image, P.Visible, P.Num StoreNum from CART_OWN_PRODUCT CP, PRODUCT P where CP.AccountID=" + customerID + " and CP.ProductID=P.ProductID";
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
                    tmp["cartNum"] = elem['CartNum'];
                    tmp["productName"] = elem['Name'];
                    tmp["categories"] = [];
                    tmp["productPrice"] = elem['Price'];
                    tmp["description"] = elem['Description'];
                    tmp["image"] = elem['Image'];
                    tmp["storeNum"] = elem['StoreNum'];
                    if (elem['Visible'] == 0) {
                        tmp["visible"] = false;
                    } else {
                        tmp["visible"] = true;
                    }
                    results[productID] = tmp;
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getCart");
                    console.log(results);
                }
                dic[key] = results;
                resolve();
            }
        });
    });
}
exports.getCart = getCart;

// get total for cart
var getTotal = function(dic, key, cart) {
    return new Promise((resolve, reject) => {
        let beforeTax = 0
        Object.keys(cart).forEach(function(productID) {
            beforeTax = beforeTax + cart[productID]["cartNum"] * cart[productID]["productPrice"];
        });
        let tax = beforeTax * SALESTAX;
        tax = parseFloat(tax).toFixed(2);
        let shipping = SHIPPING;
        let total = Number(beforeTax) + Number(tax) + Number(shipping);
        total = parseFloat(total).toFixed(2);
        results = {
            "beforeTax": beforeTax < 0.01 ? "Free" : '$' + beforeTax,
            "tax": tax < 0.01 ? "Free" : '$' + tax,
            "shipping": shipping < 0.01 ? "Free" : '$' + shipping,
            "total": total < 0.01 ? "Free" : '$' + total,
        }
        if (g.logLevel <= g.Level.DEVELOPING) {
            console.log("getTotal");
            console.log(results);
        }
        dic[key] = results;
        resolve();
    });
}
exports.getTotal = getTotal;

var updateCartTable = function() {
    return new Promise((resolve, reject) => {
        let sqls = [
            "TRUNCATE TABLE CART",
            "insert INTO CART select DISTINCT AccountID from CART_OWN_PRODUCT"
        ]
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
                    console.log("updateCartTable");
                }
                resolve();
            }
        });
    });
}
exports.updateCartTable = updateCartTable;

// get product number in cart
var getCartNum = function(dic, key, cid, pid) {
    return new Promise((resolve, reject) => {
        if (cid === undefined || pid === undefined) {
            dic[key] = 0;
            if (g.logLevel <= g.Level.DEVELOPING) {
                console.log("getCartNum");
            }
            resolve();
        } else {
            let sql = "select Num from CART_OWN_PRODUCT where AccountID=" + cid + " AND ProductID=" + pid;
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    if (rows.length == 0) {
                        dic[key] = 0;
                    } else {
                        dic[key] = rows[0]["Num"];
                    }
                    if (g.logLevel <= g.Level.DEVELOPING) {
                        console.log("getCartNum");
                    }
                    resolve();
                }
            });
        }
    });
}
exports.getCartNum = getCartNum;

//  update function for cart
var updateInCart = function(cid, pid, num) {
    return new Promise((resolve, reject) => {
        let sql = "replace INTO CART_OWN_PRODUCT (AccountID, ProductID, Num) VALUES (" + cid + ", " + pid + ", " + num + ")";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateInCart");
                }
                resolve();
            }
        });
    });
}
exports.updateInCart = updateInCart;

//  remove function for cart
var removeFromCart = function(cid, pid) {
    return new Promise((resolve, reject) => {
        let sql = "delete FROM CART_OWN_PRODUCT where AccountID=" + cid + " AND ProductID=" + pid;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("removeFromCart");
                }
                resolve();
            }
        });
    });
}
exports.removeFromCart = removeFromCart;

// delete cart
var deleteCart = function(cid) {
    return new Promise((resolve, reject) => {
        let sqls = [
            "delete FROM CART_OWN_PRODUCT where AccountID=" + cid,
            "delete FROM CART where AccountID=" + cid,
        ]
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
                    console.log("deleteCart");
                }
                resolve();
            }
        });
    });
}
exports.deleteCart = deleteCart;


