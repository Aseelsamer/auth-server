'use strict';

const mongoose = require('mongoose');

const users = mongoose.Schema({
    username: {type:String , required:true},
    password : {type:Number , required:true}
});

module.exports = mongoose.model('Users', users);