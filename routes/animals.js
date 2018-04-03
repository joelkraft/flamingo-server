const express = require("express");
const router = express.Router();

const db = require('../db')

let query = (q, params) =>
  new Promise(resolve =>
    params
    ? db.query(q, params, (err, res) => {
        if (err) return console.log(err)
        resolve(res)
    })
    : db.query(q, (err, res) => {
      if (err) return console.log(err)
      resolve(res.rows)
    })
  )

router.get("/", function(req, res, next) {
    query(
        `
            SELECT * FROM animals;
        `,
    ).then(data=> {
        return res.json({data})
    })
})

router.post("/", function(req, res, next) {
    const values = ['color', 'food', 'size', 'name'].map(key=> req.body[key])
    query(
        `
            INSERT INTO animals (Color, Food, Size, Name)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `,
        values
    ).then(result=>{
        res.status(201)
        return res.json({message: 'created', id: result.rows[0].id})
    }).catch(err => {
        console.log(err)
        res.status(500)
        return res.json({message: 'There was a server error.'})
    })
})

router.put("/:id", function(req, res, next) {
    const columns = Object.keys(req.body)
    query(
        `
            UPDATE animals
            SET ${columns.map((key)=>`${key} = '${req.body[key]}'`).join(',')}
            WHERE id = $1;
        `,
        [req.params.id]
    ).then(result=>{
        res.status(200)
        return res.json({message: 'updated'})
    }).catch(err => {
        console.log(err)
        res.status(500)
        return res.json({message: 'There was a server error.'})
    })
})

router.delete("/:id", function(req, res, next) {
    query(
        `
            DELETE FROM animals
            WHERE id = ($1);
        `,
        [req.params.id]
    ).then(result=>{
        res.status(200)
        return res.json({message: 'deleted'})
    }).catch(err => {
        console.log(err)
        res.status(500)
        return res.json({message: 'There was a server error.'})
    })
})
module.exports = router;
