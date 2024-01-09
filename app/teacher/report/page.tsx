'use client';

import Button from '@/components/buttons/Button';
import AddNewReport from '@/components/modals/create_new_report';
import { useGetMyReports } from '@/server/teacher';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';

export default function Page() {
  const router = useRouter();
  const { data: Reports, isLoading } = useGetMyReports();
  const [activeReport, setActiveReport] = useState<any>(null);

  return (
    <div className='flex flex-col layout pl-0 lg:pl-20 pb-14'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer flex items-center my-6'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <div className=''>
        <div className='flex justify-end py-2'>
          <AddNewReport>
            <Button variant='secondary'>Create New Report</Button>
          </AddNewReport>
        </div>
        <div className='grid grid-cols-2 border-y'>
          <div>
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <RotatingLines
                  width='100'
                  visible={true}
                  strokeWidth='5'
                  strokeColor='#4fa94d'
                  animationDuration='0.75'
                />
              </div>
            ) : (
              <div>
                {!Reports ||
                  (Reports?.length === 0 ? (
                    <div className='py-20 flex justify-center items-center'>
                      <h4>No survey created yet</h4>
                    </div>
                  ) : (
                    <div>
                      <div className=''>
                        {(Reports ?? []).map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              // setActive(!active);
                              // if (!item.read) {
                              //   ReadMessage(item.id);
                              setActiveReport(item);
                              // }
                            }}
                            className={`${
                              !item.read && 'bg-[#EDF3FE]'
                            } mb-3 grid grid-cols-12 px-2 py-3 font-light items-center`}
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
                              <h1 className='font-bold text-base cursor-pointer'>
                                {item?.description}{' '}
                              </h1>
                            </div>
                            <div className='col-span-4 flex items-end flex-col space-y-3'>
                              <div>{moment(item.createdAt).format('ll')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className='border-l'>
            <div className=' bg-white/80'>
              {!activeReport ? (
                <div className='py-20 flex justify-center items-center'>
                  <h4>No report selected yet</h4>
                </div>
              ) : (
                <div>
                  <div className='grid grid-cols-12 gap-6 p-4'>
                    <div className='col-span-3 font-medium'>Date Created:</div>
                    <div className='col-span-9'>
                      {moment(activeReport?.createdAt).format('llll')}
                    </div>

                    <div className='col-span-3 font-medium'> Report Name:</div>
                    <div className='col-span-9'>
                      {activeReport?.description ?? ''}
                    </div>
                    <div className='col-span-3 font-medium'>Issues(s):</div>
                    <div className='col-span-9 capitalize'>
                      {activeReport?.issues.join(',')}
                    </div>
                    <div className='col-span-3 font-medium'>
                      Priority Level:
                    </div>
                    <div className='col-span-9 uppercase'>
                      {activeReport?.priorityLevel}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
