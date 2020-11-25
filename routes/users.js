var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (g.logLevel <= g.Level.DEBUGGING) {
		console.log("Show user details.");
        g.selectedPrint(mu.resolveUser(req.session.user));
    }
    res.render('tbd', { "user": user });
});

// sign in
router.post('/signin', function(req, res) {
	let email = req.body.emailx;
	let password = req.body.pwdx;
	let asyncFunc = async (email, password) => {
		let results = {}
		let p1 = await mu.getCustomers(results, "customers", email, password);
		let p2 = await mu.getAdmins(results, "admins", email, password);
		return Promise.resolve(results);
	}
	asyncFunc(email, password).then(results => {
		let customers = results["customers"];
        let admins = results["admins"];
        if (admins.length > 0) {
        	req.session.user = admins[0];
        	if (g.logLevel <= g.Level.DEBUGGING) {
                console.log("Sign in as admin.");
                g.selectedPrint(mu.resolveUser(req.session.user));
            }
            res.send(req.session.user);
        } else if (customers.length > 0) {
        	req.session.user = customers[0];
        	if (g.logLevel <= g.Level.DEBUGGING) {
                console.log("Sign in as customer.");
                g.selectedPrint(mu.resolveUser(req.session.user));
            }
            res.send(req.session.user);
        } else {
        	req.session.user = undefined
        	if (g.logLevel <= g.Level.DEBUGGING) {
                console.log("Sign in failed.");
                g.selectedPrint(mu.resolveUser(req.session.user));
            }
            res.send(req.session.user);
        }
	})
});

// check if email already existed
router.post('/check/email', function(req, res) {
	let email = req.body.email;
	let asyncFunc = async (email) => {
		let results = {}
		let p1 = await mu.checkInCUSTOMER(results, "emailsInC", "email", email);
		let p2 = await mu.checkInADMIN(results, "emailsInA", "email", email);
		return Promise.resolve(results);
	}
	asyncFunc(email).then(results => {
		let c = results["inCUSTOMER"];
        let a = results["inADMIN"];
        let flag = true;
        if (a.length > 0) {
        	if (g.logLevel <= g.Level.DEVELOPING) {
                console.log("Email already existed in admins.");
                console.log(a);
            }
            flag = false;
        }
        if (c.length > 0) {
        	if (g.logLevel <= g.Level.DEVELOPING) {
                console.log("Email already existed in customers.");
                console.log(c);
            }
            flag = false;
        }
        res.send(flag);
	})
});

// check if username already existed
router.post('/check/username', function(req, res) {
	let username = req.body.username;
	let asyncFunc = async (username) => {
		let results = {}
		let p1 = await mu.checkInCUSTOMER(results, "usernameInC", "username", username);
		let p2 = await mu.checkInADMIN(results, "usernameInA", "username", username);
		return Promise.resolve(results);
	}
	asyncFunc(username).then(results => {
		let c = results["inCUSTOMER"];
        let a = results["inADMIN"];
        let flag = true;
        if (a.length > 0) {
        	if (g.logLevel <= g.Level.DEVELOPING) {
                console.log("Username already existed in admins.");
                console.log(a);
            }
            flag = false;
        }
        if (c.length > 0) {
        	if (g.logLevel <= g.Level.DEVELOPING) {
                console.log("Username already existed in customers.");
                console.log(c);
            }
            flag = false;
        }
        res.send(flag);
	})
});

// check if input password fits original password in database
router.post('/check/password', function(req, res) {
	let input = req.body.password;
	let user = req.session.user;
	let asyncFunc = async (input, user) => {
		let results = {}
		let p1 = await mu.getPassword(results, "original", input, user);
		return Promise.resolve(results);
	}
	asyncFunc(input, user).then(results => {
		let original = results["original"];
		if (g.logLevel <= g.Level.DEVELOPING) {
            console.log("Input: " + input);
            console.log("Original" + original);
            console.log(input == original);
        }
        res.send(input == original);
	})
});

router.post('/signup', function(req, res) {
	let email = req.body.email;
	let username = req.body.userName;
	let password = req.body.pwd;
	let asyncFunc = async (email, username, password) => {
		let exists = {}
		let p1 = await mu.checkInCUSTOMER(exists, "emailsInC", "email", email);
		let p2 = await mu.checkInADMIN(exists, "emailsInA", "email", email);
		let p3 = await mu.checkInCUSTOMER(exists, "usernamesInC", "username", username);
		let p4 = await mu.checkInADMIN(exists, "usernameInA", "username", username);
		if (exists["emailsInC"].length > 0 ||
			exists["emailsInA"].length > 0 ||
			exists["usernamesInC"].length > 0 ||
			exists["usernameInA"].length > 0) {
			return Promise.reject(exists);
		}
		let results = {};
		let p5 = await mu.getNextCustomerID(results, "newID");
		let newID = results["newID"];
		let p6 = await mu.createCustomer(results, "newCustomer", newID, email, username, password);
		return Promise.resolve(results);
	}
	asyncFunc(email, username, password).then(results => {
		let newCustomer = results["newCustomer"];
    	req.session.user = newCustomer;
    	if (g.logLevel <= g.Level.TESTING) {
            console.log(results);
        }
    	if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Sign up as customer.");
            g.selectedPrint(mu.resolveUser(req.session.user));
        }
        res.send(req.session.user);
    }, (exists) => {  // sign up fail, set user to anonymous
		req.session.user = undefined;
		if (g.logLevel <= g.Level.TESTING) {
            console.log(exists);
        }
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Sign up failed.");
            g.selectedPrint(mu.resolveUser(req.session.user));
        }
        res.send(req.session.user);
	});
});

router.post('/signout', function(req, res) {
	req.session.user = undefined;
    if (g.logLevel <= g.Level.DEBUGGING) {
		console.log("Sign out.");
        g.selectedPrint(mu.resolveUser(req.session.user));
    }
    res.send(req.session.user);
});

router.post('/update/username', function(req, res) {
	let newUsername = req.body.newUsername;
	let user = req.session.user;
	let asyncFunc = async (newUsername, user) => {
		let exists = {}
		let p1 = await mu.checkInCUSTOMER(exists, "usernamesInC", "username", newUsername);
		let p2 = await mu.checkInADMIN(exists, "usernameInA", "username", newUsername);
		if (exists["usernamesInC"].length > 0 ||
			exists["usernameInA"].length > 0) {
			return Promise.reject(exists);
		}
		let results = {};
		let p3 = await mu.updatePassword(results, "state", newUsername, user);
		return Promise.resolve(results);
	}
	asyncFunc(newUsername, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Change username " + results["state"] + ".");
        }
        res.send(results["state"]);
    }, (exists) => {  // sign up fail, set user to anonymous
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Username existed.");
        }
        res.send("existed");
	});
});

router.post('/update/password', function(req, res) {
	let newPassword = req.body.newPwd;
	let user = req.session.user;
	if (user === undefined || user["category"] === "anonymous") {
		res.send("Guest has no password");
	}
	let asyncFunc = async (newPassword, user) => {
		let results = {}
		let p1 = await mu.updatePassword(results, "state", newPassword, user);
		return Promise.resolve(results);
	}
	asyncFunc(newPassword, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Change password " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

router.post('/update/account', function(req, res) {
	let newFName = req.body.newFName;
	let newLName = req.body.newLName;
	let newDob = req.body.newDob;
	let newPhone = req.body.newPhone;
	let user = req.session.user;
	if (user === undefined || user["category"] === "anonymous") {
		res.send("Guest has no account details.");
	}
	let asyncFunc = async (newFName, newLName, newDob, newPhone, user) => {
		let results = {}
		let p1 = await mu.updateAccountDetails(results, "state", newFName, newLName, newDob, newPhone, user);
		return Promise.resolve(results);
	}
	asyncFunc(newFName, newLName, newDob, newPhone, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update account details " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

router.post('/update/payment', function(req, res) {
	let newPayment = req.body.newPayment;
	let user = req.session.user;
	if (user === undefined || user["category"] !== "customer") {
		res.send("Guest or admin has no payment methods.");
	}
	let asyncFunc = async (newFName, newLName, newDob, user) => {
		let results = {}
		let p1 = await mu.updatePaymentMethods(results, "state", newPayment, user);
		return Promise.resolve(results);
	}
	asyncFunc(newFName, newLName, newDob, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update payment methods " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

router.post('/update/address', function(req, res) {
	let newAddress = req.body.newAddress;
	let user = req.session.user;
	if (user === undefined || user["category"] !== "customer") {
		res.send("Guest or admin has no delivery address.");
	}
	let asyncFunc = async (newFName, newLName, newDob, user) => {
		let results = {}
		let p1 = await mu.updateDeliveryAddress(results, "state", newAddress, user);
		return Promise.resolve(results);
	}
	asyncFunc(newFName, newLName, newDob, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update delivery address " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

module.exports = router;
