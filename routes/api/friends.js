const express = require("express");
const router = express.Router();
const CurrentUserId = require("../../models/CurrentUserId");
const Event = require("../../models/Event");
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the friends route" });
});
router.get("/userId/:userId", (req, res) => {
  res.json({ msg: "This is the getUsersFriends route" });
});
router.get("/:id", (req, res) => {
  res.json({ msg: "This is the getFriend route" });
});
router.post("/:id", (req, res) => {
  CurrentUserId.find({}).then(cuList => {
    let cuid = cuList[0].id
    User.findById(cuid).then(user =>{
      let friends = user.friends
      let friendId = req.params.id;  ////
      
      User.findById(req.params.id).then(friend =>{
        let friendUsername = friend.username;
        friends.set(friendId, friendUsername);
        console.log(`updated friends`)
        console.log(friends)
        user.friends= friends;

        user.save()
        .then(user => {
          res.json({ [friendId]:friendUsername });
        })
        .catch(err=> res.status(400).json(err));
      });
    });
  });
});
router.delete("/:id", (req, res) => {
  res.json({ msg: "This is the deleteFriend route" });
});

module.exports = router;
