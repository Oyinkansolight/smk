'use client';

import GenericLoader from '@/components/layout/Loader';
import Paginator from '@/components/navigation/Paginator';
import MessageBody from '@/components/views/super-admin/Messages/MessageBody';
import {
  useGetReceiverMessages,
  useGetSenderMessages,
  useReadMessage,
} from '@/server/government/communication';
import { messages } from '@/types/comms';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';

// import { BasicSearch } from '@/components/search';

const AllMessages = () => {
  const { mutateAsync } = useReadMessage();
  const [filter, setFilter] = useState('Sent');

  const [active, setActive] = useState(false);

  const ReadMessage = (messageId: string) => {
    mutateAsync({ id: messageId });
  };
  const [isReply, setIsReply] = useState(false);
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    type: 'SIMPLE',
  });
  const {
    data: sentMessage,
    isLoading: isLoadingSenderMessage,
    refetch: refetchSenderAllMessage,
  } = useGetSenderMessages({
    ...pagingData,
  });
  const {
    data: incomingMessage,
    isLoading: isLoadingIncomingMessage,
    refetch: refetchReceiverAllMessage,
  } = useGetReceiverMessages({
    ...pagingData,
  });
  const [currentMessage, setCurrentMessage] = useState<messages>();
  console.log(incomingMessage);

  function handleReply() {
    setIsReply(!isReply);
  }
  return (
    <section className='p-6 layout pl-0 lg:pl-20'>
      <div className='py-4 px-4 '>
        <h1 className='text-2xl font-bold'>Messages</h1>
      </div>

      <div className='py-4 bg-white rounded-2xl mt-6   flex justify-between grid-cols-2 items-center px-4'>
        <div>
          <select
            name=''
            id=''
            className='border-none outline-none w-[120px] rounded-lg bg-gray-300'
            onChange={(e) => {
              const { value } = e.target;
              if (value === 'Sent') {
                setFilter(value);
                refetchSenderAllMessage();
                // setPagingData({ ...pagingData, type: 'SIMPLE' });
                // refetchSenderAllMessage({ ...pagingData, type: 'SIMPLE' });
              } else {
                setFilter(value);
                refetchReceiverAllMessage;
                // setPagingData({ ...pagingData, type: 'BROADCAST' });
                // refetchSenderAllMessage({ ...pagingData, type: 'BROADCAST' });
              }
            }}
          >
            <option value='Sent'>Sent</option>
            <option value='Inbox'>Inbox</option>
          </select>
        </div>
        <Link
          href='/teacher/messages/send-message'
          className='bg-secondary-400 py-4 text-white rounded-md md:px-10'
        >
          Compose message
        </Link>
        {/* <div className='flex space-x-8 items-center'>
          <RxEnvelopeOpen className='text-gray-300 text-base hover:text-secondary-400' />
          <ImBoxAdd className='text-gray-300 text-base hover:text-secondary-400' />
          <MdOutlineAddTask className='text-gray-300 text-base hover:text-secondary-400' />
          <BsTrash3Fill className='text-gray-300 text-base hover:text-secondary-400' />
        </div> */}
      </div>

      <div className='grid grid-cols-2 border-y'>
        <div className='border-r'>
          {(filter === 'Sent'
            ? sentMessage
            : incomingMessage && !isLoadingSenderMessage) ||
          !isLoadingIncomingMessage ? (
            (filter === 'Sent'
              ? sentMessage.data
              : incomingMessage?.data ?? []
            ).map((item, i) => (
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
                  <h1 className='font-bold text-base'>{item.messageTitle} </h1>
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
          {filter === 'Sent'
            ? sentMessage?.data.length == 0
            : incomingMessage?.data.length === 0 &&
              (filter === 'Sent'
                ? !isLoadingSenderMessage
                : !isLoadingIncomingMessage) && (
                <div className='py-20 text-center'>
                  <h1 className='text-base'>No messages yet</h1>
                </div>
              )}
          <Paginator
            setPagingData={setPagingData}
            pagingData={pagingData}
            data={filter === 'Sent' ? sentMessage : incomingMessage}
          />
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
    </section>
  );
};

export default AllMessages;
