const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type:String,
    required: true
  },
  date : {
    type: Date,
    default: Date.now
  },
  password: {
    type:String,
    required:true
  },
})

const User = mongoose.model('users', UserSchema);
module.exports = User;



/* 
// User Auth User Model   add user to app.js
// const User = require('./models/User');

// made at line 15



// REgistration 
// app.jsx
// const bodyParser = require('body-parser');
// const passport = require ('passport');

// line 15
// app.use(bodyParser.urlencoded({
//   extended:false
// }));

// app.use(bodyParser.json());
// app.use(passport.initialize());
// require('./config/passport')(passport);



//--------------------In users.js in routes/api
const User = require('../../models/User');
const bcrypt = require("bcryptjs);
const keys = require('../../config/keys);
const jwt = require('jsonwebtoken');

const passport  = require('passport');
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=>{
  res.json({msg: 'Success});
})




router.post('/register', (req,res)=>{
  User.findOne({email: req.body.email})
    .then(user=>{
      if (user){
        return res.status(400).json(email: 'A user si already registered with that email.');
      }else{
        const newUser  = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err,salt)=>{
          bcrypt.hash(newUser.password,salt, (err, hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user)=>res.json(user))
              .catch(err=> console.log(err));
          })
        }))

        /// newUser.save()
          .then(user => res.send(user))
          .catch(err=> res.send(err));
      }
    })
})


router.post('/login', (req, res)=>{
  email: req.body.email,
  password: req.body.password;
  User.findOne({email})
    .then(user=>{
      if (!user){
        return res.status(404).json({email: 'This user does not exist.'})
      }
      bcrypt.compare(password, user.password);
        .then(isMatch=>{
          if (isMatch){

            //////////res.json({msg: 'Success'});
            const payload = {
              id: user.id,
              handle: user.handle,
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



------in keys.js
secretOrKey: 'abettersecret'

*/