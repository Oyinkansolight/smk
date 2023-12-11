/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PopOverSelect from '@/components/input/PopOverSelect';
import FormInput from '@/components/input/formInput';
import Select from '@/components/input/formSelect';
import FormSelectInstitution from '@/components/input/formSelectInstitution';
import FormSelectTeachers from '@/components/input/formSelectteachers';
import logger from '@/lib/logger';
import { useGetSchools } from '@/server/institution';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type payloadProp = {
  staffId?: string;
  reason?: string;
  newInstitutionId?: string;
};
type Iprops = {
  register: any;
  errors: any;
  staffs: any;
  setPayload?: (v: any) => void;
  payload?: payloadProp;
};

const Biodata = ({ register, errors, staffs, setPayload, payload }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(['']);
  const [selectedStaff, setSelectedStaff] = useState(['']);
  const [currentSelection, setCurrentSelection] = useState('');
  const [itemIndex, setItemIndex] = useState<null | number>(null);

  const [query, setQuery] = useState('');

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 100,
    query,
  });

  const { data: schools, error, refetch } = useGetSchools({ ...pagingData });
  const handleSearch = (value: string) => {
    logger(value);
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index: number) => {
    setItemIndex(index);
  };

  useEffect(() => {
    const getSelecteditem = (index) => {
      if (!index) return;

      if (currentSelection === 'staff') {
        setSelectedStaff([
          `${staffs[index]?.user?.lastName} ${staffs[index]?.user?.firstName}`,
        ]);
      }
      if (currentSelection === 'institution') {
        setSelectedSchool([`${schools?.data[index]?.instituteName}`]);
      }
    };

    if (itemIndex) {
      getSelecteditem(itemIndex);
    }
  }, [itemIndex, schools?.data, staffs?.data]);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <PopOverSelect
        open={openStaffModal}
        key1='user.firstName'
        key2='user.lastName'
        setOpen={setOpenStaffModal}
        title='All Staffs'
        data={staffs}
        handleSearch={handleSearch}
        description="Select Staff's Name"
        setSelectedItem={(value) => {
          console.log(value);
          setPayload &&
            setPayload((prev: payloadProp) => {
              return {
                ...prev,
                staffId: value,
              };
            });
          setCurrentSelection('staff');
        }}
        setSelectedIndex={handleItemIndex}
      />

      <div className='my-10 w-full gap-6'>
        <Select
          onClick={() => setOpenStaffModal(!openStaffModal)}
          label='Select new staff'
          options={selectedStaff}
          formValue={selectedStaff[0]}
        />
      </div>
      <PopOverSelect
        open={open}
        key1='instituteName'
        key2=''
        setOpen={setOpen}
        title='All schools'
        data={schools?.data}
        handleSearch={handleSearch}
        description="Select institution's Name"
        setSelectedItem={(value) => {
          console.log(value);
          setPayload &&
            setPayload((prev: payloadProp) => {
              return {
                ...prev,
                newInstitutionId: value,
              };
            });
          setCurrentSelection('institution');
        }}
        setSelectedIndex={handleItemIndex}
      />

      <div className='my-10 w-full gap-6'>
        <Select
          onClick={() => setOpen(!open)}
          label='Select new institution'
          options={selectedSchool}
          formValue={selectedSchool[0]}
        />
      </div>

      <div className='my-10 '>
        <FormInput
          label='Enter Reason for Transfer'
          placeholder='Details here'
          name='reason'
          register={register}
          validation={{
            required: 'Reason for transfer is required',
          }}
          helper={
            errors?.reason && {
              message: errors?.reason?.message,
              type: 'danger',
            }
          }
        />
      </div>
    </section>
  );
};

export default Biodata;
