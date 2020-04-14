import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://real-world-vue-api.herokuapp.com'
      : 'http://localhost:4000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
  createEvent(event) {
    return apiClient.post('/events', event);
  },
  updateEvent(id, event) {
    return apiClient.put(`/events/${id}`, event);
  },
  deleteEvent(id) {
    return apiClient.delete(`/events/${id}`);
  },
};
