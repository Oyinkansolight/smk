/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericChart from '@/components/cards/GenericChart';
import { BarChart } from '@/components/charts';
import AttendanceRate from '@/components/charts/AttendanceRate';
import PopOverSelect from '@/components/input/PopOverSelect';
import Select from '@/components/input/formSelect';
import ChartSkeleton from '@/components/skeletons/Chart';
import request from '@/server';
import { useGetSchools } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AttendanceRecords = () => {
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedInstitution, setSelectedInstitution] = useState([
    'All Institutions',
  ]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [itemIndex, setItemIndex] = useState<number>(0);

  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('2024-07-20T09:22:39.910Z');
  const [endDate, setEndDate] = useState(new Date());
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    include: 'false',
  });

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
          `/v1/government/dashboards/get-admin-stat-dashboard?institutionId=${institutionId}&startPeriod=2024-0-20T09:22:39.910Z&endPeriod=2024-08-20T09:22:39.910Z`
        )
        .then((v) => {
          setIsLoading(false);

          setChartData(v.data.data);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message);
        });
    }
  };
  const handleSelectedInstitution = (value: string) => {
    fetchAttendance(value);
    setSelectedInstitutionId(value);
  };

  useEffect(() => {
    // if (endDate) {
    fetchAttendance(selectedInstitutionId);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

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

      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Dashboard</h3>
        </div>
      </Link>

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2 mx-auto text-center justify-center'>
          <div className='h2'>Attendance Records</div>
          <div className='p text-gray-400'>
            Weekly Breakdown of Attendance Records
          </div>
        </div>

        <div>
          <Select
            onClick={() => setOpen(!open)}
            label='Select Institution'
            options={selectedInstitution}
            formValue={selectedInstitution[0]}
          />
        </div>

        {!isLoadingData ? (
          <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
            <div className='flex flex-col gap-y-7'>
              <GenericChart
                title='Attendance Report'
                titleClassName='bg-[#EDF5F2]'
                className='border-[#EDF5F2]'
                description='Total rate of attendance in the state'
                content={<AttendanceRate data={chartData?.attendanceRate} />}
              />
            </div>

            <div className='flex flex-col gap-y-7'>
              <GenericChart
                titleClassName='bg-[#DADEE6]'
                title='Attendance Tracker'
                description='Total number that were present'
                content={
                  <BarChart
                    // setStartPeriod={setStartDate}
                    // setEndPeriod={setEndDate}
                    data={chartData?.attendanceTracker}
                  />
                }
              />
            </div>
          </div>
        ) : (
          <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceRecords;
