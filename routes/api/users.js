const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CurrentUserId = require('../../models/CurrentUserId');
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport"); ///
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const { google } = require("googleapis");
const fs = require("fs");


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user is already registered with that email." });
    } else {
      // Check if someone already  registered with given username.
      User.findOne({ username: req.body.username }).then((userSameName) => {
        if (userSameName) {
          return res
            .status(400)
            .json({ email: "A user is already registered with that name." });
        }

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) =>{ 
                setCurrentUserId(user.id);
                return res.json(user) 
              })
              .catch((err) => console.log(err));
          });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist." });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //////////res.json({msg: 'Success'});
        const payload = {
          id: user.id,
          username: user.username,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
        setCurrentUserId(user.id);
      } else {
        return res.status(404).json({ password: "Incorrect password" });
      }
    });
  });
});





router.get('/token', (req,res)=>{/// we should get the mongodb id in our req
  const dbid = req.body.id;
  User.findById(dbid)
  .then(user =>{

    let tokenList = user.googleCredentials;


    if (!tokenList || tokenList.length === 0){//get tokens  
      const SCOPES = ["https://www.googleapis.com/auth/calendar"];
      const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES.join(' ')
      });
      res.redirect(authorizeUrl);
      
    }else{
      oAuth2Client = createOAuth2Client();
      oAuth2Client.credentials = {
        access_token: tokenList[0],
        refresh_token:tokenList[1],
        scope:tokenList[2],
        token_type:tokenList[3],
        expiry_date:tokenList[4]
      }
      google.options({auth: oAuth2Client});
    }
  });
});



router.get('/oauth2callback', async (req,res)=>{
  const authorizationCode = req.query.code;
  let oAuth2Client = createOAuth2Client();


  const {tokens} = await oAuth2Client.getToken(authorizationCode);
  console.log(`tokens! `);
  console.log(tokens);

  oAuth2Client.credentials = tokens;
  google.options({auth: oAuth2Client});

  res.redirect('http://localhost:3000')  // In prod, just /
})



const createOAuth2Client = ()=>{
  const credentialsFile = "../../credentials.json";
  let credentials = JSON.parse(fs.readFileSync(credentialsFile));
  const { client_secret, client_id, redirect_uris } = credentials.web;//.installed;

  return new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
}

const setCurrentUserId = async (id)=>{
  CurrentUserId.find({})
  .then(userarray=>{
    if (userarray.length === 0){
      let currentUser  = new CurrentUserId({id});
      currentUser.save();
      
    }else if (userarray.length === 1){
      CurrentUserId.findByIdAndUpdate(userarray[0]._id, {id:id})
    }
  });
}



module.exports = router;