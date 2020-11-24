let db = require('../modules/database');
var fs = require('fs');

// log level control
const Level = {
    DEVELOPING: 0,
    DEBUGGING: 1,
    OPERATING: 2,
    TESTING: 3,
}
var logLevel = Level.TESTING;
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

// resolve user
var resolveUser = function(user) {
   if (user === undefined) {
        return {
            "category": "anonymous",
            "email": "",
            "username": "",
            "password": "",
            "details": {}
        };
    } else {
        return user;
    }
};
exports.resolveUser = resolveUser;

// seession action when sign in
var sessionForSignIn = function(email, password) {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(getCustomers("select * from CUSTOMER where Email='" + email + "' AND Password='" + password + "'"));
        promises.push(getAdmins("select * from ADMIN where Email='" + email + "' AND Password='" + password + "'"));
        Promise.all(promises).then(function(results) {
            let customers = results[0];
            let admins = results[1];
            if (customers.length > 0) {
                resolve({
                    "category": "customer",
                    "email": customers[0]["email"],
                    "username": customers[0]["username"],
                    "password": customers[0]["password"],
                    "details": {
                        "customerID": customers[0]["customerID"],
                        "firstName": customers[0]["firstName"],
                        "lastName": customers[0]["lastName"],
                        "dateOfBirth": customers[0]["dateOfBirth"],
                        "payment": customers[0]["payment"],
                        "mailAddress": customers[0]["mailAddress"],
                        "billAddress": customers[0]["billAddress"],
                        "phone": customers[0]["phone"],
                    }
                });
            } else if (admins.length > 0) {
                resolve({
                    "category": "admin",
                    "email": admins[0]["email"],
                    "username": admins[0]["username"],
                    "password": admins[0]["password"],
                    "details": {
                        "adminID": admins[0]["adminID"],
                        "firstName": admins[0]["firstName"],
                        "lastName": admins[0]["lastName"],
                        "dateOfBirth": admins[0]["dateOfBirth"],
                    }
                });
            } else {
                if (logLevel <= Level.OPERATING) {
                    console.log("Sign in failed.");
                }
                resolve(undefined);
            }
        });
    });
};
exports.sessionForSignIn = sessionForSignIn;

// seession action when sign up
var sessionForSignUp = function(username, email, password) {
    return new Promise((resolve, reject) => {
        let promises = [];
        // find next free id
        promises.push(getCustomers("select * from CUSTOMER"));
        Promise.all(promises).then(function(results) {
            let ids = [];
            for (let i = 0; i < results[0].length; i++) {
                ids.push(results[0][i]["customerID"]);
            }
            ids.sort();
            let newID = 100;  // save 0-99 for admins
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] == newID) {
                    newID++;
                } else {
                    break;
                }
            }
            // add new customer
            let sql = "REPLACE INTO CUSTOMER (AccountID, Email, UserName, Password) VALUES (" + newID + ", '" + email + "', '" + username + "', '" + password + "');";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve({
                        "category": "customer",
                        "email": email,
                        "username": username,
                        "password": password,
                        "details": {
                            "customerID": newID,
                            "firstName": undefined,
                            "lastName": undefined,
                            "dateOfBirth": undefined,
                            "payment": undefined,
                            "mailAddress": undefined,
                            "billAddress": undefined,
                            "phone": undefined,
                        }
                    });  // sign in with new account
                }
            })  
        });
    });
};
exports.sessionForSignUp = sessionForSignUp;

// seession action when change password
var sessionForChangePwd = function(newPwd, user) {
    return new Promise((resolve, reject) => {
        let promises = [];
        Promise.all(promises).then(function(results) {
            let sql = "UPDATE CUSTOMER SET Password='" + newPwd + "' WHERE Email='" + user["email"] + "'";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve("success");
                }
            })  
        });
    });
};
exports.sessionForChangePwd = sessionForChangePwd;

// get all products
var getProducts = function(dic, key) {
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
                if (logLevel <= Level.DEVELOPING) {
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
                if (logLevel <= Level.DEVELOPING) {
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
                    if (logLevel <= Level.DEBUGGING) {
                        console.log(products[productID]);
                        console.log(category);
                    }
                }
            }
            for (let keyword of keywords){
                if (flag && productNameLC.indexOf(keyword) === -1){
                    flag = false;
                    if (logLevel <= Level.DEBUGGING) {
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
        if (logLevel <= Level.DEBUGGING) {
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
                if (logLevel <= Level.DEVELOPING) {
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
        console.log(categories);
        console.log(keywords);
        console.log(text);
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

// get all customers
var getCustomers = function(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["customerID"] = elem['AccountID'];
                    tmp["email"] = elem['Email'];
                    tmp["username"] = elem['UserName'];
                    tmp["password"] = elem['Password'];
                    tmp["firstName"] = elem['Fname'];
                    tmp["lastName"] = elem['Lname'];
                    tmp["dateOfBirth"] = elem['DateOfBirth'];
                    tmp["payment"] = elem['Payment'];
                    tmp["mailAddress"] = elem['MailAddr'];
                    tmp["billAddress"] = elem['BillAddr'];
                    tmp["phone"] = elem['Phone'];
                    results.push(tmp);
                }
                if (logLevel <= Level.DEVELOPING) {
                    console.log("Get customers.");
                    console.log(results);
                }
                resolve(results);
            }
        });
    });
};
exports.getCustomers = getCustomers;

// get all admins
var getAdmins = function(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["adminID"] = elem['AccountID'];
                    tmp["email"] = elem['Email'];
                    tmp["username"] = elem['UserName'];
                    tmp["password"] = elem['Password'];
                    tmp["firstName"] = elem['Fname'];
                    tmp["lastName"] = elem['Lname'];
                    tmp["dateOfBirth"] = elem['DateOfBirth'];
                    results.push(tmp);
                }
                if (logLevel <= Level.DEVELOPING) {
                    console.log("Get admins");
                    console.log(results);
                }
                resolve(results);
            }
        });
    });
};
exports.getAdmins = getAdmins;

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

