'use strict';

require('dotenv').config();
const server = require('../auth-server/src/server');
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/oauth" ;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
server.start();