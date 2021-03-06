'use strict';


let users = require('../models/user-model');

module.exports = (req, res, next) => {
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




