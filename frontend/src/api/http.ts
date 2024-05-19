import axios from 'axios';

export const API_URL = 'http://localhost:4500';

const http = axios.create({
  baseURL: API_URL,
});

export default http;
