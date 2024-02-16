/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import GenericLoader from '@/components/layout/Loader';
// import AvrilImage from '~/svg/avril.svg';
import Paginator from '@/components/navigation/Paginator';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetTeachersListByInstitution } from '@/server/institution';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const InstitutionStaff = ({ instituteId }) => {
  const { error: profileError } = useGetProfile();

  const [isReplace, setIsReplace] = useState(false);

  const handleIsReplace = () => setIsReplace(!isReplace);

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    instituteId,
  });

  const {
    data: staffs,
    error,
    isLoading,
    refetch,
  } = useGetTeachersListByInstitution({ ...pagingData });

  useEffect(() => {
    const searchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    searchRecords();
  }, [refetch, pagingData, debouncedSearchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  useEffect(() => {
    if (profileError) {
      toast.error(getErrMsg(profileError));
    }
  }, [profileError]);

  return (
    <section className='py-3'>
      <div className='flex flex-col gap-4'>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-5'>Name</div>
            <div className='col-span-2'>Subject</div>
            <div className='col-span-3'>Attendance Rate</div>
          </div>

          {!isLoading &&
            staffs &&
            staffs?.data?.length > 0 &&
            staffs?.data.map((item: any, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-5'>
                  {/* {item.user[0].firstName} {item.user[0].lastName} */}
                  {item?.user?.firstName || 'N/A'}{' '}
                  {item?.user?.lastName || 'N/A'}
                </div>
                <div className='col-span-2'>
                  {item?.subjects?.length > 0 ? item?.subjects?.length : 'None'}
                </div>
                <div className='col-span-3'>{item?.attendanceRate ?? 0}%</div>
              </div>
            ))}

          {!isLoading && staffs?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}
          {isLoading && <GenericLoader />}

          <Paginator
            data={staffs}
            pagingData={pagingData}
            setPagingData={setPagingData}
          />
        </div>
      </div>
    </section>
  );
};

export default InstitutionStaff;
