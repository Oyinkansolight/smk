/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import GenericLoader from '@/components/layout/Loader';
// import AvrilImage from '~/svg/avril.svg';
import Paginator from '@/components/navigation/Paginator';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetStudentsListByInstitution } from '@/server/institution';
import { Student } from '@/types/institute';
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

const InstitutionStudent = ({ instituteId }) => {
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
    data: students,
    error,
    isLoading,
    refetch,
  } = useGetStudentsListByInstitution({ ...pagingData });

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
            <div className='col-span-2'>ID</div>
            <div className='col-span-5'>Name</div>
            <div className='col-span-3'>Class</div>
          </div>

          {!isLoading &&
            students &&
            students?.data?.length > 0 &&
            students?.data.map((item: Student, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-2'>
                  {/* {item.user[0].firstName} {item.user[0].lastName} */}
                  {item?.uniqueId || 'N/A'}
                </div>
                <div className='col-span-5'>
                  {/* {item.user[0].firstName} {item.user[0].lastName} */}
                  {item?.firstName || 'N/A'} {item?.lastName || 'N/A'}
                </div>

                <div className='col-span-3'>
                  {item?.class?.class?.name || 'N/A'}{' '}
                  {item?.class?.arm || 'N/A'}
                </div>
              </div>
            ))}

          {!isLoading && students?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}
          {isLoading && <GenericLoader />}

          <Paginator
            data={students}
            pagingData={pagingData}
            setPagingData={setPagingData}
          />
        </div>
      </div>
    </section>
  );
};

export default InstitutionStudent;
