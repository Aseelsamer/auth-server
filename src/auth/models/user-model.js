
'use strict';

let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let SECRET = 'hello';
const schema = require('./schema');
const Model = require('../mongo');


class Users extends Model {

    constructor() {
        super(schema);
    }

//save method 
    async save(record) {
    //username & password
    let result = await this.get({username:record.username})
    if (!result[record.username]) {
       return this.create(record)//the save should return the record
    }

    return Promise.reject();

}

async authenticateBasic(user, pass) {
   let result = await this.get({username:user});
    if (result) {
        // compare the password text with the encrypted password 
        return await bcrypt.compare(pass, result[0].password);
    }
    return Promise.reject();
}

async generateToken(user) {
    let token = await jwt.sign({username: user.username}, SECRET);
    return token;
}

}

module.exports = new Users;