import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://es-ems-be-staging.eu-west-2.elasticbeanstalk.com:1800/',
  withCredentials: true,
});

//create axios instance for google geocoding api
export const geocodingInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  params: {
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
});
