import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import { useGetNotification } from '@/server/library';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import Notificationarrow from '~/svg/notificationarrow.svg';

const Notification = ({ link }: { link: string }) => {
  const { data, isLoading } = useGetNotification();

  return (
    <div className='notification  max-h-[400px] overflow-y-auto'>
      <div className='header pb-2 pt-6 border-b-2 mb-4 px-6'>
        <h1 className='text-[#016938] font-medium text-base '>Notification</h1>
      </div>
      {data && data.length > 0 && !isLoading && (
        <div>
          {data.slice(0, 5).map((item, idx) => (
            <div
              className='px-6 py-3 mb-6 space-y-2 group hover:bg-[#EDF3FE]'
              key={idx}
            >
              <h2 className='text-xs capitalize font-medium text-gray-600 group-hover:text-[#016938]'>
                {item.activity.name}
              </h2>
              <p className='text-[10px] text-[#848689]'>
                {item.activity.description}{' '}
              </p>
              <p className='text-[10px] text-[#67A588] group-hover:text-[#1EC572]'>
                {moment(item.createdAt).format('DD MMM hh:mm a')}
              </p>
            </div>
          ))}

          <div className='flex justify-end p-2'>
            <Link href={link}>
              <div className='text-[#1EC572] text-sm flex space-x-2 items-center'>
                <span>View all</span> <Notificationarrow className='h-3' />
              </div>
            </Link>
          </div>
        </div>
      )}

      {isLoading && (
        <div className='-mt-20'>
          <GenericLoader width='50' />
        </div>
      )}

      {!data ||
        (data?.length === 0 && (
          <div className='py-10'>
            <EmptyView label='No Notification Currently' />
          </div>
        ))}
    </div>
  );
};

export default Notification;
