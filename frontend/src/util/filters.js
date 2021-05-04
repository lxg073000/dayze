export const filterEventsByTime = (duration, events) => {
  //Duration is in minutes
  // debugger

  // 1hrWindow = now + 1hr
  ///// push events if date < 1hrWindow

  let now = new Date();
  let oneHourLater = new Date();

  oneHourLater = oneHourLater.setHours(oneHourLater.getHours() + 1);
  let filteredEvents = [];
  events.forEach((event) => {
    let eventTime = new Date(event.date);
    let notificationTime = new Date(eventTime);
    notificationTime.setMinutes(notificationTime.getMinutes() - duration);
    console.log(now, notificationTime);
    if (
      eventTime > now &&
      eventTime < oneHourLater &&
      now <= notificationTime
    ) {
      event.notificationTime = notificationTime;
      filteredEvents.push(event);
    }
  });

  return filteredEvents;
};
