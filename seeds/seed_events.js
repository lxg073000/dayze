
var seeder = require('mongoose-seed');
const bcrypt = require("bcryptjs");
const db = require("../config/keys").mongoURI;


seeder.connect(db, ()=>{
  seeder.loadModels(['./models/Event.js']);

  /// Uncomment this line to clear db of specified models.
  //seeder.clearModels(['event'  ]);

  let dataList = [
    {
      'model': 'event',
      'documents': eventList
    }
  ];

  seeder.populateModels(dataList, (err,res)=>{
    seeder.disconnect();
  })
});




let eventList = [
  //user : ObjectId
  // date :  "1975-08-19T23:15:30.000Z"   UTC is 5 hours ahead of EST (spring) and 4 hours ahead of EDT (winter)
  // {
  //   'user':'',
  //   'title':'',
  //   'description':'',
  //   'date':''
  // },
  {
    'user':'607e14ac465b4eacee10dfa3',   //GuestUser
    'title':'Go out for a Jog',
    'description':'Make it all the way across the park',
    'date':(new Date('April 25, 2021, 16:00:00  UTC'))
  }
] 
