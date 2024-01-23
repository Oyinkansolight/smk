'use client';

import GenericLoader from '@/components/layout/Loader';
import TabBar from '@/components/layout/TabBar';
import MessageBody from '@/components/views/super-admin/Messages/MessageBody';
import {
  useGetReceiverMessages,
  useGetSenderMessages,
  useGetSingleSurvey,
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
  const { data, isLoading } = useGetSenderMessages();
  const { data: incomingMessage, isLoading: isLoadingIncomingMessage } =
    useGetReceiverMessages();
  const { data: surveys, isLoading: surveysLoading } = useGetSurveys();
  const { mutateAsync } = useReadMessage();

  console.log(incomingMessage);

  const [allnotification, setallnotification] = useState();
  const [tabIdx, setTabIdx] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<messages>();
  // const [currentSurvey, setCurrentSurvey] = useState(null);
  const [activeSurvey, setActiveSurvey] = useState('');

  function handleReply() {
    setIsReply(!isReply);
  }

  const handleSearch = (value: string) => {
    // const result = data.filter((data) =>
    //   data.title.toLowerCase().includes(value.toLowerCase())
    // );
    // setallnotification(result);
  };

  const ReadMessage = (messageId: string) => {
    mutateAsync({ id: messageId });
  };

  const {
    data: currentSurvey,
    refetch,
    isLoading: singleSurveyLoading,
  } = useGetSingleSurvey(activeSurvey);

  useEffect(() => {
    refetch();
  }, [activeSurvey, refetch]);
  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Communication</h1>
      </div>

      <div className='pt-4  flex justify-between grid-cols-2 items-center px-4'>
        <div>
          <TabBar
            variant='secondary'
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
          <div className='relative p-2'>
            <Link
              href='/student/send-message'
              className='bg-secondary py-3 text-white rounded-md px-4 flex space-x-3 ml-auto w-max'
            >
              Send Message
            </Link>
          </div>
          <div className='grid grid-cols-2 border-y'>
            <div className='border-r'>
              {data && !isLoading ? (
                (data ?? [])
                  .filter((item) => item.type === 'SIMPLE')
                  .map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActive(!active);
                        setCurrentMessage(item);
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
          <div className='grid grid-cols-2 border-y'>
            <div>
              {isLoadingIncomingMessage ? (
                <div className='flex justify-center items-center'>
                  <GenericLoader />
                </div>
              ) : (
                <div className='border-r'>
                  {data && !isLoading ? (
                    (data ?? [])
                      .filter((item) => item.type === 'BROADCAST')
                      .map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setActive(!active);
                            setCurrentMessage(item);
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
              )}
            </div>
            <div className=''>
              <div className=' bg-white/80'>
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
          </div>
        </div>
      )}
    </section>
  );
};

export default AllNotification;
