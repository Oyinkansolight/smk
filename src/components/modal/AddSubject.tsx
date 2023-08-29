/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProfile } from '@/server/auth';
import { useGetSubjectList } from '@/server/institution';
import { useGetInstituteClassArms } from '@/server/institution/class';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler?: () => void;

  loading: boolean;
  addSubjectClass: () => void;
  removeRemoveSubjectClass: (id: number) => void;
  handleSubjectClassChange: (name: string, value: any, id: number) => void;
  assignedClassSubject: {
    classId: string | null;
    subjectId: string | null;
  }[];
}

function AddActivityName({
  onClickHandler,
  SubmitHandler,
  addSubjectClass,
  assignedClassSubject,
  removeRemoveSubjectClass,
  handleSubjectClassChange,
  loading,
}: propType) {
  const { data: allSubjects, isLoading } = useGetSubjectList();
  const { data: institutionProfile } = useGetProfile();

  const institutionId = institutionProfile?.userInfo?.esiAdmin?.id;
  const currentSessionId = institutionProfile?.currentSession?.[0]?.id;
  const { data: allClasses } = useGetInstituteClassArms(
    institutionId,
    currentSessionId
  );

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Subject</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>
          {!isLoading ? (
            <div>
              {assignedClassSubject.map((v: any, i: number) => (
                <div
                  key={v?.id ?? i}
                  className='my-10 grid grid-cols-12 gap-6 items-center'
                >
                  <div className='col-span-5'>
                    <label htmlFor='' className='text-xs font-bold'>
                      Assign Subject
                    </label>
                    <div className='mt-1 w-full border p-2 rounded'>
                      <select
                        id=''
                        className='w-full border-none outline-none bg-transparent  text-gray-400'
                        onChange={(e) => {
                          handleSubjectClassChange(
                            'subjectId',
                            e.target.value,
                            i
                          );
                        }}
                      >
                        <option value=''> -- Select an option -- </option>

                        {(allSubjects ?? []).map((item, id) => (
                          <option key={item?.id ?? id} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-span-5'>
                    <label htmlFor='' className='text-xs font-bold'>
                      Assign Class
                    </label>
                    <div className='mt-1 w-full border p-2 rounded'>
                      <select
                        id=''
                        className='w-full border-none outline-none bg-transparent  text-gray-400'
                        onChange={(e) => {
                          handleSubjectClassChange(
                            'classId',
                            e.target.value,
                            i
                          );
                        }}
                      >
                        <option value=''> -- Select an option -- </option>

                        {(allClasses ?? []).map((item: any) => (
                          <option key={item?.id} value={item?.id}>
                            {`${item.class.name} ${item.arm}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-span-2 pt-4'>
                    <button
                      type='button'
                      onClick={() => {
                        removeRemoveSubjectClass(i);
                      }}
                      className='bg-[#FFF8F8] rounded-[22px] flex space-x-2 p-3'
                    >
                      <RiDeleteBin6Line size={20} className='text-red-500' />{' '}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type='button'
                onClick={addSubjectClass}
                className=' mt-4  rounded-[22px] flex space-x-2 p-3'
              >
                <BsPlus size={20} className='text-blue-500' />{' '}
                <span>Add Another</span>
              </button>
            </div>
          ) : (
            <div className='flex justify-center'>Loading....</div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={SubmitHandler}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            {loading ? <ImSpinner2 className='animate-spin' /> : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
