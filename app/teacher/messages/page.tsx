'use client';

import CustomRichTextEditor from '@/components/input/TextEditor/CustomRichTextEditor';
import MessageBody from '@/components/views/super-admin/Messages/MessageBody';
import useCustomEditor from '@/hooks/useEditor';
import clsxm from '@/lib/clsxm';
import React, { useState } from 'react';
// import { BasicSearch } from '@/components/search';
import { BsTrash3Fill } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { ImBoxAdd } from 'react-icons/im';
import { MdOutlineAddTask } from 'react-icons/md';
import { RxEnvelopeOpen } from 'react-icons/rx';

const AllNotification = () => {
  const editor = useCustomEditor();
  const [active, setActive] = useState(false);
  const [composeMessage, setComposeMessage] = useState(false);
  const mockData = [
    {
      id: 1,
      title: 'School Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: true,
      due_date: 'Fri,  10:51 am',
      to: 'student',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 2,
      title: 'New Timetable',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      to: 'admin',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 3,
      title: 'New School Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: false,
      to: 'student',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 4,
      title: 'New Student added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'unread',
      due: true,
      due_date: 'Fri,  10:51 am',
      to: 'parent',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 4,
      title: 'New Teacher Added',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      to: 'student',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 5,
      title: 'School Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: false,
      to: 'admin',
      date_recieved: 'Tue,  10:51 am',
    },
    {
      id: 6,
      title: 'New Admin Registration',
      body: 'Avril Primary has uploaded the list of students in there school...',
      status: 'read',
      due: true,
      due_date: 'Fri,  10:51 am',
      to: 'parent',
      date_recieved: 'Tue,  10:51 am',
    },
  ];
  const [allNotification] = useState(mockData);

  // const handleSearch = (value: string) => {
  //   const result = mockData.filter((data) =>
  //     data.title.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setAllNotification(result);
  // };


  const EditorPage = () => {
    return (
      <CustomRichTextEditor editor={editor} />
    );
  };

  return (
    <section className='p-6 layout'>
      {composeMessage && (
        <div className='fixed z-[99999] bg-[#000]/50 inset-0 grid place-content-center'>
          <div className='bg-white rounded-lg p-10'>
            <EditorPage />
            <div className='flex w-full justify-end'>
              <button
                onClick={() => {
                  setComposeMessage(false);
                }}
                className='mt-4 bg-secondary-400 py-3 text-white rounded-md md:px-5'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='py-4 px-4 '>
        <h1 className='text-2xl font-bold'>Messages</h1>
      </div>

      <div className='py-4 bg-white rounded-2xl   flex justify-between grid-cols-2 items-center px-4'>
        <div className='w-1/3 pr-10'>
          <div className=' border flex rounded-[99999px] py-1 px-4 items-center'>
            <GoSearch size={20} className='text-gray-300' />
            <input
              type='text'
              placeholder='search..'
              className='w-full border-none bg-transparent'
            />
          </div>
        </div>
        <div>
          <select
            name=''
            id=''
            className='text-xs border-gray-200 w-[160px] text-gray-400 rounded-sm'
          >
            <option value='all-contact'>All Contact</option>
          </select>
        </div>
      </div>

      <div className='py-4 bg-white rounded-2xl mt-6   flex justify-between grid-cols-2 items-center px-4'>
        <button
          onClick={() => {
            setComposeMessage(true);
          }}
          className='bg-secondary-400 py-4 text-white rounded-md md:px-10'
        >
          Compose message
        </button>
        <div className='flex space-x-8 items-center'>
          <RxEnvelopeOpen className='text-gray-300 text-base hover:text-secondary-400' />
          <ImBoxAdd className='text-gray-300 text-base hover:text-secondary-400' />
          <MdOutlineAddTask className='text-gray-300 text-base hover:text-secondary-400' />
          <BsTrash3Fill className='text-gray-300 text-base hover:text-secondary-400' />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6  '>
        <div className=''>
          <div className='grid grid-cols-12 font-semibold text-xs text-[#746D69] py-4'>
            <div className='col-span-1'></div>
            <div className='col-span-7'>Description</div>
            <div className='col-span-2'>Due</div>
            <div className='col-span-2'>Date Received</div>
          </div>
          {allNotification.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActive(!active);
              }}
              className={`${item.status === 'unread' && 'bg-[#EDF3FE]'
                } mb-3 grid grid-cols-12 rounded-md p-2 font-light items-center`}
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
                <div className='flex space-x-2'>
                  <h1 className='font-bold text-base'>{item.title} </h1>

                  <small
                    className={clsxm(
                      item.to === 'student' && 'bg-[#CD3B0E]',
                      item.to === 'parent' && 'bg-[#33A08D]',
                      item.to === 'admin' && 'bg-[#6A2B56]',
                      'px-2 py-1 rounded-md text-white h-auto text-[8px]'
                    )}
                  >
                    {item.to}{' '}
                  </small>
                </div>
                <p className='text-[#848689]'> {item.body} </p>
              </div>
              <div className='col-span-2'> {item.due && item.due_date} </div>
              <div className='col-span-2'> {item.date_recieved} </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center text-sm rounded-lg'>
          {!active ? (
            <div className='py-20'>
              <h1>No messages selected</h1>
            </div>
          ) : (
            <MessageBody />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllNotification;
