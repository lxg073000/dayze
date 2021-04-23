const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
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

router.post("/",
    // passport.authenticate("jwt", { session: false }),
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

      

      // newEvent.save().then(event => res.json(event))


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
    Event
        .find({user: req.params.user_id})
        .then(events => res.json(events))
        .catch(err => res.status(400).json(err))
})

router.get("/:id", (req, res) => {
    Event
        .find({id: req.params.id})
        .then(event => res.json(event))
        .catch(err => res.status(400).json(err))
})

router.patch("/:id", (req, res) => {
    let updatedDbParams = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
    }

    const patchAndUpdate = async () =>{
        await updateEvent(doc.googleId, updatedDbParams);
        Event
            .findbyIdAndUpdate( 
                req.params.id, 
                {
                    title: req.body.title,
                    description: req.body.description,
                    date :req.body.date
                }, 
                {new:true} 
            )
            .then(event => { res.json(event) })
            .catch(err => res.status(400).json(err))
    }
    patchAndUpdate();

})

router.delete("/:id", (req, res) => {
    Event. findByIdAndRemove(req.params.id)
        .then((event)=>{
            console.log(`Deleted event: ${event}`);
            let googleId = event.googleId;

            const removeAndDelete = async ()=>{
                await removeEvent(googleId);
                Event   
                    .findByIdAndRemove(req.params.id)
                    .catch(err => res.status(400).json(err))
            }
            removeAndDelete();
            res.json(event)
        })
        .catch((err)=> res.status(400).json(err));
})



module.exports = router;