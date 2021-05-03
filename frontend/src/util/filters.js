
export const filterEventsByTime = (duration, events)=>{
  //Duration is in minutes
  // debugger
  let now = new Date();
  let filteredEvents = [];  
  events.forEach(event=>{
    let eventTime = new Date(event.date);
    let notificationTime = new Date(eventTime);
    notificationTime.setMinutes(notificationTime.getMinutes()-duration);
    console.log(now, notificationTime);
    if (now <= notificationTime ){
      event.notificationTime = notificationTime;
      filteredEvents.push(event);
    }
  })

  

  return filteredEvents;
}





