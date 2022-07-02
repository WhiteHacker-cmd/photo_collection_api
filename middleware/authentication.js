const express = require("express");


const user = (req, res, next) => {
    const token = req.body?.token || req.cookies.token
    if(!token){
       return res.status(501).send("forbidden request");
    }

    try {

        
        
    } catch(error) {
        res.status(400).json({"msg": "forbidden error"});
    }

    next();
}

module.exports = user;
