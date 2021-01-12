'use strict';
const express = require('express');
const users = require('./models/user-model')
const router = express.Router();
const authenticateBasic = require('../auth/middleware/basic')

router.get('/',(req,res)=>{
    
})