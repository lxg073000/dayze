const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');///
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));



router.post('/register', (req,res)=>{
  const { errors, isValid } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({email: req.body.email})
  .then(user=>{
    if (user){
      return res.status(400).json({email: 'A user is already registered with that email.'});
    }else{

      // Check if someone already  registered with given username.
      User.findOne({username: req.body.username})
        .then(userSameName=>{
          if (userSameName){
            return res.status(400).json({email: 'A user is already registered with that name.'});
          }
        })
        /////////////Note, David Suh said that we should put the following code below into the .then() cllback above.
        
      const newUser  = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt, (err, hash)=>{
          if (err) throw err
          newUser.password = hash;
          newUser.save()
            .then((user)=>res.json(user))
            .catch(err=> console.log(err));
        })
      });

        // /// newUser.save()
        //   .then(user => res.send(user))
        //   .catch(err=> res.send(err));
      }
    })
})


router.post('/login', (req, res)=>{
  const { errors, isValid } = validateLoginInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email =  req.body.email;
  const password =  req.body.password;
  User.findOne({email})
    .then(user=>{
      if (!user){
        return res.status(404).json({email: 'This user does not exist.'})
      }
      bcrypt.compare(password, user.password)
        .then(isMatch=>{
          if (isMatch){

            //////////res.json({msg: 'Success'});
            const payload = {
              id: user.id,
              username: user.username,
              email:user.email
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn:3600},
              (err,token)=>{
                res.json({
                  success: true,
                  token: "Bearer "+ token
                });
              }
            );

          }else{
            return res.status(404).json({password: 'Incorrect password'});
          }
        })
    })
})






module.exports = router;
