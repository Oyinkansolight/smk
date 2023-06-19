import Toggle from '@/components/input/Toggle';
import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import FormSelectSubject from '@/components/input/formSelectSubject';
import { useGetSubjectList } from '@/server/institution';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler: () => void;
  setStartDate: (v: string | number) => void;
  setEndDate: (v: string | number) => void;
  setSubjectId1: (v: string | number) => void;
  setSubjectId2: (v: string | number) => void;
  setSubjectId3: (v: string | number) => void;
  setSubjectId4: (v: string | number) => void;
  setSubjectId5: (v: string | number) => void;
  seteventname: (v: string | number) => void;
  setType: (v: string | number) => void;
  setactivity1: (v: boolean) => void;
  activity1: boolean;
  setactivity2: (v: boolean) => void;
  activity2: boolean;
  setactivity3: (v: boolean) => void;
  activity3: boolean;
  setactivity4: (v: boolean) => void;
  activity4: boolean;
  setactivity5: (v: boolean) => void;
  activity5: boolean;
  setactivityname1: (v: string | number) => void;
  activityname1: string | number;
  setactivityname2: (v: string | number) => void;
  activityname2: string | number;
  setactivityname3: (v: string | number) => void;
  activityname3: string | number;
  setactivityname4: (v: string | number) => void;
  activityname4: string | number;
  setactivityname5: (v: string | number) => void;
  activityname5: string | number;
  type: string | number;
  loading: boolean;
}

//Change to trigger build

function AddActivityName({
  onClickHandler,
  setStartDate,
  setEndDate,
  setSubjectId1,
  setSubjectId2,
  setSubjectId3,
  setSubjectId4,
  setSubjectId5,
  seteventname,
  SubmitHandler,
  setactivity1,
  activity1,
  setactivity2,
  activity2,
  setactivity3,
  activity3,
  setactivity4,
  activity4,
  setactivity5,
  activity5,
  setactivityname1,
  setactivityname2,
  setactivityname3,
  setactivityname4,
  setactivityname5,
  // activityname1,
  // activityname2,
  // activityname3,
  // activityname4,
  // activityname5,
  loading,
  type,
  setType,
}: propType) {
  const { data } = useGetSubjectList();

  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] max-h-[600px] rounded overflow-y-auto flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-4 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Content</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>

          <div className='w-full grid grid-cols-2 gap-4'>
            <FormSelect
              label='Select Type'
              name='schoolType'
              options={['event', 'period']}
              setFormValue={setType}
            />
            <div></div>

            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='time'
              placeholder='Select an option'
              setFormValue={setStartDate}
            />
            <FormInput
              label='Select End Date'
              name='schoolType'
              type='time'
              placeholder='Select an option'
              setFormValue={setEndDate}
            />
          </div>
          {type === 'period' ? (
            <div>
              {data && (
                <div className='w-full grid grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Monday</h1>
                    </div>
                    {activity1 ? (
                      <FormInput
                        label='Enter Activity Name*'
                        name='schoolType'
                        type='text'
                        placeholder='Select an option'
                        setFormValue={setactivityname1}
                      />
                    ) : (
                      <FormSelectSubject
                        label='Select Subject'
                        name='schoolType'
                        options={data}
                        setFormValue={setSubjectId1}
                      />
                    )}
                    <Toggle setactivity={setactivity1} activity={activity1} />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Tuesday</h1>
                    </div>
                    {activity2 ? (
                      <FormInput
                        label='Enter Activity Name*'
                        name='schoolType'
                        type='text'
                        placeholder='Select an option'
                        setFormValue={setactivityname2}
                      />
                    ) : (
                      <FormSelectSubject
                        label='Select Subject'
                        name='schoolType'
                        options={data}
                        setFormValue={setSubjectId2}
                      />
                    )}
                    <Toggle setactivity={setactivity2} activity={activity2} />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Wednesday</h1>
                    </div>
                    {activity3 ? (
                      <FormInput
                        label='Enter Activity Name*'
                        name='schoolType'
                        type='text'
                        placeholder='Select an option'
                        setFormValue={setactivityname3}
                      />
                    ) : (
                      <FormSelectSubject
                        label='Select Subject'
                        name='schoolType'
                        options={data}
                        setFormValue={setSubjectId3}
                      />
                    )}
                    <Toggle setactivity={setactivity3} activity={activity3} />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Thursday</h1>
                    </div>
                    {activity4 ? (
                      <FormInput
                        label='Enter Activity Name*'
                        name='schoolType'
                        type='text'
                        placeholder='Select an option'
                        setFormValue={setactivityname4}
                      />
                    ) : (
                      <FormSelectSubject
                        label='Select Subject'
                        name='schoolType'
                        options={data}
                        setFormValue={setSubjectId4}
                      />
                    )}
                    <Toggle setactivity={setactivity4} activity={activity4} />
                  </div>
                  <div className='bg-white border rounded p-4'>
                    <div className='border-b py-1 mb-2'>
                      <h1 className='text-lg text-[#A5A5A5]'>Friday</h1>
                    </div>
                    {activity5 ? (
                      <FormInput
                        label='Enter Activity Name*'
                        name='schoolType'
                        type='text'
                        placeholder='Select an option'
                        setFormValue={setactivityname5}
                      />
                    ) : (
                      <FormSelectSubject
                        label='Select Subject'
                        name='schoolType'
                        options={data}
                        setFormValue={setSubjectId5}
                      />
                    )}
                    <Toggle setactivity={setactivity5} activity={activity5} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='w-full grid grid-cols-2 gap-4 p-3 bg-[#F5F6F7] rounded-lg'>
              <div className='bg-white border rounded p-4'>
                <div className='border-b py-1 mb-2'>
                  <h1 className='text-lg text-[#A5A5A5]'>All Week</h1>
                </div>
                <FormInput
                  type='text'
                  placeholder='Enter details here'
                  label='Entet Event Name'
                  name='eventname'
                  setFormValue={seteventname}
                />
              </div>
            </div>
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
