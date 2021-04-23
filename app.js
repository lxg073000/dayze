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
app.listen(port, () => console.log(`Server is running on port ${port}`));

// google calendar api
const fs = require("fs");
const { google } = require("googleapis");

const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');


const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const credentialsFile = "credentials.json";
let credentials = JSON.parse(fs.readFileSync(credentialsFile));
const { client_secret, client_id, redirect_uris } = credentials.web;//.installed; //.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
// console.log(oAuth2Client);
// google.options({auth: oAuth2Client});
// console.log(google.auth);

async function authenticate( scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
    // console.log(authorizeUrl)
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const {tokens} = await oAuth2Client.getToken(qs.get('code'));
            // console.log(tokens);

            oAuth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        console.log('inside listen function for port 3000')
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

authenticate(SCOPES)