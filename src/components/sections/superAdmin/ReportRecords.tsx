/* eslint-disable @typescript-eslint/no-explicit-any */
import PopOverSelect from '@/components/input/PopOverSelect';
import Select from '@/components/input/formSelect';
import DownloadFile from '@/lib/helper';
import request from '@/server';
import { useGetReports } from '@/server/government/communication';
import { useGetSchools } from '@/server/institution';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const ReportRecords = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [selectedInstitution, setSelectedInstitution] = useState([
    'All Institutions',
  ]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [activeReport, setActiveReport] = useState<any>(null);

  const [query, setQuery] = useState('');
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    include: 'false',
  });
  const { data: Reports, isLoading: reportLoading } = useGetReports();
  if (pathname?.includes('super-admin')) {
    setIsSuperAdmin(true);
  }
  const {
    data: schools,
    error,
    refetch,
    isLoading: isLoadingSchools,
  } = useGetSchools({ ...pagingData });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index: number) => {
    setItemIndex(index);
  };

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };
  const fetchAttendance = (institutionId: string) => {
    if (institutionId) {
      setIsLoading(true);
      request
        .get(
          `/v1/government/report/get-institution-report?institutionId=${institutionId}`
        )
        .then((v) => {
          setIsLoading(false);

          console.log(v.data.data);
          // setChartData(v.data.data);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message);
        });
    }
  };
  const handleSelectedInstitution = (value: string) => {
    fetchAttendance(value);
    // setSelectedInstitutionId(value);
  };

  const handleInstitutionName = (name: string) => {
    setSelectedInstitution([name]);
  };

  const isLoadingData = isLoading || !chartData || isLoadingSchools || !schools;

  return (
    <>
      <PopOverSelect
        open={open}
        setOpen={setOpen}
        key1='instituteName'
        data={schools?.data}
        title='All Institutions'
        handleSearch={handleSearch}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        description='Select Institution'
        setSelectedIndex={handleItemIndex}
        totalPages={schools?.paging?.totalPage}
        setSelectedItem={handleSelectedInstitution}
        setSelectedItemName={handleInstitutionName}
      />

      <div className='flex flex-col gap-6'>
        <div className='mt-2 flex flex-col gap-2 mx-auto text-center justify-center'>
          <div className='h2'>Report Records</div>
        </div>

        {isSuperAdmin && (
          <div className='px-4'>
            <Select
              onClick={() => setOpen(!open)}
              label='Select Institution'
              options={selectedInstitution}
              formValue={selectedInstitution[0]}
            />
          </div>
        )}

        <div className='grid grid-cols-2 border-y'>
          <div>
            {reportLoading ? (
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
                    <div className='col-span-3 font-medium'>Attachments:</div>
                    <div className='col-span-9 uppercase'>
                      {activeReport.reportAttachment ? (
                        <button
                          onClick={() => {
                            DownloadFile(activeReport.reportAttachment);
                          }}
                          className='text-blue-400 text-sm'
                        >
                          View Attachment
                        </button>
                      ) : (
                        <p>No Attachment(s)</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportRecords;
