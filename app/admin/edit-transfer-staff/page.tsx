/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/admin/TransferStaff/Details';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useGetTeachersListByInstitution,
  useUpdateStaffTransfer,
} from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';


const EditTransferStaff = () => {
  const params = useSearchParams();
  const reason = params?.get('reason');
  const staffId = params?.get('staffId');
  const transferId = params?.get('transferId');
  const newInstitutionId = params?.get('newInstitutionId');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      reason,
    }
  });
  const { data: institutionProfile } = useGetProfile();

  const [loading, setLoading] = useState(false);
  const [stage] = useState(1);

  const [query, setQuery] = useState('');

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    instituteId: institutionProfile?.userInfo?.esiAdmin?.id,
  });

  const [payload, setPayload] = useState({
    staffId: staffId ?? '',
    reason: reason ?? '',
    newInstitutionId: newInstitutionId ?? '',
  });


  const { data: staffs, isLoading } = useGetTeachersListByInstitution({ ...pagingData });

  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  const handleUpdateStaffTransfer = useUpdateStaffTransfer();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const parsedPayload = {
      ...payload,
      ...data,
      id: transferId,
    }

    if (parsedPayload.staffId && parsedPayload.newInstitutionId && parsedPayload.reason)

      try {
        setLoading(true);
        const response = await handleUpdateStaffTransfer.mutateAsync(parsedPayload);

        if (response) {
          toast.success('Staff transfer updated successfully');
          setIsOpen(true);
          setLoading(false);
        }
      } catch (error) {
        toast.error(getErrMsg(error));
        setLoading(false);
      }
  };

  const stepperData = [
    {
      stage: 1,
      stageName: 'TransferBio Details',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Staff transfer request successful'
          description='Hurray!!!'
          link='/admin/all-transfer-request-staff'
          textLink='Manage Staff'
        />
      )}
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Edit Transfer Staff</h1>

      <Stepper
        variant='#008146'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        {isLoading && (
          <div className='flex justify-center items-center h-[40vh]'>
            <RotatingLines
              width='100'
              visible={true}
              strokeWidth='5'
              strokeColor='#4fa94d'
              animationDuration='0.75'
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {staffs?.data && (
            <Details
              errors={errors}
              staffs={staffs}
              payload={payload}
              staffId={staffId ?? ''}
              register={register}
              setPayload={setPayload}
              handleStaffSearch={handleSearch}
              handleStaffNextPage={handleNextPage}
              handleStaffPrevPage={handlePrevPage}
              newInstitutionId={newInstitutionId ?? ''}
            />
          )}

          <div className='my-10 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-primary md:px-6'
              >
                Prev
              </button>

              <button className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '>
                {loading ? <ImSpinner2 /> : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTransferStaff;
