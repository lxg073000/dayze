const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  googleCredentials: [{ type: String }],
  isLinkedGoogleAccount: {
    type: Boolean,
    default: false,
  },
  googleUrl: {
    type: String,
  },
  friends: {
    type: Map,
    of: String,
    default: {}
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
