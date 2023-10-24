/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// import AvrilImage from '~/svg/avril.svg';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import BulkUser from '@/components/views/admin/AddStudent/bulkusers';
import { getURL } from '@/firebase/init';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useDeleteStudent } from '@/server/government/classes_and_subjects';
import {
  useCreateBulkStudent,
  useGetStudentsListByInstitution,
} from '@/server/institution';
import { Student } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { useDebounce } from 'usehooks-ts';

const AllStudent = () => {
  async function fetchProfileImageSrc(item) {
    try {
      const profileImgUrl = await getURL(item.profileImg);
      return profileImgUrl;
    } catch (error) {
      console.error('Error fetching profile image URL:', error);
      return ''; // Provide a fallback URL or handle the error appropriately
    }
  }

  const instituteId = getFromLocalStorage('institutionId');

  const [isOpen, setIsOpen] = useState(false);
  const [isBulk, setisBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState<any>(null);
  const [profileImgSrcs, setProfileImgSrcs] = useState<string[]>([]);
  const [imageError, setImageError] = useState(false);
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({ page: 1, limit: 10, query, instituteId });


  const {
    data: students,
    error,
    isLoading,
    refetch
  } = useGetStudentsListByInstitution({ ...pagingData });


  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, query: value });
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
    if (students) setPagingData({ ...pagingData, page: students?.paging?.totalPage });
  };


  const handleCreateBulkStudent = useCreateBulkStudent();
  const bulkStudentUpload = async () => {
    const formData = new FormData();
    formData.append('file', files);

    try {
      setLoading(true);
      const response = await handleCreateBulkStudent.mutateAsync(formData);

      if (response) {
        toast.success('Student(s) Added successfully');
        setLoading(false);
        setisBulk(!isBulk);

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
        setAction(null)
        const res = await mutateAsync(itemToDelete);
        toast.success('Student removed successfully');
      } catch (error) {
        logger(error);
      }
    }
  };

  useEffect(() => {
    // Map over the array and fetch profile image URLs for each item
    Promise.all(students?.data.map((item) => fetchProfileImageSrc(item)))
      .then((urls) => {
        setProfileImgSrcs(urls);
      })
      .catch((error) => {
        logger('Error fetching profile image URLs:', error)
        setProfileImgSrcs([]); // Provide a fallback or handle the error appropriately
      });
  }, [students]); // Make sure to include any dependencies that trigger the update

  useEffect(() => {
    const searchRecords = () => {
      if (debouncedSearchTerm) {
        refetch()
      }
    };

    searchRecords();

  }, [refetch, pagingData, debouncedSearchTerm]);


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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Students</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Students</p>
          <h1 className='font-semibold text-2xl'>{students?.paging?.totalInstitutionStudents ?? 0}</h1>
        </div>

        {isBulk && (
          <BulkUser
            loading={loading}
            onClickHandler={() => {
              setisBulk(!isBulk);
            }}
            setFile={setFile}
            file={files}
            link='/pdfs/upload_student_template.xlsx'
            bulkStudentUpload={bulkStudentUpload}
          />
        )}
        <div className='mb-6 flex justify-end items-end relative'>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='w-max flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
          >
            Add Student
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
                href='/admin/add-student'
                className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Add Single Student
              </Link>

              <input type='file' name='upload_file' id='upload_file' hidden />
              <button
                onClick={() => {
                  setIsOpen(!isOpen);

                  setisBulk(!isBulk);
                }}
                className='w-full p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Upload Bulk Student
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

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <div className='flex w-[300px] space-x-2'>

            <BasicSearch
              placeholder='Search...'
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <div className='table-add-student mt-3 py-4 pb-4 bg-white overflow-x-scroll'>
          <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
            <div className='col-span-1'>No</div>
            <div className='col-span-5'>Name</div>
            <div className='hidden lg:block col-span-4'>Institution</div>
            <div className='hidden lg:block col-span-1'>Institution Type</div>
          </div>

          {isLoading &&
            <div className='text-center'>Loading...</div>
          }

          {!isLoading && students && students?.data?.length > 0 && (
            students?.data.map((item: Student, idx: number) => (
              <div className='grid grid-cols-12 p-4 border-b' key={item.id}>
                <div className='col-span-1'>
                  {(pagingData.page - 1) * 10 + (students?.paging?.itemCount ?? idx + 1)}
                </div>

                <div className='col-span-5'>
                  <Link href={`/admin/student?id=${item.id}`}>
                    {item?.user?.[0]?.lastName || item?.lastName || 'N/A'} {item?.user?.[0]?.firstName || item?.firstName || 'N/A'}
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
                        <button className='p-4 hover:bg-gray-200 w-full'>
                          Edit
                        </button>
                        <button className='p-4 hover:bg-gray-200 w-full'>
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
            )))}

          {!isLoading && students?.data?.length === 0 && (
            <div className='text-red-500 py-4 text-center'>No record found</div>
          )}

          {students && students?.data?.length > 0 && (
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

              {Array(students.paging.totalPage)
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

              {students.paging.totalPage > 3 &&
                <div
                  key={Math.random() * 100}
                  className={clsxm(
                    pagingData.page === 3 ||
                      (pagingData.page > 3 && pagingData.page < students.paging.totalPage)
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {pagingData.page > 3 && pagingData.page < students.paging.totalPage
                    ? pagingData.page
                    : 3}
                </div>
              }

              {students.paging.totalPage > 4 && (
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

              {students.paging.totalPage > 1 &&
                <div
                  className={clsxm(
                    pagingData.page === students.paging.totalPage
                      ? 'bg-[#008146] text-white'
                      : 'bg-white text-gray-500',
                    'grid h-7 w-7 place-content-center rounded-full border p-2'
                  )}
                >
                  {students.paging.totalPage}
                </div>
              }

              <button
                onClick={handleNextPage}
                disabled={students && students?.data?.length < 10}
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
                disabled={students && students?.data?.length < 10}
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

export default AllStudent;
