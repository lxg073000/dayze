const express = require("express");
const router = express.Router();
const validateEventInput = require("../../validation/events");
const Event = require("../../models/Event");
const {
    insertEvent,
    updateEvent,
    removeEvent
} = require('../../util/calendar_util/calendar_api_util');
const User = require("../../models/User");

const fs= require('fs');
const path = require("path");


router.get("/test", (req, res) =>  {
    res.json({ msg: 'This is the events route' });
});



router.get("/today/:user_id", (req, res) => {
  let currentDay = new Date();
  Event.find({
    $and: [
      {
        user: req.params.user_id,
        date: {
          $gte: currentDay.setHours(0, 0, 0),
          $lte: currentDay.setHours(23, 59, 59),
        },
      },
    ],
  })
    .sort({ date: 1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/week/:user_id", (req, res) => {
  let currentDay = new Date();
  Event.find({
    $and: [
      {
        user: req.params.user_id,
        date: {
          $gte: currentDay.setDate(currentDay.getDate() - currentDay.getDay()),
          $lte: currentDay.setDate(
            currentDay.getDate() + (7 - currentDay.getDay())
          ),
        },
      },
    ],
  })
    .sort({ date: 1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/month/:user_id", (req, res) => {
  let currentDay = new Date();
  let nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(0);
  Event.find({
    $and: [
      {
        user: req.params.user_id,
        date: {
          $gte: currentDay.setDate(1),
          $lte: nextMonth,
        },
      },
    ],
  })
    .sort({ date: 1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});






router.post("/",
    (req, res) => {
      const { isValid, errors } = validateEventInput(req.body);
      if(!isValid) {
          return res.status(400).json(errors);
      }
      let newEventParams = {     
          user: req.body.user.id,
          title: req.body.title,
          description: req.body.description,
          date: req.body.date,
          // invites: req.body.invites
      };

      let isLinked = req.body.user.isLinkedGoogleAccount;
      
      const insertThenSave = async ()=>{
        insertEvent(newEventParams)
        .then(( )=>{
          setTimeout(async ()=>{
              const newEvent =  new Event(newEventParams);
              await newEvent.save().then(event => res.json(event))
          }, 2000);
        })
      }

      if (isLinked){
        insertThenSave();
      }else{
        const newEvent =  new Event(newEventParams);
        newEvent.save().then(event => res.json(event))
      }
});



router.get("/", (req, res) => {
    Event
        .find()
        .sort({ data: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(400).json(err))
})

router.get("/user/:user_id", (req, res) => {
  Event.find({ user: req.params.user_id })
    .sort({ date: 1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .sort({ date: 1 })
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json(err));
});

router.patch("/:id", (req, res) => {
    let updatedDbParams = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    }

    let isLinked = req.body.isLinkedGoogleAccount; //////////

    Event
        .findByIdAndUpdate( 
            req.params.id, 
            {
                title: req.body.title,
                description: req.body.description,
                date :req.body.date
            }, 
            {new:true} 
        )
        .then(event => { 
            if (isLinked){
              updateEvent(event.googleId, updatedDbParams);
            }
            res.json(event) 
        })
        .catch(err => res.status(400).json(err));
})

router.delete("/:id", (req, res) => {
    let isLinked = req.body.isLinkedGoogleAccount;////////
    
    Event.findByIdAndRemove(req.params.id)
        .then((event)=>{
            if (isLinked){
              removeEvent(event.googleId);
            }
            res.json(event)
        })
        .catch((err)=> res.status(400).json(err));
})


//Populate the newly-created guest user.
//This function takes the id of a user from the req and adds a list of events 
//from guest_user_default_events_template.json, but changing the month of the 
//event date to the current one.
router.post("/guest/:id" , (req,res)=>{
  let userId = req.params.id;
  let defaultEventsPath = '../../util/guest_user_default_events_template.json';
  let defaultEvents = JSON.parse( 
    fs.readFileSync(path.resolve(__dirname, defaultEventsPath)) 
  );
  let today = new Date();
  defaultEvents.forEach( (ev, idx)=>{
    ev.user = userId;
    let eventDate = new Date(ev.date);
    //Set the event date to have today's month
    eventDate.setMonth(today.getMonth());
    ev.date = eventDate;
  });
  //set the first event to be on the current date
  defaultEvents[0].date = today;
  defaultEvents.sort((a,b)=>(a.date > b.date) ? 1 : -1)
  
  Event.insertMany(defaultEvents, (err, docs)=>{
    if (err) console.log('Could not post get user default events.', err);
    res.json(docs);
  });
});



module.exports = router;