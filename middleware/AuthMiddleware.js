const jwt=require('jsonwebtoken')

const requireAuth=(req,res,next)=>{
const token=req.cookies.loginjwt;
if(token){
    jwt.verify(token,'Harsha secret key',(err,decodedToken)=>{
        if(err){
            console.log(err.message);
            res.redirect('/login');
        }else{
            console.log(decodedToken);
                req.user=decodedToken;
            console.log("fromrequire auth");
            next();
        }
    });
}else{
    res.redirect('/login');
}
}


module.exports={requireAuth};