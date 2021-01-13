'use strict';

module.exports =(capability) =>{
    return (req,res,next)=>{
        try{
            if(req.user.capabilities.includes(capability)){
                next();
            }else{
                return res.status(403).send('Access Denied')
            }
        }catch(err){
            next('invalid')
        }
    }
}