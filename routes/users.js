var express = require('express');
var router = express.Router();

var g = require('../modules/globals');
var mu = require('../modules/m_user');

router.get('/', function(req, res) {
	let user = mu.resolveUser(req.session.user);
	if (g.logLevel <= g.Level.DEBUGGING) {
		console.log("Show user details. 'tbd':");
        g.selectedPrint(mu.resolveUser(req.session.user));
    }
    res.render('user', { "user": user });
});

// sign in
router.post('/signin', function(req, res) {
	console.log("####Signin");
	let email = req.body.emailx;
	let password = req.body.pwdx;
	if (!email || !password) {
		res.send("Unvalid input in post users/signin.")
	}
	let asyncFunc = async (email, password) => {
		let results = {}
		let p1 = await mu.getCustomers(results, "customers", email);
		let p2 = await mu.getAdmins(results, "admins", email);
		let p3 = await mu.identifyUser(results, "user", password);
		return Promise.resolve(results);
	}
	asyncFunc(email, password).then((results) => {
		req.session.user = results["user"];
		if (g.logLevel <= g.Level.OPERATING) {
			if (req.session.user === undefined || req.session.user["category"] === "anonymous") {
				console.log("Sign in failed.");
			} else {
				console.log("Sign in as " + req.session.user["category"] + ".");
			}
            g.selectedPrint(mu.resolveUser(req.session.user));
        }
        res.redirect('/products');
	})
});

// check if email already existed
router.post('/check/email', function(req, res) {
	let email = req.body.email;
	if (!email) {
		res.send("Unvalid input in post users/check/email.")
	}
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
	if (!username) {
		res.send("Unvalid input in post users/check/username.")
	}
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
	if (!input) {
		res.send("Unvalid input in post users/check/password.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
		res.send("Guest or admin has no password.");
	}
	let asyncFunc = async (input, user) => {
		let results = {}
		let p1 = await mu.checkPassword(results, "flag", input, user);
		return Promise.resolve(results);
	}
	asyncFunc(input, user).then(results => {
		let flag = results["flag"];
		if (g.logLevel <= g.Level.DEVELOPING) {
            console.log("Input password: " + input);
            console.log(flag);
        }
        res.send(flag);
	})
});

router.post('/signup', function(req, res) {
	console.log("####Signup");
	let email = req.body.email;
	let username = req.body.userName;
	let password = req.body.pwd;
	if (!email || !username || !password) {
		res.send("Unvalid input in post users/signup.")
	}
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
    	if (g.logLevel <= g.Level.OPERATING) {
            console.log("Sign up as customer.");
            g.selectedPrint(mu.resolveUser(req.session.user));
        }
        res.redirect('/products');
    }, (exists) => {  // sign up fail, set user to anonymous
		req.session.user = undefined;
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Sign up failed.");
            g.selectedPrint(mu.resolveUser(req.session.user));
        }
        res.redirect('/products');
	});
});

router.post('/signout', function(req, res) {
	req.session.user = undefined;
    if (g.logLevel <= g.Level.OPERATING) {
		console.log("Sign out.");
        g.selectedPrint(mu.resolveUser(req.session.user));
    }
    res.redirect('/products');
});

router.post('/update/username', function(req, res) {
	let newUsername = req.body.newUsername;
	if (!newUsername) {
		res.send("Unvalid input in post users/update/username.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] === "anonymous") {
		res.send("Guest has no username");
	}
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
        res.send(true);
    }, (exists) => {  // sign up fail, set user to anonymous
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Username existed.");
        }
        res.send(false);
	});
});

router.post('/update/password', function(req, res) {
	let newPassword = req.body.newPwd;
	if (!newPassword) {
		res.send("Unvalid input in post users/update/password.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] === "anonymous") {
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
	if (!newFName || !newLName || !newDob || !newPhone) {
		res.send("Unvalid input in post users/update/account.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] === "anonymous") {
		res.send("Guest has no account details");
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
	let newCard = req.body.newCard;
	let newEDate = req.body.newEDate;
	let newSCode = req.body.newSCode;
	if (!newCard || !newEDate || !newSCode) {
		res.send("Unvalid input in post users/update/payment.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
		res.send("Only Customer has payment methods");
	}
	let asyncFunc = async (newCard, newEDate, newSCode, user) => {
		let results = {}
		let p1 = await mu.updatePaymentMethods(results, "state", ewCard, newEDate, newSCode, user);
		return Promise.resolve(results);
	}
	asyncFunc(newCard, newEDate, newSCode, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update payment methods " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

router.post('/update/address', function(req, res) {
	let newStreet = req.body.newStreet;
	let newCity = req.body.newCity;
	let newZip = req.body.newZip;
	let newState = req.body.newState;
	if (!newStreet || !newCity || !newZip || !newState) {
		res.send("Unvalid input in post users/update/address.")
	}
	let user = mu.resolveUser(req.session.user);
	if (user["category"] !== "customer") {
		res.send("Only Customer has delivery address");
	}
	let asyncFunc = async (newStreet, newCity, newZip, newState, user) => {
		let results = {}
		let p1 = await mu.updateDeliveryAddress(results, "state", newStreet, newCity, newZip, newState, user);
		return Promise.resolve(results);
	}
	asyncFunc(newStreet, newCity, newZip, newState, user).then(results => {
		if (g.logLevel <= g.Level.DEBUGGING) {
            console.log("Update delivery address " + results["state"] + ".");
        }
        res.send(results["state"]);
	})
});

module.exports = router;
