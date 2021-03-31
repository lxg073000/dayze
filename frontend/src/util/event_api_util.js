import axios from 'axios';

export const getEvents = () => {
    return axios.get('/api/events')
};

export const getEvent = (id) => {
    return axios.get(`/api/events/${id}`)
}

export const getUserEvents = (id) => {
    return axios.get(`/api/events/user/${id}`)
};

export const createEvent = data => {
    return axios.post('/api/events/', data)
};

export const updateEvent = (id, data) => {
    return axios.patch(`/api/events/${id}`, data)
};

export const deleteEvent = (id) => {
    return axios.delete(`/api/events/${id}`)
}