const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const validateEventInput = require("../../validation/events");
const Event = require("../../models/Event");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the events route" });
});

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      user: req.body.user.id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    });

    newEvent.save().then((event) => res.json(event));
  }
);

router.get("/", (req, res) => {
  Event.find()
    .sort({ data: -1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
  Event.find({ user: req.params.user_id })
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json(err));
});

router.patch("/:id", (req, res) => {
  debugger;
  Event.findById(req.params.id)
    .then((event) => {
      debugger;
      event.title = req.body.title;
      event.description = req.body.description;
      event.date = req.body.date;
      res.json(event);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
