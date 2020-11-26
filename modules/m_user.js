let db = require('../modules/database');
let g = require('../modules/globals');

// resolve user
var resolveUser = function(user) {
   if (user === undefined) {
        return {
            "category": "anonymous",
            "accountID": -1,
            "email": "",
            "username": "Guest",
            "password": "",
            "details": {}
        };
    } else {
        return user;
    }
};
exports.resolveUser = resolveUser;

const ADMINRESERVE = 99;  // maximum AccountID of admin

// get all customers
var getCustomers = function(dic, key, email, password) {
    return new Promise((resolve, reject) => {
        let sql = "select * from CUSTOMER";
        if (email !== undefined && email !== "") {
            sql = "select * from CUSTOMER where Email='" + email + "'";
        }
        if (password !== undefined && password !== "") {
            if (email !== undefined && email !== "") {
                sql = "select * from CUSTOMER where Email='" + email + "' AND Password='" + password + "'";
            } else {
                sql = "select * from CUSTOMER where Password='" + password + "'";
            }
        }
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["category"] = "customer";
                    tmp["customerID"] = elem['AccountID'];
                    tmp["email"] = elem['Email'];
                    tmp["username"] = elem['UserName'];
                    tmp["password"] = elem['Password'];
                    tmp["details"] = {
                        "firstName": elem['Fname'],
                        "lastName": elem['Lname'],
                        "dateOfBirth": elem['DateOfBirth'],
                        "payment": elem['Payment'],
                        "mailAddress": elem['MailAddr'],
                        "billAddress": elem['BillAddr'],
                        "phone": elem['Phone'],
                    };
                    results.push(tmp);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getCustomers");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.getCustomers = getCustomers;

// view one attribute of all customers
var checkInCUSTOMER = function(dic, key, attrname, attrvalue) {
    return new Promise((resolve, reject) => {
        let sql = "select AccountID, " + attrname + " from CUSTOMER";
        if (attrvalue !== undefined){
            if (isNaN(Number(attrvalue))) {
                sql = "select AccountID, " + attrname + " from CUSTOMER where " + attrname + "='" + attrvalue + "'";
            } else {
                sql = "select AccountID, " + attrname + " from CUSTOMER where " + attrname + "=" + attrvalue;
            }
        }
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
                    results.push(tmp);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("checkInCUSTOM");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.checkInCUSTOMER = checkInCUSTOMER;

// get all admins
var getAdmins = function(dic, key, email, password) {
    return new Promise((resolve, reject) => {
        let sql = "select * from ADMIN";
        if (email !== undefined && email !== "") {
            sql = "select * from ADMIN where Email='" + email + "'";
        }
        if (password !== undefined && password !== "") {
            if (email !== undefined && email !== "") {
                sql = "select * from ADMIN where Email='" + email + "' AND Password='" + password + "'";
            } else {
                sql = "select * from ADMIN where Password='" + password + "'";
            }
        }
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let results = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["category"] = "admin";
                    tmp["adminID"] = elem['AccountID'];
                    tmp["email"] = elem['Email'];
                    tmp["username"] = elem['UserName'];
                    tmp["password"] = elem['Password'];
                    tmp["details"] = {
                        "firstName": elem['Fname'],
                        "lastName": elem['Lname'],
                        "dateOfBirth": elem['DateOfBirth'],
                    };
                    results.push(tmp);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getAdmins");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.getAdmins = getAdmins;

// view one attribute of all admins
var checkInADMIN = function(dic, key, attrname, attrvalue) {
    return new Promise((resolve, reject) => {
        let sql = "select AccountID, " + attrname + " from ADMIN";
        if (attrvalue !== undefined){
            if (isNaN(Number(attrvalue))) {
                sql = "select AccountID, " + attrname + " from ADMIN where " + attrname + "='" + attrvalue + "'";
            } else {
                sql = "select AccountID, " + attrname + " from ADMIN where " + attrname + "=" + attrvalue;
            }
        }
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
                    results.push(tmp);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("checkInADMIN");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.checkInADMIN = checkInADMIN;

// get user's original password in database
var getPassword = function(dic, key, attrname, attrvalue) {
    return new Promise((resolve, reject) => {
        let sql = "select AccountID, " + attrname + " from ADMIN";
        if (attrvalue !== undefined){
            if (isNaN(Number(attrvalue))) {
                sql = "select AccountID, " + attrname + " from ADMIN where " + attrname + "='" + attrvalue + "'";
            } else {
                sql = "select AccountID, " + attrname + " from ADMIN where " + attrname + "=" + attrvalue;
            }
        }
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
                    results.push(tmp);
                }
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("checkInADMIN");
                    console.log(results);
                }
                dic[key] = results
                resolve();
            }
        });
    });
};
exports.getPassword = getPassword;

var getNextCustomerID = function(dic, key, attrname, attrvalue) {
    return new Promise((resolve, reject) => {
        let sql = "select AccountID from CUSTOMER order by AccountID ASC";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                let newID = ADMINRESERVE + 1;  // save ids for admins
                for (let elem of rows) {
                    let _id = elem['AccountID'];
                    if (_id !== newID) {
                        break;
                    }
                    newID = newID + 1;
                }
                dic[key] = newID;
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("getNextCustomerID");
                    console.log(newID);
                }
                resolve();
            }
        });
    });
};
exports.getNextCustomerID = getNextCustomerID;

var createCustomer = function(dic, key, newID, email, username, password) {
    return new Promise((resolve, reject) => {
        let sql = "replace INTO CUSTOMER (AccountID, Email, UserName, Password) VALUES (" + newID + ", '" + email + "', '" + username + "', '" + password + "');";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                console.log("test for replace#####");
                console.log(rows);
                let user = {
                    "category": "customer",
                    "customerID": newID,
                    "email": email,
                    "username": username,
                    "password": password,
                    "details": {
                        "firstName": null,
                        "lastName": null,
                        "dateOfBirth": null,
                        "payment": null,
                        "mailAddress": null,
                        "billAddress": null,
                        "phone": null,
                    }
                };
                dic[key] = user;
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("createCustomer");
                    console.log(user);
                }
                resolve();
            }
        });
    });
};
exports.createCustomer = createCustomer;

// change username
var updateUsername = function(dic, key, newUsername, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET UserName='" + newUsername + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET UserName='" + newUsername + "' where AccountID=" + user["adminID"];
        }
        db.query(sql, (err, rows) => {
            if (err) {
                dic[key] = "fail";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateUsername: " + dic[key]);
                }
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateUsername: " + dic[key]);
                }
                resolve();
            }
        });
    });
};
exports.updateUsername = updateUsername;

// change password
var updatePassword = function(dic, key, newPassword, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Password='" + newPassword + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Password='" + newPassword + "' where AccountID=" + user["adminID"];
        }
        db.query(sql, (err, rows) => {
            if (err) {
                dic[key] = "fail";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updatePassword: " + dic[key]);
                }
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updatePassword: " + dic[key]);
                }
                resolve();
            }
        });
    });
};
exports.updatePassword = updatePassword;

var updateAccountDetails = function(dic, key, newFName, newLName, newDob, newPhone, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Fname='" + newFName + "', Lname='" + newLName + "', DateOfBirth='" + newDob + "', Phone='" + newPhone + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Fname='" + newFName + "', Lname='" + newLName + "', DateOfBirth='" + newDob + "', Phone='" + newPhone + "' where AccountID=" + user["customerID"];
        }
        db.query(sql, (err, rows) => {
            if (err) {
                dic[key] = "fail";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateAccountDetails: " + dic[key]);
                }
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateAccountDetails: " + dic[key]);
                }
                resolve();
            }
        });
    });
}
exports.updateAccountDetails = updateAccountDetails;

var updatePaymentMethods = function(dic, key, newPayment, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Payment='" + newPayment + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Payment='" + newPayment + "' where AccountID=" + user["customerID"];
        }
        db.query(sql, (err, rows) => {
            if (err) {
                dic[key] = "fail";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updatePaymentMethods: " + dic[key]);
                }
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updatePaymentMethods: " + dic[key]);
                }
                resolve();
            }
        });
    });
}
exports.updatePaymentMethods = updatePaymentMethods;

var updateDeliveryAddress = function(dic, key, newAddress, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET MailAddr='" + newAddress + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET MailAddr='" + newAddress + "' where AccountID=" + user["customerID"];
        }
        db.query(sql, (err, rows) => {
            if (err) {
                dic[key] = "fail";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateDeliveryAddress: " + dic[key]);
                }
                throw err;
            }
            else {
                dic[key] = "success";
                if (g.logLevel <= g.Level.DEVELOPING) {
                    console.log("updateDeliveryAddress: " + dic[key]);
                }
                resolve();
            }
        });
    });
}
exports.updateDeliveryAddress = updateDeliveryAddress;
