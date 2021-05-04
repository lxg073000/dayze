export const RECEIVE_EVENT_TIMER_BATCH = "RECEIVE_EVENT_TIMER_BATCH";
export const RECEIVE_EVENT_TIMER_DATA = "RECEIVE_EVENT_TIMER_DATA";
export const REMOVE_EVENT_TIMER = "REMOVE_EVENT_TIMER";

export const receiveEventTimerBatch = (eventTimerBatch) => ({
  type: RECEIVE_EVENT_TIMER_BATCH,
  eventTimerBatch,
});
export const receiveEventTimerData = (eventTimerData) => ({
  type: RECEIVE_EVENT_TIMER_DATA,
  eventTimerData,
});

export const removeEventTimer = (eventId) => {
  return {
    type: REMOVE_EVENT_TIMER,
    eventId,
  };
};
