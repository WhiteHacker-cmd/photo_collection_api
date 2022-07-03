const express = require("express");
const jwt = require("jsonwebtoken");

const private_key = process.env.PRIVATE_KEY;
const User = require("../models/User")


const user = async(req, res, next) => {
    const token = req.body?.token || req.cookies.token
    if(!token){
       return res.status(501).send("forbidden request");
    }

    try {

        const decode = jwt.verify(toke, private_key)

        const user = await User.findOne(decode.email);
        req.user = user;
        
        
    } catch(error) {
        res.status(400).json({"msg": "forbidden error"});
    }

    next();
}

module.exports = user;
