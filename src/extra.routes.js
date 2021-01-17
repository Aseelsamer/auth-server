'use strict';

const bearerMiddleware= require('./auth/middleware/bearer-auth')
const router = require('./auth/router');
const permissions =require('./auth/middleware/authorize');

router.get('/secret', bearerMiddleware, (req,res) => {
    res.status(200).json(req.user);
} );

app.get('/read', bearerMiddleware, permissions('read'), (req,res)=>{
    res.status(200).send('you can access it always')
})
app.post('/add', bearerMiddleware, permissions('create'), (req,res)=>{
    res.status(200).send('you can add')
})

app.put('/change', bearerMiddleware, permissions('update'), (req,res)=>{
    res.status(200).send('access only if you are admin')
})
app.delete('/remove', bearerMiddleware, permissions('delete'), (req,res)=>{
    res.status(200).send('access it if you have the delete capabilities')
})

module.exports=router;