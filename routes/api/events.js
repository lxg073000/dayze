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
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateEventInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newEvent = new Event({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
        });

        const insertThenSave = async ()=>{
            let googleId = await insertEvent(newEvent);
            newEvent.googleId = googleId;
            newEvent.save().then(event => res.json(event))
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
    Event.findOne({id:req.params.id}, 
        (err,doc)=>{
            if (err) return err;
            let googleId = doc.googleId;

            const removeAndDelete = async ()=>{
                await removeEvent(googleId);
                Event   
                    .findByIdAndRemove(req.params.id)
                    .then(event => res.redirect("/"))
                    .catch(err => res.status(400).json(err))
            }
            removeAndDelete();
        }
    )

})



module.exports = router;
