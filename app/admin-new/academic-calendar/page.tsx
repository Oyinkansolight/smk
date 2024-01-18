/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AddSession from '@/components/modal/AddSession';
import { BasicSearch } from '@/components/search';
import { INSTITUTION_TYPES } from '@/constant/institution';
import logger from '@/lib/logger';
// import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import {
  useCreateAcademicCalendar,
  useGetAcademicSessions,
} from '@/server/dashboard';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AcademicCalendar = () => {
  const [query, setQuery] = useState('');

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    query,
  });
  const debouncedSearchTerm = useDebounce(query, 1500);

  const handleCreateAcademicCalendar = useCreateAcademicCalendar();
  const { data, isLoading } = useGetAcademicSessions({
    ...pagingData,
  });
  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [institutionType, setinstitutionType] = useState<string | number>('');
  const [firstendDate, setfirstendDate] = useState<string | number>('');
  const [secondendDate, setsecondendDate] = useState<string | number>('');
  const [thirdendDate, setthirdendDate] = useState<string | number>('');
  const [firststartDate, setfirststartDate] = useState<string | number>('');
  const [secondstartDate, setsecondstartDate] = useState<string | number>('');
  const [thirdstartDate, setthirdstartDate] = useState<string | number>('');
  const [filterCurrent, setFilterCurrent] = useState(false);
  const [filteredInstitutions, setFilteredInstitutions] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState([]);

  const [loading, setloading] = useState(false);
  function handleModal() {
    setIsOpen(!isOpen);
  }

  const SubmitHandler = async () => {
    const data = {
      institutionType,
      terms: [
        {
          name: '1',
          startDate: firststartDate,
          endDate: firstendDate,
        },
        {
          name: '2',
          startDate: secondstartDate,
          endDate: secondendDate,
        },
        {
          name: '3',
          startDate: thirdstartDate,
          endDate: thirdendDate,
        },
      ],
    };

    try {
      setloading(true);
      const response = await handleCreateAcademicCalendar.mutateAsync(data);

      if (response) {
        toast.success('Academic calendar created successfully');
        setloading(false);
        setIsOpen(!isOpen);

        //2 Second - Open Success Modal
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  const handleFilterCurrentSession = () => {
    setFilterCurrent(!filterCurrent);
  };

  const handleChangeInstitutionType = (bool: boolean) => {
    setFilteredInstitutions(bool);
  };
  const handleFilterByInstitution = (e: any) => {
    if (e.target.value === '') {
      setFilteredSessions(data?.data);
      handleChangeInstitutionType(false);
      return;
    }

    handleChangeInstitutionType(true);

    //! update to use institute type constant to filter!!!
    const allFilteredSessions = data?.data.filter(
      (item: any) =>
        typeof item.institutionType === 'string' &&
        item.institutionType
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );
    setFilteredSessions(allFilteredSessions);
  };

  useEffect(() => {
    if (filterCurrent) {
      const allCurrentSessions = data?.data.filter(
        (item: any) => item.isCurrent
      );
      setFilteredSessions(allCurrentSessions);
    }
  }, [data?.data, filterCurrent]);

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <AddSession
          onClickHandler={handleModal}
          setinstitutionType={setinstitutionType}
          SubmitHandler={SubmitHandler}
          setfirststartDate={setfirststartDate}
          setfirstendDate={setfirstendDate}
          setsecondstartDate={setsecondstartDate}
          setsecondendDate={setsecondendDate}
          setthirdstartDate={setthirdstartDate}
          setthirdendDate={setthirdendDate}
          loading={loading}
        />
      )}
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

      <h1 className='mt-5 text-2xl font-bold'>Academic Timetable</h1>
      <h1 className='mt-1 mb-6 text-sm text-[#888888] font-normal'>
        View and edit calendars and timetable
      </h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Sessions Available</p>
          <h1 className='font-semibold text-2xl'>
            {(data?.data || []).length ?? 0}
          </h1>
        </div>
        <button
          onClick={handleModal}
          className='w-max rounded border border-primary px-6 py-3 text-center text-xs text-primary bg-white font-semibold'
        >
          Add Session
        </button>
      </div>
      <div className='flex justify-end'>
        <div className='flex space-x-[10px]'>
          <div className='flex flex-row gap-[10px] items-center bg-white outline-none text-xs leading-5 text-[#1C1C1C] rounded-lg p-2 whitespace-nowrap font-medium'>
            <div>Show Current Session Only</div>
            <Toggle
              defaultChecked={false}
              icons={false}
              style={{ width: '23px !important' }}
              onChange={handleFilterCurrentSession}
            />
          </div>

          <select
            onChange={handleFilterByInstitution}
            name=''
            className='border-none bg-white outline-none text-xs leading-5 text-[#1C1C1C] rounded-lg'
          >
            <option value=''>Filter by Institution type</option>
            <option value={INSTITUTION_TYPES.ECCDE}>ECCDE</option>
            <option value={INSTITUTION_TYPES.PRIMARY}>Primary</option>
            <option value={INSTITUTION_TYPES.SECONDARY}>Secondary</option>
            <option value={INSTITUTION_TYPES.TERTIARY}>Tertiary</option>
          </select>

          <BasicSearch
            placeholder='Search session'
            handleSearch={() => {
              logger('Test');
            }}
          />
        </div>
      </div>

      <div className='table-add-student bg-white mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className='min-w-[800px] table-header grid grid-cols-5 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='text-center'>Academic Session</div>
          <div className='text-center'>School</div>
          <div className='text-center'>Start Date</div>
          <div className='text-center'>End Date</div>
          <div className='text-center'>No of weeks</div>
        </div>

        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : filterCurrent || filteredInstitutions ? (
          filteredSessions.length > 0 ? (
            filteredSessions.map((item: any) => (
              <Link
                href={`/super-admin/school-calendar?session=${item.id}&name=${item.session}&schooltype=${item.institutionType}`}
                className=' min-w-[800px] grid grid-cols-5 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
                key={item.id}
              >
                <div className='text-center text-black'>{item.session}</div>
                <div className='text-center  items-center'>
                  {item.institutionType}
                </div>
                <div className='text-center'>
                  {moment(item.startDate).format('ll')}
                </div>
                <div className='text-center'>
                  {moment(item.endDate).format('ll')}
                </div>
                <div className=' text-center  items-center'>
                  {item.NumberOfWeeks}
                </div>
              </Link>
            ))
          ) : (
            <div className='text-red-500 py-10 text-center'>
              {filterCurrent
                ? 'No current session found'
                : 'Institution type not found'}
            </div>
          )
        ) : (
          (data?.data || []).map((item: any) => (
            <Link
              href={`/super-admin/school-calendar?session=${item.id}&name=${item.session}&schooltype=${item.institutionType}`}
              className=' min-w-[800px] grid grid-cols-5 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
              key={item.id}
            >
              <div className='text-center text-black'>{item.session}</div>
              <div className='text-center  items-center'>
                {item.institutionType}
              </div>
              <div className='text-center'>
                {moment(item.startDate).format('ll')}
              </div>
              <div className='text-center'>
                {moment(item.endDate).format('ll')}
              </div>
              <div className=' text-center  items-center'>
                {item.NumberOfWeeks}
              </div>
            </Link>
          ))
        )}

        {data?.data.length === 0 && (
          <div className='text-red-500 py-10 text-center'>No record found</div>
        )}

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;
