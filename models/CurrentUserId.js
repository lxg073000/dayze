const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentUserIdSchema = new Schema({
  id: {
    type:String,
    required:true
  }
});

const CurrentUserId = mongoose.model('currentUserIds', CurrentUserIdSchema);
module.exports = CurrentUserId;