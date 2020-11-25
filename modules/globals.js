let db = require('../modules/database');

// log level control
const Level = {
    DEVELOPING: 0,
    DEBUGGING: 1,
    OPERATING: 2,
    TESTING: 3,
}
var logLevel = Level.OPERATING;
exports.Level = Level;
exports.logLevel = logLevel;

// selected print
var selectedPrint = function(obj) {
    let outp = {};
    Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key]) && obj[key].length > 5) {  // array
            if (obj[key].length > 5) {
                let sliced = obj[key].slice(0, 5);
                sliced.push("...");
                outp[key] = sliced;
            } else {
                outp[key] = obj[key];
            }
        } else if (typeof(obj[key]) == "object" && Object.keys(obj[key]) !== undefined) {  // dict
            let ks = Object.keys(obj[key]);
            if (ks.length > 5) {
                let sliced = ks.slice(0, 5);
                outp[key] = {};
                for (let k of sliced) {
                    outp[key][k] = obj[key][k];
                }
                outp[key]["..."] = "...";
            } else {
                outp[key] = obj[key];
            }
        }else {
            outp[key] = obj[key];
        }
    })
    console.log(outp);
}
exports.selectedPrint = selectedPrint;

// date format
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// products in cart
var getCart = function(user) {
    return new Promise((resolve, reject) => {
        if (user["category"] == "customer") {
            // cannot distinguish CP.Num and P.Num
            let sql = "select CP.ProductID, CP.Num CartNum, P.Name, P.Price, P.Description, P.Image, P.Visible, P.Num StoreNum from CART_OWN_PRODUCT CP, PRODUCT P where CP.AccountID='" + user["details"]["customerID"] + "' and CP.ProductID=P.ProductID";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    let results = [];
                    for (let elem of rows) {
                        let tmp = {};
                        tmp["productID"] = elem['ProductID'];
                        tmp["cartNum"] = elem['CartNum'];
                        tmp["productName"] = elem['Name'];
                        tmp["price"] = elem['Price'];
                        tmp["description"] = elem['Description'];
                        tmp["image"] = elem['Image'];
                        tmp["visible"] = elem['Visible'];
                        tmp["storeNum"] = elem['StoreNum'];
                        results.push(tmp);
                        console.log(elem);
                    }
                    if (logLevel <= Level.DEVELOPING) {
                        console.log("Get cart");
                        console.log(results);
                    }
                    resolve(results);
                }
            });
        } else {
            resolve([]);
        }
    });
}
exports.getCart = getCart;

var updateCartTable = function() {
    if (logLevel <= Level.DEBUGGING) {
        console.log("Update CART.");
    }
    let sqls = [
        "TRUNCATE TABLE CART",
        "INSERT INTO CART select DISTINCT AccountID from CART_OWN_PRODUCT"
    ]
    async.eachSeries(sqls, function(sql, callback) {
        db.query(sql, (err, rows) => {
            if (err) {
                callback(err);
            } else {
                if (logLevel <= Level.DEVELOPING) {
                    console.log("success: " + sql);
                }
                callback();
            }
        });
    }, function(err) {  // callback after all queries
        if (err) {
            console.log(err);
        } else {
            if (logLevel <= Level.DEBUGGING) {
                console.log("Update Table CART success.");
            }
        }
    });
}

// get product number in cart
var getCartNum = function(cid, pid) {
    return new Promise((resolve, reject) => {
        if (cid === undefined || pid === undefined) {
            resolve(0);
        } else {
            let sql = "select Num from CART_OWN_PRODUCT where AccountID='" + cid + "' and ProductID='" + pid + "'";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    if (rows.length == 0) {
                        resolve(0);
                    } else {
                        resolve(rows[0]["Num"]);
                    }
                }
            });
        }
    });
}

//  add function for cart
var addToCart = function(user, pid, num) {
    let cid = user["detail"]["customerID"];
    let promises = [];
    promises.push(getCartNum(cid, pid));
    Promise.all(promises).then(function(results) {
        return new Promise((resolve, reject) => {
            let cartNum = num + results[0]
            let sql = "REPLACE INTO CART_OWN_PRODUCT (AccountID, ProductID, Num) VALUES ('" + cid + "', '" + pid + "', " + cartNum + ")";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve(updateCartTable(getCart(user)));
                }
            });
        });
    });
}
exports.addToCart = addToCart;

//  update function for cart
var updateInCart = function(user, pid, num) {
    let cid = user["detail"]["customerID"];
    let sql = "REPLACE INTO CART_OWN_PRODUCT (AccountID, ProductID, Num) VALUES ('" + cid + "', '" + pid + "', " + num + ")";
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                resolve(updateCartTable(getCart(user)));
            }
        });
    });
}
exports.updateInCart = updateInCart;

//  remove function for cart
var removeFromCart = function(user, pid) {
    let cid = user["detail"]["customerID"];
    let sql = "DELETE FROM CART_OWN_PRODUCT WHERE AccountID='" + cid + "' and ProductID='" + pid + "'";
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                resolve(updateCartTable(getCart(user)));
            }
        });
    });
}
exports.removeFromCart = removeFromCart;

