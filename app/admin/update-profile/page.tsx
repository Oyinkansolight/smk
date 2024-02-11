/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import ConfirmModalContent from '@/components/modal/ConfirmModalContent';
// import AvrilImage from '~/svg/avril.svg';
import ControlledModal from '@/components/modal/ControlledModal';
import GeneralModal from '@/components/modals/general-modal';
import Paginator from '@/components/navigation/Paginator';
import { BasicSearch } from '@/components/search';
import ProfileChanges from '@/components/views/admin/Profile/profilechages';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import {
  useGetStudentsUpdateList,
  useUpdateProfileRequest,
} from '@/server/institution';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';
import { useSessionStorage } from 'usehooks-ts';

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllProfileUpdateRequests = () => {
  const [, setProfileChanges] = useSessionStorage(
    'profile_update_changes',
    {} as any
  );
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [itemToUpdate, setItemToUpdate] = useState<{
    status: 'PENDING' | 'GRANTED' | 'DENIED';
    id: string;
  }>();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    // query,
    // sort: 'SUCCESS'
  });

  const {
    data: updateList,
    error,
    isLoading,
    refetch,
  } = useGetStudentsUpdateList({ ...pagingData });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { mutateAsync } = useUpdateProfileRequest(userType);

  const handleUpdate = async () => {
    if (itemToUpdate) {
      try {
        toggleModal();
        setAction(null);
        const res = await mutateAsync(itemToUpdate);
        toast.success('Update profile successfully');
      } catch (error) {
        logger(error);
      }
    }
  };

  useEffect(() => {
    const refetchSearchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    refetchSearchRecords();
  }, [refetch, debouncedSearchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  return (
    <section className='py-6 layout'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <ConfirmModalContent
            title='Update Profile '
            body='Are you sure you want to update this request?'
            toggleModal={toggleModal}
            handleAction={handleUpdate}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Profile Update Requests</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Requests</p>
          <h1 className='font-semibold text-2xl'>
            {updateList?.paging?.totalItems ?? 0}
          </h1>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <div className='flex w-[300px] space-x-2'>
            <BasicSearch placeholder='Search...' handleSearch={handleSearch} />
          </div>
        </div>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-1'>No</div>
            <div className='col-span-3'>User Type</div>
            <div className='col-span-3'>Previous Profile</div>
            <div className='col-span-3'>New Profile</div>
            <div className='hidden lg:block col-span-1'>Status</div>
          </div>

          {isLoading && <div className='text-center'>Loading...</div>}

          {!isLoading &&
            updateList &&
            updateList?.data?.length > 0 &&
            updateList?.data.map((item: any, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (idx + 1)}
                </div>

                <div className='col-span-3 uppercase'>
                  {item?.user?.type ?? 'N/A'}
                </div>

                <div className='col-span-3'>
                  <GeneralModal body={<ProfileChanges />}>
                    <button
                      className='text-blue-500'
                      onClick={() => {
                        setProfileChanges(item?.user);
                      }}
                    >
                      View Profile
                    </button>
                  </GeneralModal>
                </div>

                <div className='col-span-3'>
                  <GeneralModal body={<ProfileChanges />}>
                    <button
                      className='text-blue-500'
                      onClick={() => {
                        setProfileChanges(item?.dto);
                      }}
                    >
                      View Changes
                    </button>
                  </GeneralModal>
                </div>

                <div className='col-span-1'> {item?.status || 'N/A'} </div>

                <div className='col-span-1 justify-end flex'>
                  <button
                    onClick={() => {
                      setAction(idx + 1);
                    }}
                    className='relative'
                  >
                    <BsThreeDotsVertical />
                    {action == idx + 1 && (
                      <div className='shadow-lg rounded-xl bg-white w-[140px] h-max absolute top-0 -left-[150px] z-10'>
                        <button
                          onClick={() => {
                            setItemToUpdate({
                              status: 'DENIED',
                              id: item.id,
                            });
                            toggleModal();
                            setUserType(
                              item?.user?.type.toLowerCase() === 'student'
                                ? 'student'
                                : 'staff'
                            );
                          }}
                          className='p-4 hover:bg-gray-200 w-full'
                        >
                          DENY
                        </button>
                        <button
                          onClick={() => {
                            setItemToUpdate({
                              status: 'GRANTED',
                              id: item.id,
                            });
                            toggleModal();
                            setUserType(
                              item?.user?.type.toLowerCase() === 'student'
                                ? 'student'
                                : 'staff'
                            );
                          }}
                          className='p-4 hover:bg-gray-200 w-full'
                        >
                          APPROVE
                        </button>
                      </div>
                    )}
                  </button>
                  {action && (
                    <div
                      className='fixed inset-0 z-[1]'
                      onClick={() => {
                        setAction(null);
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}

          {!isLoading && updateList?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          <Paginator
            setPagingData={setPagingData}
            pagingData={pagingData}
            data={updateList}
          />
        </div>
      </div>
    </section>
  );
};

export default AllProfileUpdateRequests;
