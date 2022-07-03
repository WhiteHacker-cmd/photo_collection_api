
const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const private_key = process.env.PRIVATE_KEY;

const userAuth = require("../middleware/authentication");
const User = require("../models/User");




router.post('/register', async(req, res) =>{
    if(req.body.first_name == null || req.body.first_name == "" || req.body.last_name == null || req.body.last_name == "" || req.body.email == null && req.body.email == "" ||
    req.body.password == null || req.body.password == ""){
        res.status(400).json({"msg": "data is missing"});
        return;
    }
    
    const is_user_existed = await User.findOne({"email": req.body.email})
    if(is_user_existed != null){
        res.status(400).json({"msg":"email already existed"});
        return
    }
    if((req.body.password).length < 8){
        res.status(400).json({"msg": "password is short.Password must be atleast length of 8"});
        return;
    }


    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    userData.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(userData)

    const token = jwt.sign({
        email: user.email,
        first_name: user.first_name
    },private_key)
    res.cookie("token", token)
    res.status(301).json({"msg": "registration successful"});

});

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(req.body.email == null || req.body.email == ""){
        res.send(400).json({"msg": "enter email"})
        return;
    }

    if(req.body.password == null || req.body.password == ""){
        res.send(400).json({"msg": "enter password"})
        return;
    }


    const user = await User.findOne({email});

    if(user == null){
        res.status(400).json({"msg": "invalid email"})
        return
    }

    if(!(await bcrypt.compare(password, user.password))){
        res.status(400).json({"msg": "invalid password"});
    }

    const token = jwt.sign({
        email: user.email,
        first_name: user.first_name
    },private_key)
    res.cookie("token", token)
    res.status(301).json({"msg": "login successed"})
});
router.get('/login', (req, res) => {
    res.render("login")
})


router.get('/logout', userAuth, (req, res) => {
    req.user = null;
    res.clearCookie("token")
    return res.status(200).json({"msg": "logout successful"})
})





module.exports = router;
