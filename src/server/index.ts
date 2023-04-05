import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://example.com/',
  withCredentials: true,
});
