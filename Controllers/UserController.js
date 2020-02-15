var bcrypt = require('bcrypt');
var users = require('../Models/UserModel');
var jwt = require('jsonwebtoken');
//for exporting id


//checking email/username already exist or not
function CheckIfExist(req, res, next) {//select query
    users.findOne({
        where: { email: req.body.email },

    })
        .then(function (result) {
            if (result === null) {
                console.log("no email found");
                next();
            }
            else {
                res.json({ status: 409, message: 'Email already exist' });
            }
        })
}
//password hashing
function Hashing(req, res, next) {
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (hash) {
            req.hashed = hash;//setting hashed password to req object
            console.log(hash);
            next();
        }
        if (err) {
            console.log(req.body.password);
            console.log('hashing failed')
            res.status(501).json({ status: 501, message: 'Hashing failed' });
        }

    });
}

//registration 
function Registration(req, res, next) {

    users.create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        address: req.body.address,
        profileImg: req.body.profileImg
    })
        .then(function (result) {
            console.log("recorded");
            res.json({ status: 201, message: 'Registration done' });
        })
        .catch(function (err) {
            console.log(err);
            res.json({ status: 409, message: 'Registration failed' });
        })
}

//profile
function GetProfile(req, res, next) {
    const token = req.headers['token'];
    console.log(token);
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            console.log(err.message);
            res.json(err);
        } else {
            //  res.send(decoded);
            users.findOne({
                where: { id: decoded.id }
            }).then(function (result) {
                res.json(result);
                console.log("done");
            })
                .catch(function (err) {
                    res.json({ status: 505, message: 'something wrong' });
                    console.log("failed");
                })

        }
    })

}
//login 
function Login(req, res, next) {//select query
    //  console.log(users);
    if (req.body.email == '' || req.body.password == '') {
        res.json({ status: 400, message: 'Enter username or password!' });
        console.log('unsucccess');
    }
    else {

        console.log('validation success');

        users.findOne({
            where: { email: req.body.email, Password: req.body.password }
        })
            .then(function (result) {
                if (result === null) {
                    console.log('Login unsuccessful');
                    res.json({ status: 404, message: 'error' });


                }
                else {

                    var myPayload = { id: result.id };

                    jwt.sign(myPayload, 'secret', { expiresIn: '1h' }, function (err, token) {
                        if (err) { console.log(err); res.json(err); }
                        else {
                            console.log(token); var userId = result.id;
                            console.log(userId);
                            res.status(201).json({ status: 201, token: token });
                        }
                    });

                    console.log("Login successful");

                }
            })


    }

}

//delete
function Delete(req, res, next) {
    console.log(req.params.id);
    if (req.body.id === null || req.body.id === undefined) {
        res.json({ status: 404, message: 'User not found' })
    }
    users.destroy({
        where: { UserName: req.body.id }

    })
        .then(function (result) {

            res.json({ status: 201, message: 'User deleted successfully' });

        })
        .catch(function (err) {
            console.log(err);

            res.json({ status: 500, message: 'could not delete' });
        })
}

//update user 
function Update(req, res) {
    const token = req.body.token;
    ;
    jwt.verify(token, 'secret', function (err, decoded) {
        console.log(decoded.id)
        if (err) {
            console.log(err.message);
            res.json(err);
        } else {
            console.log(token);
            console.log(req.body.email)
            var data={
                email: req.body.email,
                fullName: req.body.fullName,
                password: req.body.password,
                mobileNo: req.body.mobileNo,
                address: req.body.address,
                profileImg: req.body.profileImg
            };
            var options={multi:true};
            var selector= { 
                where: { id: decoded.id }
              };
          users.update(data,{selector,options});

        }
    });

}




//exporting functions
module.exports = { CheckIfExist, Hashing, Registration, Login, Delete, GetProfile, Update };