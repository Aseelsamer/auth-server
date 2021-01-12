'use strict';

let users = require('../models/user-model');

module.exports = (req, res, next) => {
    // I expect to recieve in the req headers
    // Authorization should be Bearer a$sdadtoejen3ADSD32AsQsf
    if (!req.headers.authorization) {next('not LoggedIn!'); return;}

    let authHeader = req.headers.authorization.split(' ');
    if (authHeader[0] != 'Bearer') {next('invalid Header!'); return;}
    let token = authHeader[1];
    // authenticate the token
    users.acceptToken(token).then(validUser=> {
        console.log("acceptToken : validUser", validUser)
        req.user = validUser;
        next();
    }).catch(err=> next('invalid token !!'))

}

const express = require('express');
const users = require('./models/user-model')
const router = express.Router();
const authenticateBasic = require('../auth/middleware/basic')

router.get('/',(req,res)=>{
    
})

