'use client';

import TabBar from '@/components/layout/TabBar';
import { BasicSearch } from '@/components/search';
import MessageBody from '@/components/views/super-admin/Messages/MessageBody';
import Link from 'next/link';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiArrowDropDownLine, RiDashboardFill } from 'react-icons/ri';

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
      date: '6, June 2023',
      type: 'recieved',
    },
    {
      id: 2,
      title: 'New Timetable',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
      date: '6, June 2023',
      type: 'sent',
    },
    {
      id: 3,
      title: 'New School Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: false,
      date_recieved: 'Tue,  10:51 am',
      date: '7, June 2023',
      type: 'recieved',
    },
    {
      id: 4,
      title: 'New Student added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
      date: '7, June 2023',
      type: 'sent',
    },
    {
      id: 4,
      title: 'New Teacher Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
      date: '7, June 2023',
      type: 'recieved',
    },
    {
      id: 5,
      title: 'School Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: false,
      date_recieved: 'Tue,  10:51 am',
      date: '7, June 2023',
      type: 'recieved',
    },
    {
      id: 6,
      title: 'New Admin Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      date_recieved: 'Tue,  10:51 am',
      date: '8, June 2023',
      type: 'send',
    },
  ];
  const [allnotification, setallnotification] = useState(mockData);
  const [tabIdx, setTabIdx] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [isReply, setIsReply] = useState(false);

  function handleReply() {
    setIsReply(!isReply);
  }

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.title.toLowerCase().includes(value.toLowerCase())
    );
    setallnotification(result);
  };

  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Communication</h1>
        <div className='relative'>
          <button
            onClick={() => {
              setDropDown(true);
            }}
            className='bg-primary py-3 text-white rounded-md px-4 flex space-x-3'
          >
            <span>Send Messages</span>
            <RiArrowDropDownLine size={20} />
          </button>
          {dropDown && (
            <div
              className='fixed inset-0 z-[9]'
              onClick={() => {
                setDropDown(!dropDown);
              }}
            />
          )}
          {dropDown && (
            <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-white w-[160px] h-max absolute top-14 transition-all duration-200 right-0 z-10'>
              <Link
                href='/super-admin/send-message'
                className='p-3 hover:bg-slate-100  text-left font-medium w-full'
              >
                Send Message
              </Link>
              <button className='p-3 hover:bg-slate-100  text-left font-medium w-full'>
                Send Broadcast{' '}
              </button>
              <button className='p-3 hover:bg-slate-100  text-left font-medium w-full'>
                Send Report{' '}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='pt-4  flex justify-between grid-cols-2 items-center px-4'>
        <div>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Messages',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Notifications',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Reports',
              },
            ]}
          />
        </div>

        <div className='flex items-center space-x-4'>
          <div>Filter</div>
          <div className='w-[200px]'>
            {' '}
            <BasicSearch handleSearch={handleSearch} />{' '}
          </div>
        </div>
      </div>
      {isReply && (
        <div className='fixed bottom-0 right-0 pb-6 pr-6 '>
          <div className='bg-white h-[220px] w-[480px] shadow-md rounded-lg p-4'>
            <h1 className='text-sm font-medium mb-4'>Reply Message</h1>
            <textarea
              name=''
              id=''
              className='h-[140px] outline-none border border-gray-200 rounded-lg resize-none w-full'
            />
          </div>
          <div className='flex justify-end mt-6'>
            {' '}
            <button
              onClick={() => {
                setIsReply(false);
              }}
              className='bg-primary py-3 text-white rounded-md px-4 flex space-x-3'
            >
              <span>Send Messages</span>
            </button>
          </div>
        </div>
      )}
      <div className='grid grid-cols-2 border-y'>
        <div className='border-r'>
          {allnotification.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActive(!active);
              }}
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
              <div className='col-span-4 flex items-end flex-col space-y-3'>
                {' '}
                <div>{item.date_recieved}</div>{' '}
                <div className='text-gray-300 text-[10px]  capitalize'>
                  {item.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center text-sm  bg-[#F7F7F7]  rounded-lg'>
          {!active ? (
            <div className='py-20 text-center'>
              <h1 className='text-base'>No messages selected</h1>
            </div>
          ) : (
            <MessageBody reply={handleReply} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllNotification;
