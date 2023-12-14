/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PopOverSelect from '@/components/input/PopOverSelect';
import FormInput from '@/components/input/formInput';
import Select from '@/components/input/formSelect';
import logger from '@/lib/logger';
import { useGetSchools } from '@/server/institution';
import { useEffect, useState } from 'react';
import { Staff } from '@/types/institute';

type payloadProp = {
  staffId?: string;
  reason?: string;
  newInstitutionId?: string;
};
type Iprops = {
  register: any;
  errors: any;
  staffs: any;
  payload?: payloadProp;
  staffId?: string;
  currentStaff?: Staff;
  newInstitutionId?: string;
  setPayload?: (v: any) => void;
  handleStaffSearch?: (v: string) => void;
  handleStaffPrevPage?: (v: number) => void;
  handleStaffNextPage?: (v: number) => void;
};

const Biodata = ({ register, errors, staffs, setPayload, payload, handleStaffSearch, handleStaffPrevPage, handleStaffNextPage, staffId, newInstitutionId, currentStaff }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState([currentStaff?.institution?.instituteName ?? '']);
  const [selectedStaff, setSelectedStaff] = useState([`${currentStaff?.user?.lastName} ${currentStaff?.user?.firstName}` ?? '']);
  const [currentSelection, setCurrentSelection] = useState('');
  const [itemIndex, setItemIndex] = useState<null | number>(null);

  const [query, setQuery] = useState('');

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
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

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  useEffect(() => {
    const getSelecteditem = (index) => {
      if (!index) return;

      if (currentSelection === 'staff') {
        setSelectedStaff([
          `${staffs?.data[index]?.user?.lastName} ${staffs?.data[index]?.user?.firstName}`,
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
        data={staffs?.data}
        handleSearch={handleStaffSearch}
        description="Select Staff's Name"
        handlePrevPage={handleStaffPrevPage}
        handleNextPage={handleStaffNextPage}
        totalPages={staffs?.paging?.totalPage}
        setSelectedItem={(value) => {
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
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        totalPages={schools?.paging?.totalPage}
        description="Select institution's Name"
        setSelectedItem={(value) => {
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
