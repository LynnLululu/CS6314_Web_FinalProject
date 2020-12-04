let db = require('../modules/database');
let g = require('../modules/globals');
let h = require('../modules/hash');

const EMPTYUSER = {
    "category": "anonymous",
    "accountID": -1,
    "email": "",
    "username": "Guest",
    "password": "",
    "details": {}
}

// resolve user
var resolveUser = function(user) {
   if (user === undefined) {
        return EMPTYUSER;
    } else {
        return user;
    }
};
exports.resolveUser = resolveUser;

const ADMINRESERVE = 99;  // maximum AccountID of admin

// get customers by email
var getCustomers = function(dic, key, email) {
    return new Promise((resolve, reject) => {
        let sql = "select * from CUSTOMER";
        if (email !== undefined && email !== "") {
            sql = "select * from CUSTOMER where Email='" + email + "'";
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

// get admins by email
var getAdmins = function(dic, key, email) {
    return new Promise((resolve, reject) => {
        let sql = "select * from ADMIN";
        if (email !== undefined && email !== "") {
            sql = "select * from ADMIN where Email='" + email + "'";
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

// identify user
var identifyUser = function(dic, key, password) {
    return new Promise((resolve, reject) => {
        let admins = dic["admins"];
        let customers = dic["customers"];
        dic[key] = undefined;
        for (let admin of admins) {
            h.compare(password, admin["password"], (flag) => {
                if (flag) {
                    if (g.logLevel <= g.Level.DEVELOPING) {
                        console.log("identifyUser");
                        console.log(admin);
                    }
                    dic[key] = admin;
                    resolve();
                }
            })
        }
        for (let customer of customers) {
            h.compare(password, customer["password"], (flag) => {
                if (flag) {
                    if (g.logLevel <= g.Level.DEVELOPING) {
                        console.log("identifyUser");
                        console.log(customer);
                    }
                    dic[key] = customer;
                    resolve();
                }
            })
        }
    });
};
exports.identifyUser = identifyUser;

// check password
var checkPassword = function(dic, key, input, user) {
    return new Promise((resolve, reject) => {
        let sql = "select Password from CUSTOMER where Email='" + user["email"] + "'";
        if (user["category"] === "admin") {
            sql = "select Password from ADMIN where Email='" + user["email"] + "'";
        }
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                if (rows.length > 0) {
                    h.compare(input, rows[0]['Password'], (flag) => {
                        dic[key] = false;
                        if (g.logLevel <= g.Level.DEVELOPING) {
                            console.log("checkPassword");
                            console.log(dic[key]);
                        }
                        resolve();
                    })
                } else {
                    dic[key] = false;
                    if (g.logLevel <= g.Level.DEVELOPING) {
                        console.log("checkPassword");
                        console.log(dic[key]);
                    }
                    resolve();
                }
            }
        });
    });
};
exports.checkPassword = checkPassword;

var getNextCustomerID = function(dic, key) {
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
        h.hash(password, (hashed) => {
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
                        "password": hashed,
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
        h.hash(newPassword, (hashed) => {
            let sql = "update CUSTOMER SET Password='" + hashed + "' where AccountID=" + user["customerID"];
            if (user["category"] === "admin") {
                sql = "update ADMIN SET Password='" + hashed + "' where AccountID=" + user["adminID"];
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
    });
};
exports.updatePassword = updatePassword;

var updateAccountDetails = function(dic, key, newFName, newLName, newDob, newPhone, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Fname='" + newFName + "', Lname='" + newLName + "', DateOfBirth=" + newDob + ", Phone='" + newPhone + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Fname='" + newFName + "', Lname='" + newLName + "', DateOfBirth=" + newDob + ", Phone='" + newPhone + "' where AccountID=" + user["customerID"];
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

var updatePaymentMethods = function(dic, key, newCard, newEDate, newSCode, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Card='" + newCard + "' ExpCard=" + newEDate + ", SecCode='" + newSCode + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Card='" + newCard + "' ExpCard=" + newEDate + ", SecCode='" + newSCode + "' where AccountID=" + user["customerID"];
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

var updateDeliveryAddress = function(dic, key, newStreet, newCity, newZip, newState, user) {
    return new Promise((resolve, reject) => {
        let sql = "update CUSTOMER SET Street='" + newStreet + "', '" + newCity + "', '" + newZip + "', '" + newState + "' where AccountID=" + user["customerID"];
        if (user["category"] === "admin") {
            sql = "update ADMIN SET Street='" + newStreet + "', '" + newCity + "', '" + newZip + "', '" + newState + "' where AccountID=" + user["customerID"];
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
