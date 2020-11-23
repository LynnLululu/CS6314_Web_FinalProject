var express = require('express');
var router = express.Router();

var g = require('../modules/globals');

router.post('/', function(req, res) {
	let user = g.resolveUser(req.session.user);
	if (g.logLevel <= g.Level.DEBUGGING) {
        g.selectedPrint("Show user information", user);
    }
    res.send(user);
});

router.post('/signin', function(req, res) {
	let promises = [];
	promises.push(g.sessionForSignIn(req.body.emailx, req.body.pwdx));
	Promise.all(promises).then(function(results) {
		let user = g.resolveUser(results[0]);
		req.session.user = user;
		if (g.logLevel <= g.Level.OPERATING) {
			if (user === undefined) {
				console.log("Wrong email or password.");
			} else {
				g.selectedPrint("Success", user);
			}
        }
        res.send(user);
	});
});

router.post('/checkusername', function(req, res) {
	let promises = [];
	promises.push(g.checkUsername(req.body.userName));
	Promise.all(promises).then(function(results) {
		let user = g.resolveUser(results[0]);
		req.session.user = user;
		if (g.logLevel <= g.Level.OPERATING) {
			g.selectedPrint("Success", user);
        }
        res.send(user);
	});
});

router.post('/signup', function(req, res) {
	let promises = [];
	promises.push(g.sessionForSignUp(req.body.userName, req.body.email, req.body.pwd));
	Promise.all(promises).then(function(results) {
		let user = g.resolveUser(results[0]);
		req.session.user = user;
		if (g.logLevel <= g.Level.OPERATING) {
			g.selectedPrint("Success", user);
        }
        res.send(user);
	});
});

router.post('/signout', function(req, res) {
	if (g.logLevel <= g.Level.OPERATING) {
        g.selectedPrint("Sign out", req.session.user);
    }
    req.session.user = undefined;
    res.send(g.resolveUser(undefined));
});

router.post('/changepwd', function(req, res) {
	let promises = [];
	promises.push(g.sessionForChangePwd(req.body.newPwd, req.session.user));
	Promise.all(promises).then(function(results) {
		let state = g.resolveUser(results[0]);
		req.session.user["password"] = newPwd;
		if (g.logLevel <= g.Level.DEBUGGING) {
			g.selectedPrint("Change password", state == "success" ? "success" : "fail");
        }
        res.send(user);
	});
});

module.exports = router;
