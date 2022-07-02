
const express = require("express")

const router = express.Router();

import user from "../middleware/authentication"




router.post('/register', (req, res) =>{});

router.post('/login', (req, res) => {
    const body = req.body;

    if(!(body?.email && body?.password)){
        return res.status(301).json({"msg": "data is missing"});
    }
    res.status(301).json({"msg": "login successed"})
});


router.get('/logout', user, (req, res) => {
    return res.status(200).json({"msg": "logout successful"})
})





module.exports = router;
