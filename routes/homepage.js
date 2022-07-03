const express = require("express");
const router = express.Router();




router.get('/', (req, res) => {
    console.log(req.headers["user-agent"]);
    res.status(200).json("hello world");
});


module.exports = router;
