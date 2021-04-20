var seeder = require('mongoose-seed');
const bcrypt = require("bcryptjs");
const db = require("../config/keys").mongoURI;

seeder.connect(db, ()=>{
  seeder.loadModels(['./models/User.js']);

  /// Uncomment this line to clear db of specified models.
  //seeder.clearModels(['users',  ]);

  let dataList = [
    createUsersDataObject(userList)
  ];
  seeder.populateModels(dataList, (err,res)=>{
    seeder.disconnect();
  })
});



const createUsersDataObject = (userList) =>{
  userList.forEach((user)=>{
    let salt  = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  return {
    'model':'users',
    'documents': userList
  }
}


let userList= [
  // {
  //   'username':'',
  //   'email':'',
  //   'password':''
  // },
  {
    'username':'GuestUser',
    'email':'guestUser@gmail.com',
    'password':'1234567890asdfghjkl'
  },
  {
    'username':'Alfred',
    'email':'alfred@gmail.com',
    'password':'1234567890asdfghjkl'
  }, 
]