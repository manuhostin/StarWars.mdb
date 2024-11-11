import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer 9c2f36e4ed39cf2bd2a229f3a3bd26a8`,
  },
});

export default api;