/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLocal } from '@/constant/env';
import { getFromSessionStorage } from '@/lib/helper';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const TOKEN_KEY = 'TOKEN_KEY';

const request = axios.create({
  baseURL: isLocal
    ? process.env.NEXT_PUBLIC_BE_STAGING_URL
    : process.env.NEXT_PUBLIC_BE_PROD_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*', // For CORS support to work
    'Content-Type': 'application/json',
  },
});

export function getErrMsg(error: any) {
  if (error.code === 'ERR_NETWORK') return 'Network Error';
  if (error.response?.data?.message === 'Unauthorized') {
    toast.error('Token  expired, login required');
    if (typeof window !== 'undefined') {
      window.open('/auth/user', '_self');
    }
    return;
  }
  toast.error(error.response?.data?.message ?? 'NO DATA');

  return error.response?.data?.message ?? 'NO DATA';
}

request.interceptors.request.use(function (
  config: AxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  const token = getFromSessionStorage(TOKEN_KEY);
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
