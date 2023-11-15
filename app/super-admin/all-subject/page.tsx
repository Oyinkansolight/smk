/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import AddSubjectModal from '@/components/modals/add-subject-modal';
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useDeleteSubject } from '@/server/government/classes_and_subjects';
import { useGetSubjectList } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

const AllSubjects = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    // query,
  });

  const { data, error, isLoading, refetch } = useGetSubjectList({ ...pagingData });
  const [action, setAction] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    if (data)
      setPagingData({ ...pagingData, page: data?.paging?.totalPage });
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

  const { mutateAsync } = useDeleteSubject();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await mutateAsync(itemToDelete);
        toggleModal();
        toast.success('Subject deleted successfully');
        res && router.replace('/super-admin/all-subject');
      } catch (error) {
        toast.error(getErrMsg(error));
      }
    }
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Subjects</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Subjects</p>
          <h1 className='font-semibold text-2xl'>{data?.paging?.totalItems ?? 0}</h1>
        </div>
        <AddSubjectModal>
          <div className='cursor-pointer w-max rounded border border-primary px-6 py-3 text-center text-xs text-primary font-semibold bg-white'>
            Add Subject
          </div>
        </AddSubjectModal>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch handleSearch={handleSearch} />
        </div>
      </div>

      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Subject'
            body='Are you sure you want to delete this subject?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full bg-white'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-4 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Subject Name</div>
          <div className='col-span-3'>Classes Applicable</div>
          <div className='col-span-2'> </div>
        </div>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          (data?.data ?? []).map((item, idx) => (
            <div
              key={item.id ?? idx}
              className='grid cursor-pointer grid-cols-12 gap-4 border-b items-center text-[#8898AA] p-3 px-4'
            >
              <div
                className='col-span-3 text-[#525F7F] font-bold text-sm'
                onClick={() => {
                  router.push(`/super-admin/subject?id=${item.id ?? ''}`);
                }}
              >
                {item.name}
              </div>
              <div className='col-span-4 text-[#8898AA] text-sm leading-5'>
                {item?.classes?.length ?? '0'}{' '}
              </div>
              {/* <div className='col-span-3 text-center'>
                {item.classes?.map((cls) => cls.name).join(', ') ?? '-'}
              </div> */}
              <div className='col-span-5 flex flex-row items-center whitespace-nowrap gap-10 justify-end'>
                <button
                  onClick={() => {
                    router.push(`/super-admin/subject?id=${item.id ?? ''}`);
                  }}
                  className='hidden lg:block cursor-pointer text-primary text-sm leading-5'
                >
                  Click to manage
                </button>
                <div className='relative'>
                  <CiMenuKebab
                    onClick={() => {
                      setAction(idx + 1);
                    }}
                    className='w-6 h-6 cursor-pointer'
                  />

                  {action == idx + 1 && (
                    <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                      <AddSubjectModal>
                        <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          Edit
                        </div>
                      </AddSubjectModal>
                      <div
                        onClick={() => {
                          setItemToDelete(item.id ?? '');
                          toggleModal();
                        }}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Delete
                      </div>
                    </div>
                  )}
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
            </div>
          ))
        )}

        {/* //Pagination */}
        {data && data?.data?.length > 0 && (
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

            {Array(data?.paging?.totalPage)
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

            {data?.paging?.totalPage > 3 && (
              <div
                key={Math.random() * 100}
                className={clsxm(
                  pagingData.page === 3 ||
                    (pagingData.page > 3 &&
                      pagingData.page < data.paging.totalPage)
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2'
                )}
              >
                {pagingData.page > 3 &&
                  pagingData.page < data.paging.totalPage
                  ? pagingData.page
                  : 3}
              </div>
            )}

            {data?.paging?.totalPage > 4 && (
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

            {data?.paging?.totalPage > 1 && (
              <div
                className={clsxm(
                  pagingData.page === data.paging.totalPage
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2'
                )}
              >
                {data?.paging?.totalPage}
              </div>
            )}

            <button
              onClick={handleNextPage}
              disabled={
                (data && data?.data?.length < 10) ||
                pagingData.page === data.paging.totalPage
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
                (data && data?.data?.length < 10) ||
                pagingData.page === data.paging.totalPage
              }
              className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
            >
              <BiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllSubjects;
