/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AssignSubject from '@/components/modal/assignSubject';
import CreateFolder from '@/components/modal/createFolder';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import { useAssignSubjectsToFile } from '@/server/library';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Empty from '~/svg/empty.svg';

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

const UploadDocument = ({
  data,
  isLoading,
  variant,
  canUpload = true,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateFolder, setisCreateFolder] = useState(false);
  const [isAssign, setisAssign] = useState(false);
  // const [action, setAction] = useState<number | null>(null);
  const [fileId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | any>();
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getFileURL = async () => {
      // const url = await getURL(path);
      // setUrl(url);
      await getURL('institute_materials/AITEO_Catering_20210106.pdf').then(
        (v) => setUrl(v)
      );
      logger(url);
    };
    getFileURL();
  }, [url]);

  const handleUseAssignSubjectsToFile = useAssignSubjectsToFile();

  function handleIsCreateFolderModal() {
    setisCreateFolder(!isCreateFolder);
  }
  function handleIsAssignModal() {
    setisAssign(!isAssign);
  }
  const {
    register,
    getValues,
    formState: { errors },
    control,
    // handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const handleAssignSubject = async () => {
    setLoading(true);
    try {
      const response = await handleUseAssignSubjectsToFile.mutateAsync({
        fileId: fileId as unknown as any,
        subjectId: (getValues('subject') as { value: number }[]).map(
          (v) => v.value
        ),
      });

      if (response) {
        toast.success('File assigned successful');
        setLoading(false);
        setisAssign(!isAssign);
      }
    } catch (error) {
      toast.error('An error occured');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setContent(data);
    }
  }, [data, isLoading]);

  return (
    <section className='transition-all ease-in-out delay-1000 w-full max-w-[40rem] lg:max-w-full'>
      {isCreateFolder && (
        <CreateFolder
          onClickHandler={handleIsCreateFolderModal}
          addNewFolder={() => 'true'}
        />
      )}
      {isAssign && (
        <AssignSubject
          control={control}
          errors={errors}
          loading={loading}
          onClickHandler={handleIsAssignModal}
          handleSubmit={handleAssignSubject}
        />
      )}

      {canUpload && (
        <div className='mb-6 flex justify-end items-end relative'>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={clsxm(
              variant === 'secondary' && '!border-blue-500 text-blue-500',
              variant === 'primary' && 'border-[#016938] text-[#016938]',
              'w-max flex items-center rounded border  px-6 py-3 text-center text-xs font-medium'
            )}
          >
            Manage Classes & Subjects
            <span className='ml-4'>
              <svg
                width='10'
                height='7'
                viewBox='0 0 10 7'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.635629 1.10707C0.799992 0.93941 1.05719 0.924168 1.23843 1.06134L1.29036 1.10707L5.00003 4.8913L8.7097 1.10707C8.87407 0.93941 9.13127 0.924168 9.31251 1.06134L9.36443 1.10707C9.52879 1.27473 9.54374 1.53708 9.40926 1.72196L9.36443 1.77493L5.32739 5.89293C5.16303 6.06059 4.90583 6.07583 4.72459 5.93866L4.67267 5.89293L0.635629 1.77493C0.454831 1.5905 0.454831 1.29149 0.635629 1.10707Z'
                  fill='#016938'
                />
              </svg>
            </span>
          </button>
          {isOpen && (
            <div
              className='fixed inset-0 z-[9]'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
          {isOpen && (
            <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-white w-[160px] h-max absolute top-12 right-0 z-10'>
              <button
                onClick={() => {
                  setisCreateFolder(!isCreateFolder);
                }}
                className='p-3 hover:bg-slate-100  text-left font-medium w-full'
              >
                Create Folder
              </button>
              {/* <input
                type='file'
                onChange={(e) => {
                  addNewFile(e);
                }}
                name='upload_file'
                id='upload_file'
                hidden
              /> */}
              <Link href='/super-admin/add-material'>
                <label
                  htmlFor='upload_file'
                  className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                >
                  Upload File
                </label>
              </Link>

              <input
                type='file'
                name='upload_folder'
                id='upload_folder'
                hidden
              />

              <label
                htmlFor='upload_folder'
                className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Upload Folder
              </label>
            </div>
          )}
        </div>
      )}

      <div className='table-add-student mt-3 overflow-x-auto pb-4 bg-white'>
        <div className=' min-w-[800px] flex  text-base space-x-4 font-semibold border-b p-3'>
          <h1 className='text-[#6B7A99] text-base'>Summary</h1>
        </div>

        {true && (
          <div className='py-20 grid justify-center w-full'>
            <div className='flex flex-col justify-center items-center space-y-4'>
              <Empty className='h-28 w-28' />
              <p>You have not added classes and subjects yet</p>
              <Link
                href='/super-admin/add-class-subject'
                className='py-2 border shadow px-6 text-primary font-medium'
              >
                Add Classes and Subjects
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadDocument;
