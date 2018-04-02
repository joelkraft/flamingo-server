const express = require("express");
const router = express.Router();

const db = require('../db')

let query = q =>
  new Promise(resolve =>
    db.query(q, (err, res) => {
      if (err) return console.log(err)
      resolve(res.rows)
    })
  )

/* GET animals */
router.get("/", function(req, res, next) {
    query(
        `
            SELECT * FROM animals;
        `,
    ).then(data=> {
        return res.json({data})
    })
            
    // res.json({
    //     data: {
    //         tableData: [
    //             {
    //                 name: "Goat",
    //                 color: "Grey",
    //                 food: "Cardboard",
    //                 size: "Medium"
    //             },
    //             {
    //                 name: "Cat",
    //                 color: "Black",
    //                 food: "Milk",
    //                 size: "Small"
    //             },
    //             {
    //                 name: "Whale",
    //                 color: "Blue",
    //                 food: "Krill",
    //                 size: "Large"
    //             }
    //         ]
    //     }
    // });
});

router.post("/", function(req, res, next) {
    console.log(req.body)
    query(
        `
            INSERT INTO animals (Color, Food, Size, Name)
            VALUES ('${req.body.color}', '${req.body.food}', '${req.body.size}', '${req.body.name}');
        `
    ).then(result=>{
        res.status = 201
        return res.json({message: 'created'})
    }).catch(err => {
        res.status = 500
        return res.json({message: 'There was a server error.'})
    })
    // res.json({
    //     data: req.body
    // });
});

module.exports = router;
