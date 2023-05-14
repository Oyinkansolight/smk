/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AssignSubject from '@/components/modal/assignSubject';
import CreateFolder from '@/components/modal/createFolder';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RotatingLines } from 'react-loader-spinner';
import FileContent from '~/svg/file.svg';
import Folder from '~/svg/folder.svg';
import Media from '~/svg/media.svg';
import User from '~/svg/user1.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

const UploadDocument = ({ filesData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateFolder, setisCreateFolder] = useState(false);
  const [isAssign, setisAssign] = useState(false);
  const [action, setAction] = useState<number | null>(null);
  const [fileId, setFileId] = useState(null);

  type iProp = {
    name: string;
    class: string;
    created_by: string;
    date_added: string | any;
    size: string;
    type: string;
    image: any;
  };
  const mockData = [
    {
      name: 'Primary 1 Maths Text Book',
      class: 'Primary 2',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '500kb',
      image: <Folder className='h-6 w-6' />,
      type: 'folder',
    },
    {
      name: 'Calculus Introduction',
      class: 'Primary 2',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '450kb',
      image: <FileContent className='h-6 w-6' />,
      type: 'file',
    },
    {
      name: 'Tutorial on Addition',
      class: 'Primary 3',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '300kb',
      image: <Media className='h-6 w-6' />,
      type: 'media',
    },
    {
      name: 'Primary 1 Maths Text Book',
      class: 'Primary 4',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '803kb',
      image: <Folder className='h-6 w-6' />,
      type: 'folder',
    },
    {
      name: 'Tutorial on Addition',
      class: 'Primary 5',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '262kb',
      image: <FileContent className='h-6 w-6' />,
      type: 'file',
    },
    {
      name: 'Calculus Introduction',
      class: 'Primary 6',
      created_by: 'James Grace',
      date_added: 'May 9, 2023',
      size: '642kb',
      image: <Media className='h-6 w-6' />,
      type: 'media',
    },
  ];
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
    // handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [content, setContent] = useState([]);

  function addNewFolder(newcontent: iProp) {
    setContent([...content, newcontent].reverse());
  }
  function addNewFile(e: any) {
    const file = e.target.files[0];
    const newFile: iProp = {
      name: file.name,
      class: '-',
      created_by: 'Super Admin',
      date_added: Date.now(),
      size: `${Math.floor(file.size / 1024)}kb`,
      image: <FileContent className='h-6 w-6' />,
      type: 'file',
    };
    setContent([...content, newFile].reverse());
    setAction(null);
  }

  const handleAssignSubject = () => {
    // const response = useAssignSubjectsToFile({
    //   fileId,
    //   subjectId
    // })
    console.log(getValues('subject'));
    console.log(getValues('schoolType'));
    console.log(getValues('class'));
  };

  useEffect(() => {
    if (!filesData.isLoading) {
      setContent(filesData.data.data);
    }
  }, [filesData]);


  if (!filesData.isLoading) {
    return (
      <section className='transition-all ease-in-out delay-1000 w-full max-w-[40rem] lg:max-w-full'>
        {isCreateFolder && (
          <CreateFolder
            onClickHandler={handleIsCreateFolderModal}
            addNewFolder={addNewFolder}
          />
        )}
        {isAssign && (
          <AssignSubject
            register={register}
            errors={errors}
            onClickHandler={handleIsAssignModal}
            handleSubmit={handleAssignSubject}
          />
        )}

        <div className='mb-6 flex justify-end items-end relative'>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='w-max flex items-center rounded border border-[#016938] px-6 py-3 text-center text-xs font-medium text-[#016938] '
          >
            Add Document
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

              <input type='file' name='upload_folder' id='upload_folder' hidden />

              <label
                htmlFor='upload_folder'
                className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
              >
                Upload Folder
              </label>
            </div>
          )}
        </div>

        <div className='table-add-student mt-3 overflow-x-auto pb-4 bg-white'>
          <div className=' min-w-[800px] flex justify-end text-base space-x-4 font-semibold border-b p-3'>
            <div className='border shadow rounded'>
              <select
                name='file_type'
                id='file_type'
                className='w-full border-none outline-none bg-transparent text-xs font-normal text-gray-400'
              >
                {' '}
                <option value=''>--File Type--</option>
                <option value='file'>Only Files</option>
                <option value='folder'>Only Folder </option>
                <option value='media'>Only Media </option>
              </select>
            </div>
            <div className='border shadow rounded'>
              <select
                name='file_type'
                id='file_type'
                className='w-full border-none outline-none bg-transparent text-xs font-normal text-gray-400'
              >
                {' '}
                <option value=''>--Selected By--</option>
                <option value='file'>Only Files</option>
                <option value='folder'>Only Folder </option>
                <option value='media'>Only Media </option>
              </select>
            </div>
            <div className='border shadow rounded'>
              <input
                type='date'
                name=''
                id=''
                className='w-full border-none outline-none bg-transparent text-xs font-normal text-gray-400'
              />
            </div>
          </div>

          <div className='min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md  border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
            <div className='col-span-4 pl-2'>Name</div>
            {/* //!!!TODO: change Subject back to Class */}
            <div className='col-span-2'>Subject</div>
            <div className='col-span-2'>Created by</div>
            <div className='col-span-2'>Date Added</div>
            <div className='col-span-2'>Size</div>
          </div>
          {content && content.length > 0 && content.map((item: any, idx: number) => (
            <div
              className=' min-w-[800px] grid grid-cols-12 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
              key={idx}
            >
              <div className='col-span-4 w-max text-center text-[#525F7F] pl-2 flex space-x-2 items-center'>
                <div>
                  <FileContent className='h-6 w-6' />
                </div>
                <h2 className='text-sm font-medium'>{item?.filename}</h2>
              </div>
              <div className='col-span-2'>{item?.subject?.length > 0 ? item?.subject[0].subject : "-"} </div>
              <div className='col-span-2'>{item?.createdBy} </div>
              <div className='col-span-2 w-max text-center  flex space-x-2 items-center'>
                <User alt='avril' className='h-8 w-8 rounded-full' />
                <h2 className='text-sm font-normal'>
                  {moment(item?.createdAt).format('ll')}
                </h2>
              </div>
              <div className='col-span-2 justify-between pr-5 flex items-center'>
                <div>{item?.size ?? "-"}</div>
                <button
                  onClick={() => {
                    setAction(idx + 1);
                  }}
                  className='relative'
                >
                  <BsThreeDotsVertical className='text-lg' />

                  {action == idx + 1 && (
                    <div className='shadow-lg rounded-xl bg-white w-[150px] h-max absolute top-0 -left-[150px] z-10'>
                      <button className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'>
                        Manage Access
                      </button>
                      <button
                        onClick={() => {
                          setisAssign(!isAssign);
                          setFileId(item?.id);
                        }}
                        className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'
                      >
                        Assign to a Subject
                      </button>
                      <button className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'>
                        Rename
                      </button>
                      <button className='p-4 text-black hover:bg-gray-200  text-left font-medium w-full'>
                        Delete
                      </button>
                    </div>
                  )}
                </button>
                {action && (
                  <div
                    className='fixed inset-0 z-[1]'
                    onClick={() => {
                      setAction(null);
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))}

          <div className='min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
            <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
              <svg
                width='6'
                height='8'
                viewBox='0 0 6 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                  fill='#8898AA'
                />
              </svg>
            </div>
            <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
              1
            </div>
            <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
              2
            </div>
            <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
              3
            </div>
            <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
              <svg
                width='6'
                height='8'
                viewBox='0 0 6 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                  fill='#8898AA'
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <div className='flex justify-center items-center h-[40vh]'>
    <RotatingLines
      width="100"
      visible={true}
      strokeWidth="5"
      strokeColor="#4fa94d"
      animationDuration="0.75"
    />
  </div>
};

export default UploadDocument;
