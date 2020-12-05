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
    res.status(200).render('tbd', { "user": user });
});

// sign in
router.post('/signin', function(req, res) {
	let email = req.body.emailx;
	let password = req.body.pwdx;
	if (!email || !password) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/signin");
        }
        res.status(400).send("Unvalid input in post users/signin");
	} else {
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
	        res.status(200).redirect('/products');
		})
	}
});

// check if email already existed
router.post('/check/email', function(req, res) {
	let email = req.body.email;
	if (!email) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/check/email");
        }
        res.status(400).send("Unvalid input in post users/check/email");
	} else {
		let asyncFunc = async (email) => {
			let results = {}
			let p1 = await mu.checkInCUSTOMER(results, "emailsInC", "email", email);
			let p2 = await mu.checkInADMIN(results, "emailsInA", "email", email);
			return Promise.resolve(results);
		}
		asyncFunc(email).then(results => {
			let c = results["inCUSTOMER"];
	        let a = results["inADMIN"];
	        if (a.length > 0) {
	        	if (g.logLevel <= g.Level.DEVELOPING) {
	                console.log("Email already existed in admins");
	                console.log(a);
	            }
	            res.status(400).send("Email already existed in admins");
	        }
	        if (c.length > 0) {
	        	if (g.logLevel <= g.Level.DEVELOPING) {
	                console.log("Email already existed in customers");
	                console.log(c);
	            }
	            res.status(400).send("Email already existed in customers");
	        }
	        res.status(200).send("Email available");
		})
	}
});

// check if username already existed
router.post('/check/username', function(req, res) {
	let username = req.body.username;
	if (!username) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/check/username");
        }
        res.status(400).send("Unvalid input in post users/check/username");
	} else {
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
	                console.log("Username already existed in admins");
	                console.log(a);
	            }
	            res.status(400).send("Username already existed in admins");
	        }
	        if (c.length > 0) {
	        	if (g.logLevel <= g.Level.DEVELOPING) {
	                console.log("Username already existed in customers");
	                console.log(c);
	            }
	            res.status(400).send("Username already existed in customers");
	        }
	        res.status(200).send("Username available");
		})
	}
});

// check if input password fits original password in database
router.post('/check/password', function(req, res) {
	let input = req.body.password;
	let user = mu.resolveUser(req.session.user);
	if (!input) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/check/password");
        }
        res.status(400).send("Unvalid input in post users/check/password");
	} else if (user["category"] == "anonymous") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Guest has not password");
        }
        res.status(400).send("Guest has not password");
	} else {
		let asyncFunc = async (input, user) => {
			let results = {}
			let p1 = await mu.checkPassword(results, "flag", input, user);
			return Promise.resolve(results);
		}
		asyncFunc(input, user).then(results => {
			if (results["flag"]) {
				if (g.logLevel <= g.Level.DEVELOPING) {
	                console.log("Compare password with " + input + " success");
	            }
	            res.status(200).send("Compare password with " + input + " success");
			} else {
				if (g.logLevel <= g.Level.DEVELOPING) {
	                console.log("Compare password with " + input + " fail");
	            }
	            res.status(400).send("Compare password with " + input + " fail");
			}
		})
	}
});

router.post('/signup', function(req, res) {
	let email = req.body.email;
	let username = req.body.userName;
	let password = req.body.pwd;
	if (!email || !username || !password) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/signup");
        }
        res.status(400).send("Unvalid input in post users/signup");
	} else {
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
	        res.status(200).redirect('/products');
	    }, (exists) => {  // sign up fail, set user to anonymous
			req.session.user = undefined;
			if (g.logLevel <= g.Level.OPERATING) {
	            console.log("Sign up failed.");
	            g.selectedPrint(mu.resolveUser(req.session.user));
	        }
	        res.status(400).redirect('/products');
		});
	}
});

router.post('/signout', function(req, res) {
	req.session.user = undefined;
    if (g.logLevel <= g.Level.OPERATING) {
		console.log("Sign out.");
        g.selectedPrint(mu.resolveUser(req.session.user));
    }
    res.status(200).redirect('/products');
});

router.post('/update/username', function(req, res) {
	let newUsername = req.body.newUsername;
	let user = mu.resolveUser(req.session.user);
	if (!newUsername) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/update/username");
        }
        res.status(400).send("Unvalid input in post users/update/username");
	} else if (user["category"] == "anonymous") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Guest has not username");
        }
        res.status(400).send("Guest has not username");
	} else {
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
			if (results["state"]) {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Change username to " + newUsername + " success");
		        }
	        	res.status(200).send("Change username to " + newUsername + " success");
	        } else {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Change username to " + newUsername + " fail");
		        }
	        	res.status(400).send("Change username to " + newUsername + " fail");
	        }
	    }, (exists) => {  // sign up fail, set user to anonymous
			if (g.logLevel <= g.Level.DEBUGGING) {
	            console.log("Fail for username existed");
	        }
	        res.status(400).send("Fail for username existed");
		});
	}
});

router.post('/update/password', function(req, res) {
	let newPassword = req.body.newPwd;
	let user = mu.resolveUser(req.session.user);
	if (!newPassword) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/update/password");
        }
        res.status(400).send("Unvalid input in post users/update/password");
	} else if (user["category"] == "anonymous") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Guest has not password");
        }
        res.status(400).send("Guest has not password");
	} else {
		let asyncFunc = async (newPassword, user) => {
			let results = {}
			let p1 = await mu.updatePassword(results, "state", newPassword, user);
			return Promise.resolve(results);
		}
		asyncFunc(newPassword, user).then(results => {
			if (results["state"]) {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Change password to " + newPassword + " success");
		        }
	        	res.status(200).send("Change password to " + newPassword + " success");
	        } else {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Change password to " + newPassword + " fail");
		        }
	        	res.status(400).send("Change password to " + newPassword + " fail");
	        }
		})
	}
});

router.post('/update/account', function(req, res) {
	let newFName = req.body.newFName;
	let newLName = req.body.newLName;
	let newDob = req.body.newDob;
	let newPhone = req.body.newPhone;
	let user = mu.resolveUser(req.session.user);
	if (!newFName || !newLName || !newDob || !newPhone) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/update/account");
        }
        res.status(400).send("Unvalid input in post users/update/account");
	} else if (user["category"] == "anonymous") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Guest has not account details");
        }
        res.status(400).send("Guest has not account details");
	} else {
		let asyncFunc = async (newFName, newLName, newDob, newPhone, user) => {
			let results = {}
			let p1 = await mu.updateAccountDetails(results, "state", newFName, newLName, newDob, newPhone, user);
			return Promise.resolve(results);
		}
		asyncFunc(newFName, newLName, newDob, newPhone, user).then(results => {
			if (results["state"]) {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update account details success");
		        }
	        	res.status(200).send("Update account details success");
	        } else {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update account details fail");
		        }
	        	res.status(400).send("Update account details fail");
	        }
		})
	}
});

router.post('/update/payment', function(req, res) {
	let newCard = req.body.newCard;
	let newEDate = req.body.newEDate;
	let newSCode = req.body.newSCode;
	let user = mu.resolveUser(req.session.user);
	if (!newCard || !newEDate || !newSCode) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/update/payment");
        }
        res.status(400).send("Unvalid input in post users/update/payment");
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have payment methods");
        }
        res.status(400).send("Only customers have payment methods");
	} else {
		let asyncFunc = async (newCard, newEDate, newSCode, user) => {
			let results = {}
			let p1 = await mu.updatePaymentMethods(results, "state", ewCard, newEDate, newSCode, user);
			return Promise.resolve(results);
		}
		asyncFunc(newCard, newEDate, newSCode, user).then(results => {
			if (results["state"]) {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update payment methods success");
		        }
	        	res.status(200).send("Update payment methods success");
	        } else {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update payment methods fail");
		        }
	        	res.status(400).send("Update payment methods fail");
	        }
		})
	}
});

router.post('/update/address', function(req, res) {
	let newStreet = req.body.newStreet;
	let newCity = req.body.newCity;
	let newZip = req.body.newZip;
	let newState = req.body.newState;
	let user = mu.resolveUser(req.session.user);
	if (!newStreet || !newCity || !newZip || !newState) {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Unvalid input in post users/update/address");
        }
        res.status(400).send("Unvalid input in post users/update/address");
	} else if (user["category"] != "customer") {
		if (g.logLevel <= g.Level.OPERATING) {
            console.log("Only customers have delivery address");
        }
        res.status(400).send("Only customers have delivery address");
	} else {
		let asyncFunc = async (newStreet, newCity, newZip, newState, user) => {
			let results = {}
			let p1 = await mu.updateDeliveryAddress(results, "state", newStreet, newCity, newZip, newState, user);
			return Promise.resolve(results);
		}
		asyncFunc(newStreet, newCity, newZip, newState, user).then(results => {
			if (results["state"]) {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update delivery address success");
		        }
	        	res.status(200).send("Update delivery address success");
	        } else {
	        	if (g.logLevel <= g.Level.DEBUGGING) {
		            console.log("Update delivery address fail");
		        }
	        	res.status(400).send("Update delivery address fail");
	        }
		})
	}
});

module.exports = router;
