const express = require("express");
const app = express();
const User = require('./models/User');
const users = require("./routes/api/users");

const bodyParser = require('body-parser');
const passport = require ('passport');


app.use("/api/users", users);
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);




app.get("/", (req, res) => res.send("Hello World"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));