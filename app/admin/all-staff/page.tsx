/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { BasicSearch } from '@/components/search';
import BulkUser from '@/components/views/admin/AddStudent/bulkusers';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useDeleteStaff } from '@/server/government/classes_and_subjects';
import {
  useCreateBulkStaff,
  useGetTeachersListByInstitution,
} from '@/server/institution';
import { Staff } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';


const AllStaff = () => {
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const [action, setAction] = useState<number | null>(null);
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState<File | undefined>(undefined);

  const [isReplace, setIsReplace] = useState(false);

  const handleIsReplace = () => setIsReplace(!isReplace);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { mutateAsync } = useDeleteStaff();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await mutateAsync(itemToDelete);
        toggleModal();
        setAction(null);
        toast.success('Staff removed successfully');
      } catch (error) {
        logger(error);
      }
    }
  };

  const handleCreateBulkStudent = useCreateBulkStaff();
  const bulkStudentUpload = async () => {
    const formData = new FormData();
    if (files) {
      formData.append('file', files);
    }

    if (isReplace) {
      formData.append('replace', 'true');
    }

    try {
      setLoading(true);
      const response = await handleCreateBulkStudent.mutateAsync(formData);

      if (response) {
        toast.success('Staff(s) Added successfully');
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

  const {
    data: staff,
    error,
    isLoading,
    refetch,
  } = useGetTeachersListByInstitution({
    ...pagingData,
    instituteId: institutionId,
  });

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
    if (staff) setPagingData({ ...pagingData, page: staff?.paging?.totalPage });
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
    <section className='md:px-[60px] px-5 py-6'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Staff'
            body='Are you sure you want to delete this staff?'
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Staff</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Staff</p>
          <h1 className='font-semibold text-2xl'>
            {staff?.paging.totalItems ?? 0}
          </h1>
        </div>

        {isBulk && (
          <BulkUser
            loading={loading}
            isReplace={isReplace}
            onClickHandler={() => {
              setIsBulk(!isBulk);
            }}
            setFile={setFile}
            file={files}
            handleIsReplace={handleIsReplace}
            bulkStudentUpload={bulkStudentUpload}
            link='/pdfs/upload_teacher_template.csv'
          />
        )}

        <div className='mb-6 flex justify-end items-end space-x-2 relative'>
          <Link
            href='/admin/transfer-staff'
            className='w-max flex items-center rounded border border-primary  px-6 py-3 text-center text-xs font-medium text-primary '
          >
            Staff transfer
          </Link>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='w-max flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
          >
            Add staff
            <span className='ml-4'>
              <svg
                width='9'
                height='6'
                viewBox='0 0 9 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.136086 0.607068C0.300449 0.43941 0.557649 0.424168 0.738891 0.561343L0.790815 0.607068L4.50049 4.3913L8.21016 0.607068C8.37452 0.43941 8.63172 0.424168 8.81296 0.561343L8.86489 0.607068C9.02925 0.774727 9.04419 1.03708 8.90972 1.22196L8.86489 1.27493L4.82785 5.39293C4.66349 5.56059 4.40629 5.57583 4.22505 5.43866L4.17312 5.39293L0.136086 1.27493C-0.0447111 1.0905 -0.0447111 0.791493 0.136086 0.607068Z'
                  fill='#3361FF'
                />
              </svg>
            </span>
          </button>
          {isOpen && (
            <div
              className='fixed inset-0 z-[9]'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
          {isOpen && (
            <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-white w-[200px] h-max absolute top-12 right-0 z-10'>
              <Link
                href='/admin/add-staff'
                className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Add Single Staff
              </Link>

              <input type='file' name='upload_file' id='upload_file' hidden />
              <button
                onClick={() => {
                  setIsOpen(!isOpen);

                  setIsBulk(!isBulk);
                }}
                className='w-full p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Upload Bulk Staff
              </button>
              <input
                type='file'
                name='upload_folder'
                id='upload_folder'
                hidden
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className='flex space-x-2 py-2 border-b'>
        <button>All Staff</button>
        <button>Transfer Requests</button>
      </div> */}

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <div className='flex w-[300px] space-x-2'>
            <BasicSearch placeholder='Search...' handleSearch={handleSearch} />
          </div>
        </div>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-1'>No</div>
            <div className='col-span-4'>Staff ID</div>
            <div className='col-span-4'>Name</div>
            <div className='col-span-2'>Type</div>
          </div>
          {isLoading ? (
            <div className='text-center'>Loading...</div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (staff?.data ?? []).map((item: Staff, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (idx + 1)}
                </div>

                <div className='col-span-4'>{item?.oracleNumber ?? '-'}</div>

                <div className='col-span-4'>
                  <Link href={`/admin/staff?id=${item.id}`}>
                    {item?.user?.lastName || 'N/A'}{' '}
                    {item?.user?.firstName || 'N/A'}
                  </Link>
                </div>

                <div className='col-span-2'> {item?.staffType || 'N/A'}</div>

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
                          href={`/admin/staff?id=${item.id}`}
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
            ))
          )}
          {!isLoading && staff?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {staff && staff?.data?.length > 0 && (
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

              {Array(staff.paging.totalPage)
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

              {staff.paging.totalPage > 3 && (
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 &&
                        pagingData.page < staff.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 &&
                    pagingData.page < staff.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              )}

              {staff.paging.totalPage > 4 && (
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

              {staff.paging.totalPage > 1 && (
                <div
                  className={clsxm(
                    pagingData.page === staff.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {staff.paging.totalPage}
                </div>
              )}

              <button
                onClick={handleNextPage}
                disabled={
                  (staff && staff?.data?.length < 10) ||
                  pagingData.page === staff.paging.totalPage
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
                  (staff && staff?.data?.length < 10) ||
                  pagingData.page === staff.paging.totalPage
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

export default AllStaff;
