'use strict';

const express= require('express');
const cors=require('cors');
const morgan = require('morgan');
const server=express();
const router=require('./auth/router');

server.use(express.json());
 server.use(cors());
 server.use(morgan('dev'));
 server.use('/',router);


module.exports={
    server:server,
    start:port =>{
        let PORT=port||process.env.PORT||4000;
        server.listen(PORT,()=>console.log(`listening on ${PORT}`));
    }
};