var express = require('express');
var router = express.Router();
let db = require('../modules/database');
var async = require('async');

var readTime = function(dic) {
    return new Promise((resolve, reject) => {
        let sqls = [
            "select DateOfBirth from CUSTOMER",
        ]
        async.eachSeries(sqls, function(sql, callback) {
            db.query(sql, (err, rows) => {
                console.log(rows);
                if (err) {
                    callback(err);
                } else {
                    dic[sql] = rows;
                    callback();
                }
            });
        }, function(err) {  // callback after all queries
            if (err) {
                console.log(err);
                throw err;
            } else {
                resolve();
            }
        });
    });
};

var translateTime = function(sqlresults, afterTranslation) {
    return new Promise((resolve, reject) => {
        let rows = sqlresults["select DateOfBirth from CUSTOMER"];
        for (let elem of rows) {
            let time = elem["DateOfBirth"];
            afterTranslation.push(time);
            afterTranslation.push(time.toLocaleDateString('en-US'));
            afterTranslation.push(Date.parse(time.toLocaleDateString('en-US')));
        }
        resolve();
    });
};

// date format
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// 
router.get('/', function(req, res) {
    let asyncFunc = async () => {
        let sqlresults = {};
        let afterTranslation = [];
        let p1 = await readTime(sqlresults);
        let p2 = await translateTime(sqlresults, afterTranslation);
        return Promise.resolve(afterTranslation);
    }
    asyncFunc().then(results => {
        res.send(results);
    })
});

module.exports = router;