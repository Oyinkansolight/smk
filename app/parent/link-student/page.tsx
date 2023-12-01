'use client';

import PopOverSelect from '@/components/input/PopOverSelect';
import Select from '@/components/input/formSelect';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useAssignStudentToParent,
  useGetStudentsList,
} from '@/server/institution';
import { useVerifyStudent } from '@/server/student';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

const SingleSubjectInstitutionType = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(['']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleStudentVerification = useVerifyStudent();
  const [query, setQuery] = useState('');
  const [itemIndex, setItemIndex] = useState<string>();
  const [studentId, setStudentId] = useState<any>();
  const { data: parentProfile } = useGetProfile();
  const debouncedSearchTerm = useDebounce(query, 1500);
  const assignStudentToParent = useAssignStudentToParent();

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
  });

  const {
    data: students,
    isLoading,
    refetch,
  } = useGetStudentsList({ ...pagingData });

  const handleSearch = (value: string) => {
    logger(value);
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index) => {
    setItemIndex(index);
  };
  useEffect(() => {
    const getSelectedParent = (index) => {
      setStudentId(students?.data[index].id);

      if (!index) return;

      setSelectedStudent([
        `${students?.data[index]?.lastName} ${students?.data[index]?.firstName}`,
      ]);
    };

    if (itemIndex) {
      getSelectedParent(itemIndex);
    }
  }, [itemIndex, students?.data]);

  useEffect(() => {
    const searchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    searchRecords();
  }, [refetch, pagingData, debouncedSearchTerm]);

  async function linkStudent() {
    if (email && password) {
      setLoading(true);
      const payload = {
        email,
        password,
      };
      try {
        const verify = await handleStudentVerification.mutateAsync(payload);
        if (verify.status === 400) {
          toast.error('Invalid email provided!');
        } else {
          const parentData = {
            id: parentProfile?.userInfo?.id ?? '',
            studentId: studentId,
          };
          const parentLinkResponse = await assignStudentToParent.mutateAsync(
            parentData
          );
          if (parentLinkResponse.status === 200) {
            toast.success('Student Linked Successfully');
          }
          if (!parentLinkResponse) {
            toast.error('Error linking parent to student');
            setLoading(false);
          }
        }

        console.log(verify);
      } catch (error) {
        getErrMsg(error);
        setLoading(false);
      }
    } else {
      toast.error('Email, password and a student is required');
      setLoading(false);
    }
  }

  return (
    <div className='bg-[#EFF3F7]  pb-5  overflow-y-auto'>
      <div className='pt-8  px-6 w-full'>
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => router.back()}
            className='flex items-center space-x-2'
          >
            <Image
              src='/svg/rounded-back.svg'
              height={20}
              width={20}
              alt='back '
              className=''
            />
            <span className='text-[#808080] text-base'>Back</span>
          </button>
        </div>
        <div className='my-5'>
          <h2 className='text-[#848689] text-lg'>Link Student to Parent</h2>
        </div>
        <PopOverSelect
          open={open}
          key1='lastName'
          key2='firstName'
          setOpen={setOpen}
          title='All Student'
          data={students?.data}
          handleSearch={handleSearch}
          description='Select student'
          setSelectedItem={(value) => {
            console.log(value);
          }}
          setSelectedIndex={handleItemIndex}
        />

        <div className='rounded-xl bg-white'>
          <div className='p-4 border-b'>
            <div className='flex space-x-2 items-center'>
              <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                1
              </div>
              <h5 className='text-[#5754F7]'> General</h5>
            </div>
            <h6 className='text-gray-500'>
              Kindly select/search your student below.˝{' '}
            </h6>
          </div>

          <div className='p-4'>
            <Select
              onClick={() => setOpen(!open)}
              label=''
              options={selectedStudent}
              formValue={selectedStudent[0]}
            />
          </div>
        </div>
        <div className='rounded-xl mt-6 bg-white'>
          <div className='p-4 border-b'>
            <div className='flex space-x-2 items-center'>
              <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                2
              </div>
              <h5 className='text-[#5754F7]'> Verify Student Detail</h5>
            </div>
            <h6 className='text-gray-500'>
              Kindly enter the details of the student below.
            </h6>
          </div>

          <div className='p-4'>
            <div className='grid sm:grid-cols-2 gap-4'>
              <div className='rounded-md p-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'>
                <h6 className='text-gray-400 text-[8px]'>Student's Email</h6>
                <input
                  type='text'
                  className='p-0  bg-transparent w-full !ring-0 !outline-none !border-0'
                  placeholder='john.doe@teesas.app'
                  onChange={(v) => {
                    setEmail(v.target.value);
                  }}
                />
              </div>
              <div className='rounded-md p-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'>
                <h6 className='text-gray-400 text-[8px]'>Student's Password</h6>
                <input
                  type='password'
                  className='p-0  bg-transparent w-full !ring-0 !outline-none !border-0'
                  placeholder='*********'
                  onChange={(v) => {
                    setPassword(v.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-xl mt-6 bg-white p-4 flex justify-end'>
          <button
            onClick={() => {
              linkStudent();
            }}
            className='rounded-full flex justify-center p-2 text-white items-center bg-[#5754f7] '
          >
            {loading ? (
              <ImSpinner />
            ) : (
              <div className='flex space-x-2'>
                <span>Continue</span>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.0891 10.5893C18.4145 10.2639 18.4145 9.73622 18.0891 9.41078L14.7558 6.07745C14.4303 5.75201 13.9027 5.75201 13.5772 6.07745C13.2518 6.40289 13.2518 6.93053 13.5772 7.25596L15.488 9.16671L2.49984 9.16671C2.0396 9.16671 1.6665 9.5398 1.6665 10C1.6665 10.4603 2.0396 10.8334 2.49984 10.8334L15.488 10.8334L13.5772 12.7441C13.2518 13.0696 13.2518 13.5972 13.5772 13.9226C13.9027 14.2481 14.4303 14.2481 14.7558 13.9226L18.0891 10.5893Z'
                    fill='white'
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSubjectInstitutionType;
