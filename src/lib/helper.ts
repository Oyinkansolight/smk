import { getURL } from '@/firebase/init';
import { getErrMsg } from '@/server';
import moment from 'moment';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
// !STARTERCONF This OG is generated from https://github.com/theodorusclarence/og
// Please clone them and self-host if your site is going to be visited by many people.
// Then change the url and the default logo.
export function openGraph({
  siteName,
  templateTitle,
  description,
  // !STARTERCONF Or, you can use my server with your own logo.
  logo = 'https://og.<your-domain>/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.<your-domain>/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function currentSchedule(startTime, endTime) {
  const currentDay = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Find the schedule entry for the current day

  // If there is no schedule entry for the current day, the restaurant is closed
  if (!startTime || !endTime) {
    return false;
  }

  // Compare the current time with the opening and closing times
  return currentTime >= startTime && currentTime <= endTime;
}

export function convertTimestampToTime(timestamp: string) {
  try {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Extract the hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format the time as HH:MM with leading zeros
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const timeStr = `${formattedHours}:${formattedMinutes}`;

    return timeStr;
  } catch (error) {
    return 'Invalid timestamp format';
  }
}
export function convertTimestampToDate(timestamp: string) {
  try {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Extract the year, month, and day
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getUTCDate().toString().padStart(2, '0');

    // Format the date as yyyy-MM-dd
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  } catch (error) {
    return 'Invalid timestamp format';
  }
}

export const timeConverter = (timestamp) => {
  const date = new Date(timestamp);

  const hours: number | any = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  // eslint-disable-next-line prefer-const
  const hourformat = hours % 12 || 12;
  const period = hours >= 12 ? 'PM' : 'AM';

  return `${hourformat}:${minutes} ${period}`;
};

export const time24Converter = (timestamp) => {
  // Split the input time string into hours and minutes
  const [hours, minutes] = timestamp.split(':');

  // Convert the hours to a number
  const hoursNum = parseInt(hours, 10);

  // Determine whether it's AM or PM
  const period = hoursNum >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  let hours12 = hoursNum % 12;
  hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight (0:00) as 12:00 AM

  // Create the 12-hour formatted time string
  const time12 = `${hours12}:${minutes} ${period}`;

  return time12;
};

//* Get the current date in "YYYY-MM-DD" format defaults to 6 months ago
export const subtractMonthsFromCurrentDate = (months = 6) => {
  // Get the current date
  const currentDate = moment();

  // Subtract 6 months from the current date
  const monthsAgo = currentDate.subtract(months, 'months');

  // Format the result in "YYYY-MM-DD" format
  const formattedDate = monthsAgo.format('YYYY-MM-DD');

  return formattedDate;
};

//* Get the current date in "YYYY-MM-DD" format defaults to 6 years ago
export const subtractYearsFromCurrentDate = (years = 6) => {
  // Get the current date
  const currentDate = moment();

  // Subtract 6 months from the current date
  const yearsAgo = currentDate.subtract(years, 'years');

  // Format the result in "YYYY-MM-DD" format
  const formattedDate = yearsAgo.format('YYYY-MM-DD');

  return formattedDate;
};

export const getCurrentDate = () => {
  const currentDate = moment();

  // Format the result in "YYYY-MM-DD" format
  const formattedDate = currentDate.format('YYYY-MM-DD');

  return formattedDate;
};

//* ttl in milliseconds
export const setStorageValueWithExpiry = (
  itemType: 'session' | 'local',
  key: string,
  value: any,
  ttl: number
) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  if (itemType === 'session') {
    sessionStorage.setItem(key, JSON.stringify(item));
  } else {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

export const getStorageValueWithExpiry = (
  itemType: 'session' | 'local',
  key: string,
  callBack?: (data: any) => void
) => {
  const itemStr =
    itemType === 'session'
      ? getFromSessionStorage(key)
      : getFromLocalStorage(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null

    //* callBack provided with the item in storage in the scenario where the item cleanup is required
    callBack && callBack(item);
    itemType === 'session'
      ? sessionStorage.removeItem(key)
      : localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export function getDueDate(dueDate: string) {
  // Get the current date and time
  const currentDate = new Date();

  // Replace this with the date you want to compare
  const givenDate = new Date(dueDate); // Example: November 2, 2023

  // Compare the given date with the current date
  if (givenDate > currentDate) {
    return true;
  } else false;
}

export function extractMinutesFromString(inputString) {
  // Use a regular expression to match and extract the minute number
  const match = inputString.match(/\d+/);

  if (match) {
    // Convert the matched text to a number
    const minutes = parseInt(match[0], 10);
    return minutes;
  } else {
    // If no match is found, return a default value or handle it accordingly
    return 0; // Return 0 in case of no match
  }
}

//function to render and preserve the structure of an html string in react
export const renderHTML = (rawHTML: string) =>
  React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });

export const handleFlutterPDFReader = (url: string) => {
  if (window) {
    // console.log('handleFlutterPDFReader', url);
    (window as any).flutter_inappwebview?.callHandler('open-pdf', url);
  }

  return null;
};

export const stripWhiteSpace = (value: string) => {
  return value.replace(/\s/g, '');
};

export const timeTablePeriodSorter = (periodsList): any => {
  const daysOrder = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  console.log(periodsList);

  periodsList &&
    periodsList.sort((a, b) => {
      const dayA = daysOrder.indexOf(a.day);
      const dayB = daysOrder.indexOf(b.day);

      if (dayA !== dayB) {
        return dayA - dayB; // Ascending order
      }

      const timeA =
        parseInt(a.startTime.split(':')[0], 10) * 60 +
        parseInt(a.startTime.split(':')[1], 10);
      const timeB =
        parseInt(b.startTime.split(':')[0], 10) * 60 +
        parseInt(b.startTime.split(':')[1], 10);

      return timeA - timeB; // Ascending order
    });
  return periodsList;
};

export default async function DownloadFile(fileUrl: string) {
  try {
    await getURL(fileUrl ?? ' ').then(async (downloadUrl) => {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // Create a blob URL and anchor element
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = 'es-ems-file';
      // link.setAttribute('download', 'es-ems-file');
      // link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the blob URL to free up resources
      window.URL.revokeObjectURL(blobUrl);
    });
  } catch (error) {
    getErrMsg(error);
  }
}

export const termNumberToName = (num: string) => {
  if (num) {
    if (num === '1') {
      return 'First Term';
    } else if (num === '2') {
      return 'Second Term';
    } else if (num === '3') {
      return 'Third Term';
    }
  } else return 'Term';
};
