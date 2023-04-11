import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://es-ems-be-staging.eu-west-2.elasticbeanstalk.com/',
  withCredentials: true,
});
