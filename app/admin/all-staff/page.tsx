/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import Table from '@/components/tables/TableComponent';
import BulkUser from '@/components/views/admin/AddStudent/bulkusers';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { flattenObject } from '@/misc/functions/calculateEarthDistance';
import { getErrMsg } from '@/server';
import { useDeleteStaff } from '@/server/government/classes_and_subjects';
import {
  useCreateBulkStaff,
  useGetTeachersListByInstitution,
} from '@/server/institution';
import { FlattenedStaff } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllStaff = () => {
  const router = useRouter();

  const [pagingData, setPagingData] = useState({ page: 1, limit: 10 });
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';

  const {
    data: staff,
    error,
    isLoading,
  } = useGetTeachersListByInstitution({
    ...pagingData,
    instituteId: institutionId,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState<File | undefined>(undefined);

  const [action, setAction] = useState<number | null>(null);
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
        toast.success('Staff removed successfully');
        res && router.replace('/admin/all-staff');
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

  const staffColumn: TableColumn<FlattenedStaff & { idx: number }>[] = [
    {
      name: 'No',
      selector: (row) => row.idx,
      cell: (row) => <div>#{row.idx}</div>,
    },
    {
      name: 'Staff ID',
      selector: (row) => row.staffId ?? '',
      cell: (row) => <div>{row.staffId}</div>,
    },
    {
      name: 'Name',
      grow: 2,
      cell: (row) => (
        <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
          <Link href={`/admin/staff?id=${row.id}`}>
            <h2 className='text-sm font-medium capitalize'>
              {row['user.firstName']} {row['user.lastName']}
            </h2>
          </Link>
        </div>
      ),
    },
    {
      name: 'Type',
      selector: (row) => row.staffType ?? '',
      cell: (row) => <div>{row.staffType}</div>,
    },
    {
      name: 'Institution',
      selector: (row) => row['institution.instituteName'] ?? '',
      cell: (row) => <div>{row['institution.instituteName']}</div>,
    },
    {
      name: 'Institution Type',
      selector: (row) => row['institution.instituteType'] ?? '',
      cell: (row) => <div>{row['institution.instituteType']}</div>,
    },
    {
      name: '',
      grow: 0,
      width: '20px',
      cell: (row, idx) => {
        return (
          <div>
            <div
              onClick={() => {
                setAction(idx + 1);
              }}
              className='relative'
            >
              <BsThreeDotsVertical className='text-lg' />

              {action == idx + 1 && (
                <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                  <button className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      // item.setDeleteFileId(item?.id ?? '');
                      setItemToDelete(row.id);
                      toggleModal();
                    }}
                    className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {action && (
              <div
                className='fixed inset-0 z-[1]'
                onClick={() => {
                  setAction(null);
                }}
              ></div>
            )}
          </div>
        );
      },
    },
  ];
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
          <p className='text-[#615F5F]'>Total Teacher</p>
          <h1 className='font-semibold text-2xl'>
            {staff?.paging.itemCount ?? 0}
          </h1>
        </div>
        {isBulk && (
          <BulkUser
            loading={loading}
            onClickHandler={() => {
              setIsBulk(!isBulk);
            }}
            setFile={setFile}
            file={files}
            bulkStudentUpload={bulkStudentUpload}
            link='/pdfs/upload_teacher_template.csv'
          />
        )}
        <div className='mb-6 flex justify-end items-end relative'>
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

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <Table
            data={
              staff?.data?.map((v, i) => ({
                idx: i + 1,
                ...flattenObject(v),
              })) ?? []
            }
            columns={staffColumn}
            paginationServer
            paginationTotalRows={
              pagingData.limit * (staff?.paging.totalPage ?? 0)
            }
            onChangePage={(page) => {
              setPagingData({ page, limit: pagingData.limit });
            }}
            onChangeRowsPerPage={(limit, page) => {
              setPagingData({ page, limit });
            }}
          />
        )}
        {!isLoading && staff?.data && staff?.data?.length === 0 && (
          <div className='text-red-500 py-4 text-center'>No record found</div>
        )}
      </div>
    </section>
  );
};

export default AllStaff;
