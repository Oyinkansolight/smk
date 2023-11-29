'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import AddSubjectModal from '@/components/modals/add-subject-modal';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useDeleteSubject } from '@/server/government/classes_and_subjects';
import { useGetSubjectList } from '@/server/institution';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { toast } from 'react-toastify';
import Castle from '~/svg/castle.svg';

const SubjectList = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetSubjectList();
  const [subjects, setSubjects] = useState<any>([]);
  const [action, setAction] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSearch = (value: string) => {
    const result =
      subjects &&
      subjects?.filter((data) =>
        data?.name?.toLowerCase().includes(value.toLowerCase())
      );
    setSubjects(result);
  };
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
  useEffect(() => {
    setSubjects(data?.data);
  }, [data]);

  const InfoCard = ({ type, title, count }) => {
    return (
      <div
        className={clsxm(
          type === 'ECCDE' && 'bg-[#FFFEF5] border-[#FFE664]',
          type === 'Primary' && 'bg-[#FFF8F4] border-[#FFCAAB]',
          type === 'Tertiary' && 'bg-[#F9FFFA] border-[#73ED95]',
          type === 'Secondary' && 'bg-[#FAFDFF] border-[#A4DEFF]',
          'p-4 space-y-2 rounded-lg  border-[0.5px] '
        )}
      >
        <h4
          className={clsxm(
            type === 'ECCDE' && ' text-[#D9B80E]',
            type === 'Primary' && ' text-[#AC4407]',
            type === 'Tertiary' && ' text-[#008F28]',
            type === 'Secondary' && ' text-[#6699B6]',
            'text-sm font-normal '
          )}
        >
          {title}
        </h4>
        <h1 className='text-4xl'>{count}</h1>
      </div>
    );
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
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
      <div className='rounded-2xl p-4 bg-[#F0FFFF]'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl'>Subjects</h1>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              An overview of all subjects
            </h2>
          </div>
          <Link
            href='/super-admin/add-school'
            className='w-max h-fit py-3 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
          >
            Add Subject
          </Link>
        </div>

        <div className='space-y-4 my-4 pt-4'>
          <InfoCard
            type='Secondary'
            title='Total Subject'
            count={subjects?.length ?? 0}
          />
        </div>
      </div>
      <div className='rounded-2xl p-4 mt-8 bg-[#FFF]'>
        <div className='flex sm:flex-row flex-col sm:justify-between justify-start items-end'>
          <div className='space-y-3'>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              List of all the subjects
            </h2>
            <BasicSearch handleSearch={handleSearch} />
          </div>
          <div className='flex space-x-2 pb-4'>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by subject</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          subjects && (
            <div className='space-y-2 mt-4'>
              {data?.data?.map((item, idx) => (
                <SubjectCard
                  key={idx}
                  data={item}
                  id={idx}
                  toggleModal={toggleModal}
                  setAction={setAction}
                  action={action}
                  setItemToDelete={setItemToDelete}
                />
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};

const SubjectCard = ({
  data,
  id,
  toggleModal,
  setAction,
  action,
  setItemToDelete,
}) => {
  return (
    <div
      className={clsxm(
        id % 2 === 0 && 'bg-[#F9FFFA] border-[#73ED95]',
        id % 2 !== 0 && 'bg-[#FFF8F4] border-[#FFCAAB]',
        'flex flex-row justify-between border-[0.25px] border-l-2 rounded-lg p-2 h-[91px]'
      )}
    >
      <div className='text-sm flex flex-col items-start capitalize gap-x-2 gap-y-5 font-medium whitespace-nowrap overflow-hidden'>
        <Link
          href='/super-admin/all-subject-schooltype-new'
          className='text-[#000] max-w-[250px] 2xl:max-w-[200px] text-[22xl] text-ellipsis overflow-hidden'
        >
          {data.name}
        </Link>

        <div className='text-xs font-light text-[#98988E]'>
          Classes:
          <span className='text-[#000]'>{data?.classes?.length ?? '0'}</span>
        </div>
      </div>

      <div className='flex  flex-col space-y-4 gap-3'>
        <div className='relative'>
          <CiMenuKebab
            onClick={() => {
              setAction(id + 1);
            }}
            className='w-6 h-6 cursor-pointer'
          />

          {action == id + 1 && (
            <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[180px] z-10'>
              <AddSubjectModal>
                <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  Edit
                </div>
              </AddSubjectModal>
              <div
                onClick={() => {
                  setItemToDelete(data.id ?? '');
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
        <Castle className='h-8 w-8 self-end opacity-50' />
      </div>
    </div>
  );
};

export default SubjectList;
