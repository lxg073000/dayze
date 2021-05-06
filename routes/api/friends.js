const express = require("express");
const router = express.Router();
const CurrentUserId = require("../../models/CurrentUserId");
const Event = require("../../models/Event");
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the friends route" });
});
router.get("/userId/:userId", (req, res) => {
  User.findById(req.params.userId)
  .then(user=>{
    let friends = user.friends;
    let friendArray = [];
    for (let [key, value] of friends.entries()) {
      friendArray.push({[key]:value});
    }
    res.json(friendArray);
  })
  




});
router.get("/:id", (req, res) => {





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

        // user.friends= friends;

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
  CurrentUserId.find({}).then(cuList => {
    let cuid = cuList[0].id
    User.findById(cuid).then(user =>{
      let friends = user.friends
      let friendId = req.params.id; 
      friends.delete(friendId);
      user.save();
      res.json(friendId)
    });
  });
});

module.exports = router;
