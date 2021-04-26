const express = require("express");
const router = express.Router();
const validateEventInput = require("../../validation/events");
const Event = require("../../models/Event");
const {
    insertEvent,
    updateEvent,
    removeEvent
} = require('../../util/calendar_util/calendar_api_util')


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
      };

      const insertThenSave = async ()=>{
        insertEvent(newEventParams)
        .then(( )=>{
            setTimeout(async ()=>{
                console.log(`newEvent.googleId: ${newEventParams.googleId}`)
                // if (!newEvent.googleId)  return ''
                const newEvent =  new Event(newEventParams);
                await newEvent.save().then(event => res.json(event))
            }, 2000);
        })
      }
      insertThenSave();
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
            updateEvent(event.googleId, updatedDbParams);
            res.json(event) 
        })
        .catch(err => res.status(400).json(err));

})

router.delete("/:id", (req, res) => {
    Event.findByIdAndRemove(req.params.id)
        .then((event)=>{
            console.log(`Deleted event: ${event}`);
            removeEvent(event.googleId);
            res.json(event)
        })
        .catch((err)=> res.status(400).json(err));
})






module.exports = router;