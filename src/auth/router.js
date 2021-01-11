'use strict';
const express = require('express');
const users = require('./models/user-model')
const router = express.Router();
const oauth = require('../auth/middleware/oauth');
const authenticateBasic = require('../auth/middleware/basic')

//routes
router.post('/signup',(req,res)=>{
    users.save(req.body.username)
    .then(user=>{
        users.generateToken(user).then(result=> {
            // console.log(result);
            res.status(200).send(result);
        });
    }).catch(e=> res.status(403).send("creating user error!"));
})

router.post('/signin',authenticateBasic,(req,res)=>{
    res.set('authorization',req.token);
    res.cookie('token',res.token);
res.status(200).send({users:req.users,token:req.token});
})

router.get('/users',authenticateBasic,(req,res)=>{
    users.get().then((result)=>{
        res.json({result})
    })
})

router.get('/oauth',oauth,(req,res)=>{
res.status(200).send(req.token);
})

module.exports =router;