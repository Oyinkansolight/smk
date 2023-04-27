/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFromLocalStorage } from '@/lib/helper';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export const TOKEN_KEY = 'TOKEN_KEY';

const request = axios.create({
  baseURL: 'http://es-ems-be-staging.eu-west-2.elasticbeanstalk.com:1800/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*', // For CORS support to work
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(function (
  config: AxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  const token = getFromLocalStorage(TOKEN_KEY);
  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };
  return config as any;
});

//create axios instance for google geocoding api
export const geocodingInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  params: {
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
});

export default request;
