'use strict';

const base64 = require('base-64');
const users = require('../models/user-model');


module.exports = (req, res, next)=> {
    console.log('req.headers',req.headers);
    //check 
    if (!req.headers.authorization)  {
        next('invaid login');
        return;
    }
    let authHeader = req.headers.authorization.split(" ");
    console.log('auth header',authHeader);
    if (authHeader[0] != "Basic") {
        next('invaid');
        return; 
    }
    let basic = authHeader.pop();
    let [username, password] = base64.decode(basic).split(":");//i have them now i wanto to validate if it is correct or not
    console.log('username and password',username , password)
    users.authenticateBasic(username, password).then(verified=>{
        req.users=verified;
        console.log('verified',verified);
        users.generateToken(verified).then(generatedToken=> {
            req.token = generatedToken; 
            console.log('generatedToke',generatedToken);
            next();
        }).catch(err=> next('error in Token!'))
    
    }).catch(err=> next('Cannot log in !'))

}