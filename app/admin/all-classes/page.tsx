/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import { BasicSearch } from '@/components/search';
import ROUTES from '@/constant/routes';
import { getFromLocalStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { useDeleteClass } from '@/server/government/classes_and_subjects';
import { useGetTeachersListByInstitution } from '@/server/institution';
import { useGetInstituteClassArms } from '@/server/institution/class';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AllClasses = () => {
  const router = useRouter();

  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';
  const [action, setAction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const {
    data: allClasses,
    isLoading,
    isError,
  } = useGetInstituteClassArms(institutionId, currentSessionId);

  const { data: staffs } = useGetTeachersListByInstitution({
    instituteId: institutionId,
    limit: 50,
  });

  const getTeacher = (teacherId: number) => {
    const teacherInfo = (staffs?.data ?? []).find(
      (v: any) => v.id === teacherId
    );
    return teacherInfo?.user
      ? `${teacherInfo?.user.firstName} ${teacherInfo?.user.lastName}`
      : '';
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { mutateAsync } = useDeleteClass();

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await mutateAsync(itemToDelete);
        toast.success('class removed successfully');
        toggleModal();
        setAction(null);
      } catch (error) {
        logger(error);
      }
    }
  };
  return (
    <section className='md:px-[60px] px-5 py-6'>
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Class'
            body='Are you sure you want to delete this class?'
            toggleModal={toggleModal}
            handleDelete={handleDelete}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />
      <Link href={ROUTES.ADMIN}>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Classes</h1>

      <div className='mb-6 flex justify-end space-x-4 items-end'>
        <Link
          href='/admin/add-class'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Class Arm
        </Link>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch />
        </div>
      </div>

      <div className='table-add-student mt-5 pb-20 pt-1 overflow-x-auto w-full h-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-white py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Class Arm</div>
          <div className='col-span-3'>Capacity</div>
          <div className='col-span-4'>Class Teacher</div>
          <div className='col-span-2'></div>
        </div>
        {isLoading && !isError ? (
          <div className='py-10 text-center'>Loading...</div>
        ) : (
          <div>
            {allClasses && allClasses?.data.length > 0 ? (
              allClasses?.data?.map((item: any, idx: number) => (
                <div
                  className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b bg-white py-4 px-1 text-[#8898AA] font-semibold'
                  key={item.id}
                >
                  <div className='col-span-3'>
                    <Link href={`/admin/class?id=${item.id}`}>
                      {`${item.class.name} ${item.arm}`}
                    </Link>
                  </div>
                  <div className='col-span-3'> {item.capacity} </div>
                  <div className='col-span-4'>
                    {getTeacher(item?.teacher?.id)}
                  </div>
                  <div className='col-span-2'>
                    <div
                      onClick={() => {
                        setAction(idx + 1);
                      }}
                      className='relative'
                    >
                      <BsThreeDotsVertical className='text-lg' />

                      {action == idx + 1 && (
                        <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
                          <button
                            onClick={() => {
                              router.push(`/admin/edit-class?id=${item.id}`);
                            }}
                            className='p-4 text-black hover:bg-gray-200 w-full  text-left font-medium'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              // item.setDeleteFileId(item?.id ?? '');
                              setItemToDelete(item.id);
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
                </div>
              ))
            ) : (
              <div className='py-10 text-center'>No Class Arm Found</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllClasses;
