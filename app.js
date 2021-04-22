const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");


const {
  getCalendarInfo,
  getEventsFromRange, 
  calendarTest, 
  updateEvent, 
  insertEvent, 
  removeEvent, 
  getAuth
} = require('./util/calendar_util/calendar_api_util')


const Event = require("./models/Event");
const events = require("./routes/api/events");

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
///////////
app.listen(port, () => console.log(`Server is running on port ${port}`));

// google calendar api
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');



// If modifying these scopes, delete token.json.

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
const AUTH_DATABASE_ID_PATH = 'auth_database_id.txt';

// Load client secrets from a local file.

const credentialsFile = "credentials.json";
// fs.readFile(credentialsFile, (err, content) => {
//   if (err) return console.log("Error loading client secret file:", err);

//   // Authorize a client with credentials, then call the Google Calendar API.
//   // authorize(JSON.parse(content), listEvents);
//   authorize(JSON.parse(content), (auth) => {
//     return removeEvent(auth, "nnhdosqn74u95tmliln4p4ogmc");
//   });
// });
let credentials = JSON.parse(fs.readFileSync(credentialsFile));
const { client_secret, client_id, redirect_uris } = credentials.web;//.installed; //.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
console.log(oAuth2Client);
google.options({auth: oAuth2Client});
console.log(google.auth);



// Check if we have previously stored a token.
// fs.readFile(TOKEN_PATH, (err, token) => {
//   if (err) return getAccessToken(oAuth2Client, callback);
//   accessToken = JSON.parse(token);
//   oAuth2Client.setCredentials(accessToken);
//   // callback(oAuth2Client);
// });

async function authenticate( scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
    console.log(authorizeUrl)
    const server = http
      .createServer(async (req, res) => {
        console.log('Inside .createServer function ....')
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const {tokens} = await oAuth2Client.getToken(qs.get('code'));
            
            console.log(tokens);

            oAuth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(         3000         , () => {
        // open the browser to the authorize url to start the workflow
        console.log('inside listen function for port 3000')
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

authenticate(SCOPES)
// app.listen(port, () => console.log(`Server is running on port ${port}`));

















/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      console.log('no error for getToken ');
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      // callback(oAuth2Client);
    });
  });
}






/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}
