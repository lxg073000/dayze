// import seeder from 'mongoose-seed';
var seeder = require('mongoose-seed');
const bcrypt = require("bcryptjs");

const db = require("./config/keys").mongoURI;


seeder.connect(db, ()=>{
  seeder.loadModels(['./models/User.js']);
  //seeder.clearModels(['user']);


  //setup user 

  let  newUser = {
    'username': 'seedTest3',
    'password':'seed123',
    'email': 'seedTest3@gmail.com'  
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      
      const usersData = [
        {
          'model': 'users',
          'documents': [ 
            newUser
          ]
        }
      ];
      console.log(newUser);
      seeder.populateModels(usersData, (err,res)=>{
        if (err){
          return console.log('Error in seeding', err)
        }
        if (res){
          console.log('yes!');
          return console.log('Seeding successful', res);
        }
        seeder.disconnect();
      })
    });
  });
});







// const aaaa = [
//   {
//     'model':'users',
//     'documents': [
//       // {
//       //   //id
//       //   'username':'Guest',
//       //   'email':'guestUser@gmail.com',
//       //   // 'date':,
//       //   'password':'1234567890asdfghjkl',
//       // }
//       {}
//     ]
//   }
// ]