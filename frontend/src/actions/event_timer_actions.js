export const RECEIVE_EVENT_TIMER = "RECEIVE_EVENT_TIMER";
export const REMOVE_EVENT_TIMER = "REMOVE_EVENT_TIMER";

export const receiveEventTimer = (eventTimer) => ({
  type: RECEIVE_EVENT_TIMER,
  eventTimer,
});

export const removeEventTimer = (eventTimerId) => {
  return {
    type: REMOVE_EVENT_TIMER,
    eventTimerId,
  };
};
