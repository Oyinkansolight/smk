/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// import AvrilImage from '~/svg/avril.svg';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useDeleteStudent } from '@/server/government/classes_and_subjects';
import { useCreateBulkStudent, useGetParents } from '@/server/institution';
import { Student } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllParents = () => {
  const { error: profileError } = useGetProfile();

  const instituteId = getFromLocalStorage('institutionId');

  const [isOpen, setIsOpen] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState<any>(null);
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const [isReplace, setIsReplace] = useState(false);

  const handleIsReplace = () => setIsReplace(!isReplace);

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    // query,
  });

  const {
    data: parents,
    error,
    isLoading,
    refetch,
  } = useGetParents({ ...pagingData });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  const handleJumpToStart = () => {
    setPagingData({ ...pagingData, page: 1 });
  };

  const handleJumpToEnd = () => {
    if (parents)
      setPagingData({ ...pagingData, page: parents?.paging?.totalPage });
  };

  const handleCreateBulkStudent = useCreateBulkStudent();
  const bulkStudentUpload = async () => {
    const formData = new FormData();
    formData.append('file', files);

    if (isReplace) {
      formData.append('replace', 'true');
    }

    try {
      setLoading(true);
      const response = await handleCreateBulkStudent.mutateAsync(formData);

      if (response) {
        toast.success('Student(s) Added successfully');
        setLoading(false);
        setIsBulk(!isBulk);

        //2 Second - Open Success Modal
        // setisOpen(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { mutateAsync } = useDeleteStudent();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        toggleModal();
        setAction(null);
        const res = await mutateAsync(itemToDelete);
        toast.success('Student removed successfully');
      } catch (error) {
        logger(error);
      }
    }
  };

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
    <section className='md:px-[60px] px-5 py-6'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Student'
            body='Are you sure you want to delete this student?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <Link href='/admin'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All parents</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total parents</p>
          <h1 className='font-semibold text-2xl'>
            {parents?.paging?.totalItems ?? 0}
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
            <div className='col-span-5'>Name</div>
            <div className='hidden lg:block col-span-4'>Institution</div>
            <div className='hidden lg:block col-span-1'>Institution Type</div>
          </div>

          {isLoading && <div className='text-center'>Loading...</div>}

          {!isLoading &&
            parents &&
            parents?.data?.length > 0 &&
            parents?.data.map((item: Student, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (idx + 1)}
                </div>

                <div className='col-span-5'>
                  <Link href={`/admin/student?id=${item.id}`}>
                    {item?.user?.[0]?.lastName || item?.lastName || 'N/A'}{' '}
                    {item?.user?.[0]?.firstName || item?.firstName || 'N/A'}
                  </Link>
                </div>

                <div className='col-span-4 lg:col-span-4'>
                  {' '}
                  {item?.institution?.instituteName || 'N/A'}{' '}
                </div>

                <div className='hidden lg:block col-span-1'>
                  {' '}
                  {item?.institution?.instituteType || 'N/A'}{' '}
                </div>

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
                        <Link
                          href={`/admin/student?id=${item.id}`}
                          className='p-4 hover:bg-gray-200 w-full block'
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setItemToDelete(item.id);
                            toggleModal();
                          }}
                          className='p-4 hover:bg-gray-200 w-full'
                        >
                          Delete
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

          {!isLoading && parents?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {parents && parents?.data?.length > 0 && (
            <div className='lg:min-w-[800px] my-4 flex items-center justify-center lg:justify-end space-x-3 lg:pr-10'>
              <button
                onClick={handleJumpToStart}
                disabled={pagingData.page === 1}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <BiChevronsLeft />
              </button>

              <button
                onClick={handlePrevPage}
                disabled={pagingData.page === 1}
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
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
              </button>

              {Array(parents.paging.totalPage)
                .fill(0)
                .slice(0, 2)
                .map((item, idx: number) => (
                  <div
                    key={Math.random() * 100}
                    className={clsxm(
                      pagingData.page === idx + 1
                        ? 'bg-[#008146] text-white'
                        : 'bg-white text-gray-500',
                      'grid h-7 w-7 place-content-center rounded-full border p-2'
                    )}
                  >
                    {idx + 1}
                  </div>
                ))}

              {parents.paging.totalPage > 3 && (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 &&
                        pagingData.page < parents.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 &&
                  pagingData.page < parents.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              )}

              {parents.paging.totalPage > 4 && (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  ...
                </div>
              )}

              {parents.paging.totalPage > 1 && (
                <div
                  className={clsxm(
                    pagingData.page === parents.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {parents.paging.totalPage}
                </div>
              )}

              <button
                onClick={handleNextPage}
                disabled={
                  (parents && parents?.data?.length < 10) ||
                  pagingData.page === parents.paging.totalPage
                }
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
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
              </button>

              <button
                onClick={handleJumpToEnd}
                disabled={
                  (parents && parents?.data?.length < 10) ||
                  pagingData.page === parents.paging.totalPage
                }
                className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
              >
                <BiChevronsRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllParents;
