'use client';

import { BasicSearch } from '@/components/search';
import { useState } from 'react';

const AllNotification = () => {
  const mockData = [
    {
      id: 1,
      title: 'School Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 2,
      title: 'New Timetable',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 3,
      title: 'New School Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: false,
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 4,
      title: 'New Student added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 4,
      title: 'New Teacher Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 5,
      title: 'School Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: false,
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 6,
      title: 'New Admin Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
    },
  ];
  const [allnotification, setallnotification] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.title.toLowerCase().includes(value.toLowerCase())
    );
    setallnotification(result);
  };

  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b'>
        <h1 className='text-2xl font-bold'>Notification</h1>
      </div>

      <div className='py-4  flex justify-between grid-cols-2 items-center px-4'>
        <div className='w-1/3 '>
          {' '}
          <BasicSearch handleSearch={handleSearch} />{' '}
        </div>
        <div>Filter</div>
      </div>
      <div className='grid grid-cols-2 border-y'>
        <div className='border-r'>
          <div className='grid grid-cols-12 font-semibold text-xs border-b py-4'>
            <div className='col-span-1'></div>
            <div className='col-span-7'>Description</div>
            <div className='col-span-2'>Due</div>
            <div className='col-span-2'>Date Received</div>
          </div>
          {allnotification.map((item, i) => (
            <div
              key={i}
              className={`${
                item.status === 'unread' && 'bg-[#EDF3FE]'
              } mb-3 grid grid-cols-12 p-2 font-light items-center`}
            >
              <div className='col-span-1 flex justify-center'>
                <input
                  type='checkbox'
                  className='rounded-md bg-gray-300'
                  name=''
                  id=''
                />
              </div>
              <div
                className={`col-span-7 
                  } flex flex-col space-y-2`}
              >
                <h1 className='font-bold text-base'>{item.title} </h1>
                <p className='text-[#848689]'> {item.body} </p>
              </div>
              <div className='col-span-2'> {item.due && item.due_date} </div>
              <div className='col-span-2'> {item.date_recieved} </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center text-sm py-20'>
          <h1>No messages selected</h1>
        </div>
      </div>
    </section>
  );
};

export default AllNotification;
