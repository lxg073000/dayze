const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const friends = require("./routes/api/friends");
const events = require("./routes/api/events");
const currentUserIds = require("./routes/api/currentUserIds");
const {notify} = require('./util/notifications');

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// google calendar api
// const fs = require("fs");
// const { google } = require("googleapis");

// const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// const credentialsFile = "credentials.json";
// let credentials = JSON.parse(fs.readFileSync(credentialsFile));
// const { client_secret, client_id, redirect_uris } = credentials.web;//.installed; //.web;

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/api/events", events);

app.use("/api/users", users);

app.use("/api/friends", friends);

app.use("/api/currentUserIds", currentUserIds);

app.get("/", (req, res) => {
  app.use(express.static("frontend/build"));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.post('/api/notifications', notify);


app.listen(port, () => console.log(`Server is running on port ${port}`));
