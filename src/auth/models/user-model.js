
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

// save method 
async save(record) {
        console.log('***************************',record);
    //username & password
    let result = await this.get({username:record.username})
    console.log(result);
    if (result.length === 0) {
        record.password = await bcrypt.hash(record.password,5);
        console.log(record);
        let x =await  this.create(record)
        console.log('------------------------',x);
       return x;//the save should return the record
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

async bearerMiddleware(){
    
}

}

module.exports = new Users;