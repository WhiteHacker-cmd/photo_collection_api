const express = require("express");

const router = express.Router();


const user = require("../middleware/authentication")

router.use(user);

router.get('/', (req, res)=> {
    res.status(200).json({"msg": "dashboard"});
});

router.route('/:id')
.get((req, res) => {

})
.post((req, res) => {

})
.put((req, res) => {

})


module.exports = router;