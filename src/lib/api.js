
import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
