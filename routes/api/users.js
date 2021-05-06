const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CurrentUserId = require("../../models/CurrentUserId");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport"); ///
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get("/", (req, res) => {
  User.find()
    .sort({ date: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(err));
});

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
          isLinkedGoogleAccount: req.body.isLinkedGoogleAccount,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                setCurrentUserId(user.id);

                //if
                //redirect()
                let authorizeUrl;

                if (req.body.isLinkedGoogleAccount) {
                  let oAuth2Client = createOAuth2Client();
                  const SCOPES = ["https://www.googleapis.com/auth/calendar"];
                  authorizeUrl = oAuth2Client.generateAuthUrl({
                    access_type: "offline",
                    scope: SCOPES.join(" "),
                  });
                  user.googleUrl = authorizeUrl;
                }
                

                const payload = {
                  id: user.id,
                  username: user.username,
                  _id: user._id,
                  email: user.email,
                  googleUrl: user.googleUrl,
                  isLinkedGoogleAccount: false,
                };

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                      id: user.id,
                      username: user.username,
                      _id: user._id,
                      email: user.email,
                      googleUrl: user.googleUrl,
                      isLinkedGoogleAccount: user.isLinkedGoogleAccount,
                    });
                  }
                );

                // return res.json(user);
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
          isLinkedGoogleAccount: user.isLinkedGoogleAccount,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              id: user.id,
              username: user.username,
              _id: user._id,
              email: user.email,
              googleUrl: user.googleUrl,
              isLinkedGoogleAccount: user.isLinkedGoogleAccount,
            });
          }
        );
        setCurrentUserId(user.id);
        if (user.isLinkedGoogleAccount) {
          let tokenList = user.googleCredentials;
          let oAuth2Client = createOAuth2Client();
          oAuth2Client.credentials = {
            access_token: tokenList[0],
            refresh_token: tokenList[1],
            scope: tokenList[2],
            token_type: tokenList[3],
            expiry_date: parseInt(tokenList[4]),
          };
          google.options({ auth: oAuth2Client });
        }
      } else {
        return res.status(404).json({ password: "Incorrect password" });
      }
    });
  });
});

router.patch("/:id/googleAuth", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      token1: req.body.token1,
      _clientId: req.body._clientId,
      _clientSecret: req.body._clientSecret,
    },
    { new: true }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json(err));
});

// router.get('/token', (req,res)=>{ //TEST
//   let oAuth2Client = createOAuth2Client();
//   const SCOPES = ["https://www.googleapis.com/auth/calendar"];
//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES.join(' ')
//   });
//   res.redirect(authorizeUrl);
// });

router.get("/LinkToGoogleCal", (req, res) => {
  let oAuth2Client = createOAuth2Client();
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];
  authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES.join(" "),
  });
  res.json(authorizeUrl);
});

router.get("/oauth2callback", async (req, res) => {
  if (req.query.error) return res.redirect("http://localhost:3000/#/user/");
  const authorizationCode = req.query.code;
  let oAuth2Client = createOAuth2Client();

  const { tokens } = await oAuth2Client.getToken(authorizationCode);


  oAuth2Client.credentials = tokens;
  google.options({ auth: oAuth2Client });

  //Get CurrentUser and store tokens in .googleCredentials
  let gcreds = Object.values(tokens);
  gcreds[3] = gcreds[3].toString();
  CurrentUserId.find({}).then((cuList) => {
    let cuid = cuList[0].id;
    User.findByIdAndUpdate(
      cuid,
      { googleCredentials: gcreds, isLinkedGoogleAccount: true },
      { new: true }
    ).then((u) => {
    });
  });

  // res.json({ isLinkedGoogleAccount: true });
  res.redirect("http://localhost:3000/#/user/granted"); // Now go to frontend   success page
});

const createOAuth2Client = () => {
  const credentialsFile = "../../credentials.json";
  let credentials = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, credentialsFile))
  );
  const { client_secret, client_id, redirect_uris } = credentials.web; //.installed;

  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
};

const setCurrentUserId = async (id) => {
  CurrentUserId.find({}).then((userarray) => {
    if (userarray.length === 0) {
      let currentUser = new CurrentUserId({ id });
      currentUser.save();
    } else if (userarray.length === 1) {
      CurrentUserId.findByIdAndUpdate(userarray[0]._id, { id: id });
    }
  });
};

module.exports = router;
