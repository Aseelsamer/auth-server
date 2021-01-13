
'use strict';

let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let SECRET = 'hello';
const schema = require('./schema');
const Model = require('../mongo');

let roles = {
    user: ['read'],
    editor: ['read', 'create', 'add'],
    admin: ['read', 'create', 'add', 'delete']
};


class Users extends Model {

    constructor() {
        super(schema);
    }

// save method 
async save(record) {
        console.log('***************************',record);
    //username & password
    let result = await this.get({username:record.username})
    console.log('result',result);
    if (result.length === 0) {
        record.password = await bcrypt.hash(record.password,5);
        console.log('record',record);
        let x =await  this.create(record)
        console.log('------------------------',x);
       return x;//the save should return the record
    }

    return Promise.reject();

}

async authenticateBasic(user, pass) {
   let result = await this.get({user});
   console.log('authentication',result);
    if (result) {
        console.log('result',result)
        return await bcrypt.compare(pass, result.password);
    }
    return Promise.reject();
}

async generateToken(user) {
    let token = jwt.sign({
        username: user.username,
        capabilities: roles[user.role]
    }, SECRET);
    return token;
}

async acceptToken(token){
try{
    let tokenObject = await jwt.verify(token,SECRET);
    console.log('tokenObject',tokenObject);
    return tokenObject.username ? Promise.resolve(tokenObject): Promise.reject();
}catch (err){
    return Promise.reject();
}

}

//can(permission)

can(permission){
    if(permission){
        return true;
    }else{
        return false;
    }
}
}

module.exports = new Users;