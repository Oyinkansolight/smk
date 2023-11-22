'use client';

import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
// import { BasicSearch } from '@/components/search';
import { useGetNotification } from '@/server/library';
import moment from 'moment';
import { useState } from 'react';

const AllNotification = () => {
  const { data, isLoading } = useGetNotification();

  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b'>
        <h1 className='text-2xl font-bold'>Notification</h1>
      </div>
      {data && data.length > 0 && (
        <div>
          {(data ?? []).slice(0, 5).map((item, idx) => (
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

          {/* <div className='flex justify-end p-2'>
            <Link href={link}>
              <div className='text-[#1EC572] text-sm flex space-x-2 items-center'>
                <span>View all</span> <Notificationarrow className='h-3' />
              </div>
            </Link>
          </div> */}
        </div>
      )}

      {isLoading && (
        <div className='py-10'>
          <GenericLoader width='50' />
        </div>
      )}

      {!data ||
        (data?.length === 0 && (
          <div className='py-10'>
            <EmptyView label='No Notification Currently' useStandardHeight />
          </div>
        ))}
    </section>
  );
};

export default AllNotification;
