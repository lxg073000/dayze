const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const events = require("./routes/api/events");

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");


const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));



const port = process.env.PORT || 5000;




// google calendar api
const fs = require("fs");
const { google } = require("googleapis");


const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const credentialsFile = "credentials.json";
let credentials = JSON.parse(fs.readFileSync(credentialsFile));
const { client_secret, client_id, redirect_uris } = credentials.web;//.installed; //.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
console.log('!!!!!');
console.log(oAuth2Client);
google.options({auth: oAuth2Client});
// console.log(google.auth);




require("./config/passport")(passport);
app.use(passport.initialize());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api/events", events);

app.use("/api/users", users);

app.get("/", (req, res) => {
  app.use(express.static("frontend/build"));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));

});
app.get('/auth', async (req,res)=>{
  const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES.join(' ')
  });
  res.redirect(authorizeUrl);
})

app.get('/oauth2callback', async (req,res)=>{
  const authorizationCode = req.query.code;
  const {tokens} = await oAuth2Client.getToken(authorizationCode);
  console.log(`tokens! `);
  console.log(tokens);
  oAuth2Client.credentials = tokens;
  res.redirect('http://localhost:3000')  // In prod, just /


})
app.listen(port, () => console.log(`Server is running on port ${port}`));