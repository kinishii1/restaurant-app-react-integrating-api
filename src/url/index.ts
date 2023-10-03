import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:8000/api/v2/',
});

export default url;
