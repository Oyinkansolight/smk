'use client';

import GenericLoader from '@/components/layout/Loader';
import TabBar from '@/components/layout/TabBar';
import ReportRecords from '@/components/sections/superAdmin/ReportRecords';
import MessageBody from '@/components/views/super-admin/Messages/MessageBody';
import request from '@/server';
import {
  useGetSenderMessages,
  useGetSurveys,
  useReadMessage,
} from '@/server/government/communication';
import { messages } from '@/types/comms';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiDashboardFill } from 'react-icons/ri';

const AllNotification = () => {
  const {
    data,
    isLoading,
    refetch: refetchAllMessage,
  } = useGetSenderMessages();

  const { data: surveys, isLoading: surveysLoading } = useGetSurveys();

  const [allMessage, setAllMessage] = useState<messages[]>([]);
  const [allnotification, setallnotification] = useState();
  const [tabIdx, setTabIdx] = useState(0);
  const [filter, setFilter] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<messages>();
  // const [currentSurvey, setCurrentSurvey] = useState(null);

  const { mutateAsync } = useReadMessage();
  function handleReply() {
    setIsReply(!isReply);
  }

  const handleFilter = async () => {
    const d = await request.get('/v1/government/message/get_unread_messages');
    setAllMessage(d.data.data.data.data);
  };

  const ReadMessage = (messageId: string) => {
    mutateAsync({ id: messageId });
  };

  useEffect(() => {
    if (data) {
      setAllMessage(data);
    }
  }, [filter, data]);

  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Communication</h1>
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
                label: 'Reports',
              },

              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Notifications',
              },
            ]}
          />
        </div>

        <div className='flex items-center space-x-4'>
          {/* <div>Filter</div>
          <div className='w-[200px]'>
            <BasicSearch handleSearch={handleSearch} />
          </div> */}
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
      {tabIdx === 0 && (
        <div>
          <div className='w-full py-4 flex items-center justify-between px-4'>
            <div>
              <select
                name=''
                id=''
                className='border-none outline-none w-[100px] rounded-lg bg-gray-300'
                onChange={(e) => {
                  if (e.target.value === 'Unread') {
                    handleFilter();
                  } else {
                    refetchAllMessage();
                  }
                  setFilter(e.target.value);
                }}
              >
                <option value='All'>All</option>
                <option value='Read'>Read</option>
                <option value='Unread'>Unread</option>
              </select>
            </div>
            <Link
              href='/super-admin/send-message'
              className='bg-primary py-3 text-white rounded-md px-4 flex space-x-3 '
            >
              <span>Send Messages</span>
            </Link>
          </div>
          <div className='grid grid-cols-2 border-y'>
            <div className='border-r'>
              {data && !isLoading ? (
                (data ?? []).map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActive(!active);
                      setCurrentMessage(item);
                      console.log(item);

                      if (!item.read) {
                        ReadMessage(item.id);
                      }
                    }}
                    className={`${
                      !item.read && 'bg-[#EDF3FE]'
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
                      <h1 className='font-bold text-base'>
                        {item.messageTitle}{' '}
                      </h1>
                      <p className='text-[#848689]'>
                        {item.messageBody.substring(0, 50)}
                      </p>
                    </div>
                    <div className='col-span-4 flex items-end flex-col space-y-3'>
                      <div>{moment(item.createdAt).format('ll')}</div>
                      {/* <div className='text-gray-300 text-[10px]  capitalize'>
                  {item.type}
                </div> */}
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex justify-center items-center'>
                  <GenericLoader />
                </div>
              )}
            </div>

            <div className='flex justify-center text-sm  bg-[#F7F7F7]  rounded-lg'>
              {!active ? (
                <div className='py-20 text-center'>
                  <h1 className='text-base'>No messages selected</h1>
                </div>
              ) : (
                <MessageBody message={currentMessage} reply={handleReply} />
              )}
            </div>
          </div>
        </div>
      )}
      {tabIdx === 1 && (
        <div className=''>
          <ReportRecords />
        </div>
      )}
    </section>
  );
};

export default AllNotification;
