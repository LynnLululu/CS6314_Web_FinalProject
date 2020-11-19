let db = require('../modules/database');
var fs = require('fs');

// log level control
const Level = {
    DEVELOPING: 0,
    DEBUGGING: 1,
    OPERATING: 2,
    TESTING: 3,
}
var logLevel =  Level.DEVELOPING;
exports.Level = Level;
exports.logLevel = logLevel;

// selected print
var selectedPrint = function(title, obj) {
    console.log(title + ":");
    if (Array.isArray(obj)) {
        if (obj.length < 5) {
            console.log(JSON.stringify(obj, null, '  '));
        } else {
            let sliced = obj.slice(0, 5);
            sliced.push("...");
            console.log(JSON.stringify(sliced, null, '  '));
        }
    } else {
        console.log(obj);
    }
}
exports.selectedPrint = selectedPrint;

// date format
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// occupied.json dir
const _accountDir = "./public/data/account.json";

// build account.json and return its directory
var getAccountJSON = function() {
    return new Promise((resolve, reject) => {
        fs.exists(_accountDir, function(exist) {
            if (exist) {
                if (logLevel <= Level.DEBUGGING) {
                    console.log("Existed: account.json.");
                }
                if (logLevel <= Level.DEVELOPING) {
                    let string = fs.readFileSync(_accountDir);
                    let content = JSON.parse(string);
                    console.log(content);
                }
                resolve(_accountDir);
            } else {
                let sql = "select UserName, Email, Password from CUSTOMER UNION select UserName, Email, Password from ADMIN";
                db.query(sql, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        let results = [];
                        for (let elem of rows) {
                            let tmp = {};
                            tmp["email"] = elem['Email'];
                            tmp["username"] = elem['UserName'];
                            tmp["password"] = elem['Password'];
                            results.push(tmp);
                        }
                        fs.writeFileSync(_accountDir, JSON.stringify(results, null, '\t'));
                        if (logLevel <= Level.DEBUGGING) {
                            console.log("Create: account.json.");
                        }
                        if (logLevel <= Level.DEVELOPING) {
                            console.log(results);
                        }
                        resolve(_accountDir);
                    }
                });
            }
        });
    });
};
exports.getAccountJSON = getAccountJSON;

// update account.json
var updateAccountJSON = function(email, username, password) {
    let string = fs.readFileSync(_accountDir);
    let content = JSON.parse(string);
    let tmp = {};
    tmp["email"] = email;
    tmp["username"] = username;
    tmp["password"] = password;
    content.push(tmp);
    fs.writeFileSync(_accountDir, JSON.stringify(content, null, '\t'));
    if (logLevel <= Level.DEBUGGING) {
        console.log("Update: account.json.");
        console.log(tmp);
    }
}

// resolve user
var resolveUser = function(user) {
   if (user === undefined) {
        return {
            "catagory": "anonymous",
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
                    "catagory": "customer",
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
                    "catagory": "admin",
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
            updateAccountJSON(email, username, password);
            let sql = "INSERT INTO CUSTOMER (AccountID, Email, UserName, Password) VALUES (" + newID + ", '" + email + "', '" + username + "', '" + password + "');";
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve({
                        "catagory": "customer",
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

// products
var getProducts = function(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
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
                    results.push(tmp);
                }
                if (logLevel <= Level.DEVELOPING) {
                    console.log("Get products.");
                    console.log(results);
                }
                resolve(results);
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
                let results = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["categoryID"] = elem['CategoryID'];
                    tmp["categoryName"] = elem['Name'];
                    results.push(tmp);
                }
                if (logLevel <= Level.DEVELOPING) {
                    console.log("Get categories.");
                    console.log(results);
                }
                resolve(results);
            }
        });
    });
};
exports.getCategories = getCategories;

// customers
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

// admins
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
        if (user["catagory"] == "customer") {
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





