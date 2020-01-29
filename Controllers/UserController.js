var bcrypt = require('bcrypt');
var users = require('../Models/UserModel');




//checking username already exist or not
function CheckIfExist(req, res, next)
{//select query
    users.findOne({
        where:{email:req.body.email},
        
    })
    .then(function(result)
    {
        if(result===null)
        {
            console.log("no email found");
            next();
        }
        else
        {
            res.json({ status: 409, message: 'Email already exist' });
        }
    })
}
//password hashing
function Hashing (req, res, next)
{var saltRounds=10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(hash)
        {
            req.hashed = hash;//setting hashed password to req object
             console.log(hash); 
             next();
        }
        if(err)
        { console.log(req.body.fullName, req.body.password);
            console.log('hashing failed');}
       
      });
}

//registration 
function Registration(req, res, next)
{
   
    users.create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        address: req.body.address,
        profileImg: req.body.profileImg
    })
    .then(function (result)
    {
        console.log("recorded");
        res.json({ status: 201, message: 'Registration done' });
    })
    .catch(function(err){
        console.log(err);
        res.json({ status: 409, message: 'Registration failed' });
    })
}




//exporting functions
module.exports={ CheckIfExist, Hashing, Registration,Login,Delete, GetAll};