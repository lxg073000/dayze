const {google} = require('googleapis');
const fs = require("fs");
const credentials = require('../../credentials.json');



const getCalendarInfo = ()=>{
  let auth = getAuth();
  const calendar = google.calendar({version: 'v3', auth});
  calendar.calendarList.list({},(err,res)=>{
    if (err){
      console.log(`Error could not get calendar info. ${err}`); 
      return;
    }
    console.log(res.data.items[0])
    return res.data.items[0];
  })
}
 

const insertEvent = (dbEvent)=>{
  let auth = getAuth();
  const calendar =  google.calendar({version:'v3',auth});
  const event=  mapDbEventsToGoogleEvents(dbEvent);
  console.log('calendar api event!  ',event);

  calendar.freebusy.query(
    {
      resource: {
        timeMin: event.start.dateTime,
        timeMax: event.end.dateTime,
        timeZone: event.start.timeZone,
        items:[{id: "primary"}]
      },
    },
    (err,res) => {
      if (err) return console.error('Free Busy Query Error:  ', err);
      //check all the busy events in primary
      const eventsArr = res.data.calendars.primary.busy;
      if (eventsArr.length===0) return calendar.events.insert({calendarId: 'primary', resource: event}, 
        (err,res)=>{
          if (err) return console.error('Calendar Event Creation Error: ',err)
          console.log(res.data.id);
          return res.data.id;  //return google's eventId for this event.
          // return console.log(`Event ${summary} Created.`);
        })
      console.log('Unable to create event: another event already made during that time');
      return ;
    }
  );
}





const getEventsFromRange = ( startDate, endDate)=>{//get a list of events from a given time range
  //StartDate and EndDate are Date objects.
  let auth = getAuth();

  const calendar = google.calendar({version: 'v3', auth});
  console.log('date range: ', startDate,endDate)
  calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(res);
    const events = res.data.items;
    if (events.length) {
      console.log('Events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        const end = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('0 events found.');
    }
  });
}



const updateEvent = ( googleEventId, updateParams)=>{
  let auth = getAuth();
  const calendar =  google.calendar({version:'v3',auth});
  let googleEvent;   

  calendar.events.get({calendarId: 'primary',  eventId: googleEventId}, 
  (err, res)=>{
    if (err) return `Error: Could not get event:  ${err}`
    googleEvent = res.data;
    
    Object.assign(googleEvent, updateParams);
    calendar.events.update({
      auth,
      calendarId: 'primary',
      eventId,
      resource: googleEvent
    },
    (err, res)=>{
      if (err) return `Cannot update event: ${err}`
      console.log(res.data);
      return res.data;
    })
  });
}

const removeEvent = (googleEventId)=>{ 
  let auth = getAuth();
  const calendar =  google.calendar({version:'v3',auth});
  calendar.events.delete(
    {calendarId: 'primary', eventId: googleEventId}, 
    (err)=>{
      if (err){
        console.log(`Unable to remove event with id = ${googleEventId}`);
        return false;
      }
      console.log('Event successfully deleted.');
      return true;
    }
  )
}



const getAuth = ()=>{
  const {client_secret, client_id, redirect_uris} =credentials.installed;

  auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]  );
  auth.setCredentials(JSON.parse(fs.readFileSync('token.json')));
  return auth;
}


const mapDbEventsToGoogleEvents = (dbEvent)=>{
  let endDate = new Date(dbEvent.date);
  endDate.setMinutes(endDate.getMinutes()+30);

  googleEvent = {
    summary: dbEvent.title,
    location: '',
    description: dbEvent.description,
    start: {
      dateTime: (new Date(dbEvent.date)),
      timeZone: 'America/New_York',
    },
    end: {
      dateTime: endDate,
      timeZone:'America/New_York',
    },
    colorId: 1
  };
  return googleEvent;
}




// const getEvent = (auth, eventId)=>{
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.get({calendarId: 'primary',  eventId}, 
//   (err, res)=>{
//     if (err) return `Error: Could not get event:  ${err}`
//     return res.data;
//   });
// }

module.exports = {insertEvent, removeEvent,getEventsFromRange, getCalendarInfo, updateEvent, getAuth,mapDbEventsToGoogleEvents}

