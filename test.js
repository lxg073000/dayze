const {google} = require('googleapis');
const {OAuth2} = google.auth;

const oAuth2Client = new OAuth2('630484719931-256gihgl594gkcusn90uu1h3j3dsl8am.apps.googleusercontent.com','Z68nBaV2JacZ6nCrylw1iM1b');
oAuth2Client.setCredentials({refresh_token:'1//04UyCDAL8g1qCCgYIARAAGAQSNwF-L9IrzEBMEhZ7HU_A9XEw19LDv4SdGsG3OVJ2V6hTm0eHIuMck7NzHWqbQk5jtBjHBG9RjZI'});

const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const eventStartTime=  new Date(2021,4,10,12,0,0,0);
console.log(eventStartTime);
// eventStartTime.setHours(eventStartTime.getHours() );
eventEndTime=  new Date(2021,4,10,12,45,0,0);
// eventEndTime.setMinutes(eventStartTime.getMinutes()+75 );
// eventEndTime.setDate(eventEndTime.getDate()+1);
console.log(eventEndTime)

const event  = {
  summary: 'Test Event Quatro',
  location:'2349 Jericho Turnpike, Garden City Park, NY 11040',
  description: 'Having a party again',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/New_York'
  },
  end:{
    dateTime: eventEndTime,
    timeZone: 'America/New_York'
  },
  colorId:2
}

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone:'America/Denver',
      items:[{id: "primary"}]
    },
  },
  (err,res) => {
    if (err) return console.error('Free Busy Query Error:  ', err);
    //check all the busy events in primary
    const eventsArr = res.data.calendars.primary.busy;
    if (eventsArr.length===0) return calendar.events.insert({calendarId: 'primary', resource: event}, 
      err=>{
        if (err) return console.error('Calendar Event Creation Error: ',err)

        return console.log('Calendar Event Created.')
      })
    return console.log('I am busy');
  }
);
