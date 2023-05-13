'use client';

import AssignSubject from '@/components/modal/assignSubject';
import CreateFolder from '@/components/modal/createFolder';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import FileContent from '~/svg/file.svg';
import Folder from '~/svg/folder.svg';
import Media from '~/svg/media.svg';
import User from '~/svg/user1.svg';

const UploadDocument = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateFolder, setisCreateFolder] = useState(false);
  const [isAssign, setisAssign] = useState(false);
  const [action, setAction] = useState<number | null>(null);

  const mockData = [
    {
      name: 'Primary 1 Maths Text Book',
      class: 'Primary 2',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '500kb',
      image: <Folder className='h-6 w-6' />,
    },
    {
      name: 'Calculus Introduction',
      class: 'Primary 2',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '450kb',
      image: <FileContent className='h-6 w-6' />,
    },
    {
      name: 'Tutorial on Addition',
      class: 'Primary 3',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '300kb',
      image: <Media className='h-6 w-6' />,
    },
    {
      name: 'Primary 1 Maths Text Book',
      class: 'Primary 4',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '803kb',
      image: <Folder className='h-6 w-6' />,
    },
    {
      name: 'Tutorial on Addition',
      class: 'Primary 5',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '262kb',
      image: <FileContent className='h-6 w-6' />,
    },
    {
      name: 'Calculus Introduction',
      class: 'Primary 6',
      created_by: 'James Grace',
      date_added: 'Nov 2, 2022',
      size: '642kb',
      image: <Media className='h-6 w-6' />,
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

    formState: { errors },
    // handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  return (
    <section>
      {isCreateFolder && (
        <CreateFolder onClickHandler={handleIsCreateFolderModal} />
      )}
      {isAssign && (
        <AssignSubject
          register={register}
          errors={errors}
          onClickHandler={handleIsAssignModal}
        />
      )}

      <div className='mb-6 flex justify-end items-end relative'>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className='w-max flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
        >
          Add Document
          <span className='ml-4'>
            <svg
              width='9'
              height='6'
              viewBox='0 0 9 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.136086 0.607068C0.300449 0.43941 0.557649 0.424168 0.738891 0.561343L0.790815 0.607068L4.50049 4.3913L8.21016 0.607068C8.37452 0.43941 8.63172 0.424168 8.81296 0.561343L8.86489 0.607068C9.02925 0.774727 9.04419 1.03708 8.90972 1.22196L8.86489 1.27493L4.82785 5.39293C4.66349 5.56059 4.40629 5.57583 4.22505 5.43866L4.17312 5.39293L0.136086 1.27493C-0.0447111 1.0905 -0.0447111 0.791493 0.136086 0.607068Z'
                fill='#3361FF'
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
            <input type='file' name='upload_file' id='upload_file' hidden />
            <label
              htmlFor='upload_file'
              className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
            >
              Upload File
            </label>
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

      <div className='table-add-student mt-3  pb-4 bg-white'>
        <div className='flex justify-end text-base space-x-4 font-semibold border-b p-3'>
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

        <div className='table-header grid grid-cols-12 gap-4 rounded-t-md  border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-4 pl-2'>Name</div>
          <div className='col-span-2'>Class</div>
          <div className='col-span-2'>Created by</div>
          <div className='col-span-2'>Date Added</div>
          <div className='col-span-2'>Size</div>
        </div>
        {mockData.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'
            key={idx}
          >
            <div className='col-span-4 w-max text-center text-[#525F7F] pl-2 flex space-x-2 items-center'>
              <div>{item.image}</div>
              <h2 className='text-sm font-medium'>{item.name}</h2>
            </div>
            <div className='col-span-2'>{item.class} </div>
            <div className='col-span-2'>{item.created_by} </div>
            <div className='col-span-2 w-max text-center  flex space-x-2 items-center'>
              <User alt='avril' className='h-8 w-8 rounded-full' />
              <h2 className='text-sm font-normal'>{item.date_added}</h2>
            </div>
            <div className='col-span-2 justify-between pr-5 flex items-center'>
              <div>{item.size}</div>
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

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
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
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-secondary p-2 text-white'>
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
};

export default UploadDocument;
