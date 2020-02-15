var jwt = require('jsonwebtoken');
var userController=require('./UserController');

var id=userController.userId;



//generating token
function jwtTokenGen(req, res,next)
{	var myPayload = {username: req.body.username,
                    userLevel: 'superadmin'};
            console.log.req.body.username;        
    jwt.sign( myPayload, 'secret', { expiresIn: '1h' },function(err, token)
    {if(err){ console.log(err);res.json(err);}
    else{console.log(token);
       
        console.log(id);
        res.json({status: 201, token: token});
    }});

}
//verifying token
function VerifyToken(req, res, next)
{
   
    const token = req.headers['token'];
   
    jwt.verify(token, 'secret', function(err, decoded) {
        if (err) {
            console.log(err.message);
            res.json(err);
        } else {
            res.send(decoded);
            next();
        }
    })
}

	

module.exports={jwtTokenGen,VerifyToken};