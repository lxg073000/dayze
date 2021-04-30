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
      friends: {
        id: req.params,
        username: User.findById(req.params.id).then(friend =>{
          friend.username
        })
      }

    })
  }
  res.json({ msg: "This is the postFriend route" });
});
router.delete("/:id", (req, res) => {
  res.json({ msg: "This is the deleteFriend route" });
});

module.exports = router;
