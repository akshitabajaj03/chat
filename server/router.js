const express = require("express");
const router = express.Router();

router.get('/', async(req,res) =>{
    res.send('Server is up and running')
})

module.exports = router;