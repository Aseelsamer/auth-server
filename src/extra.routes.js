'use strict';

const bearerMiddleware= require('./auth/middleware/bearer-auth')
const router = require('./auth/router');

router.get('/secret', bearerMiddleware, (req,res) => {
    res.status(200).json(req.user);
} );

module.exports=router;