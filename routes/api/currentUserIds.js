const express = require("express");
const router = express.Router();
const CurrentUserId = require('../../models/CurrentUserId');


router.delete('/', (req,res)=>{
  CurrentUserId.find({})
  .then((idList)=>{
    if (idList.length===1){
      CurrentUserId.findByIdAndDelete(idList[0]._id).then(cu=>{console.log(cu)})
    }
  })
})

router.get('/',async (req,res)=>{
  CurrentUserId.find({})
  .then(userArray=>{
    if (userArray.length===0){
      return res.json({});
    }else{
      return res.json({id: userArray[0].id});
    }
  })
})



// const getCurrentUserId = async ()=>{
//   CurrentUserId.find({})
//   .then(userArray=>{
//     if (userArray.length===0){
//       return null;
//     }else{
//       return userArray[0].id;
//     }
//   })
// }



module.exports = router;