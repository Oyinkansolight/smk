/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@/components/input';
import DragDropGeneric from '@/components/input/DragDropGeneric';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

// import Upload_icon from '~/svg/upload_icon.svg';

interface propType {
  onClickHandler?: () => void;
  setFile: (file?: File) => void;
  bulkStudentUpload: () => void;
  loading: boolean;
  file: File | undefined;
  link?: string;
  isReplace?: boolean;
  handleIsReplace?: () => void;
}

function BulkUser({
  onClickHandler,
  setFile,
  file,
  bulkStudentUpload,
  loading = false,
  link,
  isReplace,
  handleIsReplace
}: propType) {
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-full flex-col space-y-4 rounded-lg bg-white p-4'>
        <div className='flex justify-between'>
          <div></div>
          <h1 className='text-center text-lg font-bold text-[#333840]'>
            Import Bulk Users
          </h1>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        {/* <div className='mt-4  px-10 py-10'>
          <div className='rounded-md flex flex-col justify-center items-center py-10 border'>
            <p className='text-center text-lg font-medium text-[#333840]'>
              Upload your document
            </p>
            {!file ? (
              <Upload_icon className='w-[50px] h-[50px] my-8' />
            ) : (
              <div> File Uploaded </div>
            )}
            <input
              type='file'
              name='upload'
              id='upload'
              hidden
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }}
            />
            {!file && (
              <p>
                Drag and drop your CSV file <strong>here</strong>, or Click
                <label htmlFor='upload' className='mx-1 font-bold'>
                  here
                </label>{' '}
                to upload
              </p>
            )}
            <a
              href='/pdfs/upload_student_template.xlsx'
              download
              className='text-[#011739] my-4 font-bold'
            >
              Download sample template
            </a>
          </div>
        </div> */}
        <DragDropGeneric value={file} onChange={setFile} link={link} />

        <div className='flex flex-col gap-4'>
          <div className='flex justify-center mt-2'>
            <button
              onClick={bulkStudentUpload}
              className='w-max rounded border bg-secondary px-8 py-3 text-xs text-[#fff] '
            >
              {loading ? <ImSpinner2 className='animate-spin' /> : 'Submit'}
            </button>
          </div>

          <div className='flex flex-row items-center gap-4 justify-end'>
            <div className='text-xs font-bold'>Replace all</div>
            <Checkbox isChecked={isReplace} onClick={handleIsReplace} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkUser;
