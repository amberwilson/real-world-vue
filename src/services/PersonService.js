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
  getPeople() {
    // https://www.name-generator.org.uk/quick/
    return apiClient.get('/people');
  },
};
