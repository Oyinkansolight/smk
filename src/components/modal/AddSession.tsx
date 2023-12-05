import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import { INSTITUTION_TYPES } from '@/constant/institution';
import { subtractMonthsFromCurrentDate } from '@/lib/helper';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler?: () => void;
  setinstitutionType: (v: string | number) => void;
  setfirstendDate: (v: string | number) => void;
  setsecondendDate: (v: string | number) => void;
  setthirdendDate: (v: string | number) => void;
  setfirststartDate: (v: string | number) => void;
  setsecondstartDate: (v: string | number) => void;
  setthirdstartDate: (v: string | number) => void;
  loading: boolean;
}

function AddActivityName({
  onClickHandler,
  setinstitutionType,
  SubmitHandler,
  setfirstendDate,
  setsecondendDate,
  setthirdendDate,
  setfirststartDate,
  setsecondstartDate,
  setthirdstartDate,

  loading,
}: propType) {
  return (
    <div className='fixed inset-0 z-[99] py-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] h-full overflow-y-auto flex-col space-y-4 bg-white p-4 hideScroll'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Add Session</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>

          <div className='w-full grid md:grid-cols-2 gap-4 pb-6'>
            <FormSelect
              required
              label='Select School Type'
              name='schoolType'
              options={[
                INSTITUTION_TYPES.ECCDE,
                INSTITUTION_TYPES.PRIMARY,
                INSTITUTION_TYPES.SECONDARY,
                INSTITUTION_TYPES.TERTIARY,
              ]}
              setFormValue={setinstitutionType}
            />

            {/* <FormInput
              disabled
              type='text'
              name='session'
              inputClassName='bg-[#C8C8C8]'
              label='Next Available Session*'
              placeholder='2022/2023'
            /> */}
          </div>

          <div className='flex flex-col gap-5 bg-[#F5F6F7] rounded-lg p-[10px]'>
            <div className='flex flex-col gap-[10px] bg-white py-5 px-[11px] rounded-[3px] border-[0.5px] border-[#ACACAC]'>
              <h1 className='text-lg text-[#A5A5A5]'>First Term</h1>
              <div className='h-px w-full bg-[#B2B3B4] mb-6' />
              <div className='w-full grid md:grid-cols-2 gap-4'>
                {/* <FormSelect
                  label='Select Number of Weeks'
                  name='schoolType'
                  options={numbers}
                  setFormValue={setfirstnoofweeks}
                /> */}
                <FormInput
                  label='Select Start Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setfirststartDate}
                  min={subtractMonthsFromCurrentDate()}
                />
                <FormInput
                  label='Select End Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setfirstendDate}
                  min={subtractMonthsFromCurrentDate()}
                />
              </div>
            </div>

            <div className='flex flex-col gap-[10px] bg-white py-5 px-[11px] rounded-[3px] border-[0.5px] border-[#ACACAC]'>
              <h1 className='text-lg text-[#A5A5A5]'>Second Term</h1>
              <div className='h-px w-full bg-[#B2B3B4] mb-6' />
              <div className='w-full grid md:grid-cols-2 gap-4'>
                {/* <FormSelect
                label='Select Number of Weeks'
                name='schoolType'
                options={numbers}
                setFormValue={setsecondnoofweeks}
              /> */}

                <FormInput
                  label='Select Start Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setsecondstartDate}
                  min={subtractMonthsFromCurrentDate()}
                />
                <FormInput
                  label='Select End Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setsecondendDate}
                  min={subtractMonthsFromCurrentDate()}
                />
              </div>
            </div>

            <div className='flex flex-col gap-[10px] bg-white py-5 px-[11px] rounded-[3px] border-[0.5px] border-[#ACACAC]'>
              <h1 className='text-lg text-[#A5A5A5]'>Third Term</h1>
              <div className='h-px w-full bg-[#B2B3B4] mb-6' />
              <div className='w-full grid md:grid-cols-2 gap-4'>
                {/* <FormSelect
                label='Select Number of Weeks'
                name='schoolType'
                options={numbers}
                setFormValue={setthirdnofweeks}
              /> */}

                <FormInput
                  label='Select Start Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setthirdstartDate}
                  min={subtractMonthsFromCurrentDate()}
                />
                <FormInput
                  label='Select End Date'
                  name='schoolType'
                  type='date'
                  placeholder='Select an option'
                  setFormValue={setthirdendDate}
                  min={subtractMonthsFromCurrentDate()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={SubmitHandler}
            className='w-[248px] h-10 rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] justify-center align-center flex gap-2'
          >
            {loading ? <ImSpinner2 className='animate-spin' /> : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
