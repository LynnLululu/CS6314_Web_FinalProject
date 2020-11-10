let db = require('../modules/database');

// log level control
const Level = {
    DEVELOPING: 0,
    DEBUGGING: 1,
    OPERATING: 2,
}
var logLevel =  Level.DEVELOPING;
exports.Level = Level;
exports.logLevel = logLevel;

// set dirty to nofity that this obj needs to be update before using.
var setDirty = function(obj) {
    if (obj["isDirty"] != null) {
        obj["isDirty"] = false;
    }
};
exports.setDirty = setDirty;

// products
var _products = { "isDirty" : false , "data" : [] };
var getProducts = new Promise((resolve, reject) => {
    if (_products["isDirty"] == false) {
        let sql = "select * from PRODUCT";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                _products["data"] = [];
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
                    _products["data"].push(tmp);
                }
                _products["isDirty"] = true;
                if (logLevel <= Level.OPERATING) {
                    console.log("Get products:");
                }
                if (logLevel <= Level.DEBUGGING) {
                    console.log(_products["data"]);
                }
                resolve(_products["data"]);
            }
        });
    }
});
exports.getProducts = getProducts;

// catagories
var _catagories = { "isDirty" : false , "data" : [] };
var getCatagories = new Promise((resolve, reject) => {
    if (_catagories["isDirty"] == false) {
        let sql = "select * from CATAGORY";
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                _catagories["data"] = [];
                for (let elem of rows) {
                    let tmp = {};
                    tmp["catagoryID"] = elem['CatagoryID'];
                    tmp["catagoryName"] = elem['Name'];
                    _catagories["data"].push(tmp);
                }
                _catagories["isDirty"] = true;
                if (logLevel <= Level.OPERATING) {
                    console.log("Get catagories:");
                }
                if (logLevel <= Level.DEBUGGING) {
                    console.log(_catagories["data"]);
                }
                resolve(_catagories["data"]);
            }
        });
    }
});
exports.getCatagories = getCatagories;
