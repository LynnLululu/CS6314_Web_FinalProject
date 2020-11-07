var express = require('express');
var router = express.Router();

let db = require('../modules/database');

router.get('/', function(req, res) {
    let sql = "select * from PRODUCT";
    let array = [];
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            for (let elem of rows) {
                let tmp = {};
                tmp["productID"] = elem['ProductID'];
                tmp["productName"] = elem['Name'];
                tmp["productPrice"] = elem['Price'];
                tmp["description"] = elem['Description'];
                tmp["image"] = elem['Image'];
                tmp["num"] = elem['Num'];
                tmp["visible"] = elem['Visible'];
                array.push(tmp);
            }
            let jobj = {};
            jobj["products"] = array;
            res.json(jobj);
        };
    });
    //res.send("Success!");
});

module.exports = router;