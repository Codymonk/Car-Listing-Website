let express = require('express');
let router = express.Router();
let con = require('../config/db');
router.get("/", (req, res) => {

    con.query('SELECT * from carlistdata', (err, rows)=> {
        if (err) throw err;
        res.render("index", {
            fname: rows
        })

    })
})

router.get("/form", (req, res) => {
    con.query('SELECT * from carlistdata',  (err, rows)=> {
        if (err) throw err;
        res.render("form", {
            formDB: rows
        })
    });
});
module.exports = router;