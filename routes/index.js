var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.json({
        data: {
            tableData: [
                {
                    name: "Goat",
                    color: "Grey",
                    food: "Cardboard",
                    size: "Medium"
                }
            ]
        }
    });
});

module.exports = router;
