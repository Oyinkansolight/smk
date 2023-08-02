/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetProfile } from '@/server/auth';
import { useGetSubjectList } from '@/server/institution';
import { useGetInstituteClassArms } from '@/server/institution/class';
import { BsPlus } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  addSubjectClass: () => void;
  removeRemoveSubjectClass: (id: number) => void;
  handleSubjectClassChange: (name: string, value: any, id: number) => void;
  assignedClassSubject: {
    classArmId: number | null;
    subjectId: number | null;
  }[];
};

const Education = ({
  addSubjectClass,
  assignedClassSubject,
  removeRemoveSubjectClass,
  handleSubjectClassChange,
}: Iprops) => {
  const { data: allSubjects, isLoading } = useGetSubjectList();
  const { data: institutionProfile } = useGetProfile();

  const institutionId = institutionProfile?.userInfo?.esiAdmin?.id;
  const currentSessionId = institutionProfile?.currentSession?.id;
  const { data: allclasses } = useGetInstituteClassArms(
    institutionId,
    currentSessionId
  );
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Subjects and Classes</h2>
      <p>Kindly enter the details below:</p>

      {!isLoading ? (
        <div>
          {assignedClassSubject.map((v: any, i: number) => (
            <div key={i} className='my-10 grid grid-cols-12 gap-6 items-center'>
              <div className='col-span-5'>
                <label htmlFor='' className='text-xs font-bold'>
                  Assign Subject
                </label>
                <div className='mt-1 w-full border p-2 rounded'>
                  <select
                    id=''
                    className='w-full border-none outline-none bg-transparent  text-gray-400'
                    onChange={(e) => {
                      handleSubjectClassChange('classId', e.target.value, i);
                    }}
                  >
                    <option value=''> -- Select an option -- </option>

                    {(allSubjects ?? []).map((item, id) => (
                      <option key={id} value={item.id}>
                        {item.name}
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
                      handleSubjectClassChange('subjectId', e.target.value, i);
                    }}
                  >
                    <option value=''> -- Select an option -- </option>

                    {(allclasses ?? []).map((item: any, id: number) => (
                      <option key={id} value={item.id}>
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
    </section>
  );
};

export default Education;
