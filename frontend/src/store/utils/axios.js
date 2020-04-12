import axios from 'axios';

// TODO: Rework this to use environment variable
const BASE_API_URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: BASE_API_URL
});

export default instance
