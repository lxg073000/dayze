const {google} = require('googleapis');


const getCalendarInfo = (auth  )=>{
  const calendar = google.calendar({version: 'v3', auth});
  calendar.calendarList.list({},(err,res)=>{
    if (err){
      console.log(`Error could not get calendar info. ${err}`); 
      return;
    }
    // console.log(res.data.items[0])
    return res.data.items[0];
  })
}
 

const insertEvent = (
  auth,
  {summary, location, description, timeZone ,startTime, endTime})=>{
    const calendar =  google.calendar({version:'v3',auth});
    const event = {
      summary,
      location,
      description,
      start:{
        dateTime: startTime,
        timeZone
      },
      end: {
        dateTime: endTime,
        timeZone
      },
      colorId: 1
    }
    console.log('calendar api event!  ',event);

    calendar.freebusy.query(
      {
        resource: {
          timeMin: startTime,
          timeMax: endTime,
          timeZone,
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




// const getEvent = (auth, eventId)=>{
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.get({calendarId: 'primary',  eventId}, 
//   (err, res)=>{
//     if (err) return `Error: Could not get event:  ${err}`
//     return res.data;
//   });
// }




const getEventsFromRange = (auth, startDate, endDate)=>{//get a list of events from a given time range
  //StartDate and EndDate are Date objects.

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



const updateEvent = (auth, eventId, updateParams)=>{
  const calendar =  google.calendar({version:'v3',auth});
  let googleEvent;   

  calendar.events.get({calendarId: 'primary',  eventId}, 
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

const removeEvent = (auth, eventId)=>{ //not tested yet
  const calendar =  google.calendar({version:'v3',auth});
  calendar.events.delete(
    {calendarId: 'primary', eventId}, 
    (err)=>{
      if (err){
        console.log(`Unable to remove event with id = ${eventId}`);
        return false;
      }
      console.log('Event successfully deleted.');
      return true;
    }
  )
}


module.exports = {insertEvent, removeEvent, getEvent,getEventsFromRange, getCalendarInfo, calendarTest, updateEvent}