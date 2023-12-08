/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import SearchInput from '@/components/input/SearchInput';
import Input from '@/components/input/formInput';
import Stepper from '@/components/stepper';


import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useCreateNewRole, useGetPermissionList } from '@/server/Permission';
import Button from '@/components/buttons/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LongTextSkeleton from '@/components/skeletons/LongText';

const stepperData = [
  {
    stage: 1,
    stageName: 'Roles And Permissions',
  },
];

const AddClass = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [permissions, setPermissions] = useState<any>([]);
  const [roleName, setRoleName] = useState<string | number>('');
  const [roleDesc, setRoleDesc] = useState<string | number>('');
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 8,
    // query,
  });
  const [activatedPermissions, setActivatedPermissions] = useState<any>([]);

  const createRole = useCreateNewRole();
  const { data: allPermission, isLoading: isLoadingPermissions } = useGetPermissionList(pagingData);


  // const handleSearch = (value: string) => {
  //   setQuery(value);
  //   setPagingData({ ...pagingData, page: 1, query: value });
  // };

  const handleNextPage = (e) => {
    e.preventDefault();
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };


  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage] = useState(1);


  const handleTransferToActivated = (e) => {
    e.preventDefault();
    const selected = permissions.filter((v: any) => v.checked === true);
    const uncheckAllSelected = selected.map((v: any) => ({ ...v, checked: false }));
    setActivatedPermissions([...activatedPermissions, ...uncheckAllSelected]);
    setPermissions(permissions.filter((v: any) => v.checked === false));
  }

  const handleTransferToPermissions = (e) => {
    e.preventDefault();
    const selected = activatedPermissions.filter((v: any) => v.checked === true);
    const uncheckAllSelected = selected.map((v: any) => ({ ...v, checked: false }));
    setPermissions([...permissions, ...uncheckAllSelected]);
    setActivatedPermissions(activatedPermissions.filter((v: any) => v.checked === false));
  }

  const handleCheck = (id: string) => {
    const newPermissions = permissions.map((v: any) => {
      if (v.id === id) {
        return { ...v, checked: !v.checked };
      }
      return v;
    });
    setPermissions(newPermissions);
  }

  const handleActivatedCheck = (id: string) => {
    const newPermissions = activatedPermissions.map((v: any) => {
      if (v.id === id) {
        return { ...v, checked: !v.checked };
      }
      return v;
    });
    setActivatedPermissions(newPermissions);
  }

  const onSubmit = async () => {
    if (activatedPermissions.length === 0) {
      toast.error('Please select at least one permission');
      return;
    }

    const permissionIds = activatedPermissions.map((v: any) => v.id);
    const payload: any = {
      name: roleName,
      description: roleDesc,
      permissionIds,
      type: 'role',
      isOverride: false,
    };

    try {
      await createRole.mutateAsync(payload);
      toast.success('Role created successfully');
      setRoleName('');
      setRoleDesc('');
      setActivatedPermissions([]);
      setPermissions([]);
      router.push('/super-admin/account/manage-access-roles');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    if (allPermission?.data) {
      setPermissions([]);

      allPermission.data
        .filter(i => !activatedPermissions.some((v: any) => v.id === i.id))
        .map((v) => {
          setPermissions((prev: any) => [
            ...prev,
            {
              id: v.id,
              checked: false,
              label: `${v.action} ${v.target}`,
            },
          ]);
        });
    }
  }
    , [activatedPermissions, allPermission?.data]);

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Manage Role</h1>

      <Stepper
        variant='#007AFF'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <form onSubmit={handleSubmit(onSubmit)} className='table-add-permission mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <h4 className='text-gray-500'>Kindly enter the details below:</h4>
        <div className='my-4 grid md:grid-cols-2 gap-4 py-2 border-b'>
          <Input
            label='Role Name'
            placeholder='Enter Details Here'
            name='roleName'
            formValue=''
            setFormValue={setRoleName}
            register={register}
            helper={
              errors?.roleName && {
                message: 'Role Name is required',
                type: 'danger',
              }
            }
          />
          <Input
            label='Role Description'
            placeholder='Enter Details Here'
            name='roleDesc'
            formValue=''
            setFormValue={setRoleDesc}
            register={register}
            helper={
              errors?.roleDesc && {
                message: 'Role description is required',
                type: 'danger',
              }
            }
          />
        </div>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-2 items-center justify-center'>
            <div className='col-span-5'>
              <div className='mb-2 bg-[#F6F9FC] p-2 text-center w-full'>
                <h2 className='text-base'>Permissions</h2>
              </div>
              <div className='border bg-[#F6F9FC] p-2 rounded-lg w-full h-[450px] overflow-hidden overflow-y-scroll'>
                <div className='px-6 mb-3'>
                  <SearchInput />
                </div>

                {!isLoadingPermissions ?
                  permissions.length > 0 ?
                    permissions.map((v, id) => (
                      <div key={id} className='flex space-x-3 p-3 items-center'>
                        <input onChange={() => handleCheck(v.id)} checked={v.checked} type='checkbox' />
                        <p className='text-base font-medium uppercase'>{v.label}</p>
                      </div>
                    )) : (
                      <div className='py-4'>
                        <p className='text-center text-gray-500'>No Permission Found</p>
                      </div>
                    )
                  : (
                    <div className='flex flex-col gap-3'>
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                      <LongTextSkeleton />
                    </div>
                  )}
              </div>

              <div className='flex flex-row justify-center gap-4 mt-4'>
                <Button disabled={pagingData.page === 1} onClick={handlePrevPage}>
                  <IoIosArrowBack className='text-xl font-normal' />{" "}Prev
                </Button>

                <Button disabled={allPermission?.paging?.totalPage === pagingData.page} onClick={handleNextPage}>
                  Next<IoIosArrowForward className='text-xl font-normal' />{" "}
                </Button>
              </div>
            </div>

            <div className='col-span-2'>
              <div className='space-y-16 flex flex-col items-center justify-center'>
                <button onClick={handleTransferToActivated} className='bg-[#F6F9FC] p-2 rounded-md w-min'>
                  <IoIosArrowForward className='text-[#008146] text-4xl font-normal' />
                </button>
                <button onClick={handleTransferToPermissions} className='bg-[#F6F9FC] p-2 rounded-md w-min'>
                  <IoIosArrowBack className='text-[#008146] text-4xl font-normal' />
                </button>
              </div>
            </div>

            <div className='col-span-5'>
              <div className='mb-2 bg-[#F6F9FC] p-2 text-center w-full'>
                <h2 className='text-base'>Activated Permissions</h2>
              </div>
              <div className='border bg-[#FFF] p-2 rounded-lg w-full h-[450px] overflow-hidden overflow-y-scroll'>
                <div className='px-6 mb-3'>
                  <SearchInput />
                </div>

                {activatedPermissions.map((v, id) => (
                  <div key={id} className='flex space-x-3 p-3 items-center'>
                    <input onChange={() => handleActivatedCheck(v.id)} checked={v.checked} type='checkbox' />
                    <p className='text-base font-medium uppercase'>{v.label}</p>
                  </div>
                ))}
              </div>
              <div className='mt-4 h-[36px] w-2' />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button type='submit' className='border  bg-[#016938] text-white rounded px-4 py-2'>
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddClass;
