const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    invites:{
        type: Map,
        of: String,
        default: {}
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String, 
        
    }
});

const Tweet = mongoose.model('event', EventSchema);
module.exports = Tweet;