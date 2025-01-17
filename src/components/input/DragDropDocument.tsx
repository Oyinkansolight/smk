'use client';

import clsxm from '@/lib/clsxm';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Close from '~/svg/close.svg';
import Upload from '~/svg/upload.svg';

type propType = {
  label: string;
  setImageData: (value: any | null) => void;
  imageName: string;
  setImageName: (value: string) => void;
  setFileSize: (value: number) => void;
  className?: string;
};

const DragDropDocument = ({
  label,
  setImageData,
  setImageName,
  imageName,
  className,
  setFileSize,
}: propType) => {
  const handleImage = (file: any) => {
    if (file) {
      setImageData(file);
      setImageName(file?.name);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      handleImage(files[0]);
      setFileSize(files[0].size);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className='text-[10px]'>
      <div
        onDrop={(e) => {
          handleDrop(e);
        }}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <label htmlFor='' className='text-xs font-bold'>
          {label}
        </label>
        <div className={clsxm(className, 'mt-1 w-full border p-5 rounded')}>
          <input
            type='file'
            id='upload'
            hidden
            max={6 * 1024 * 1024}
            accept='application/pdf, video/*, vid, image/*'
            onChange={(e) => {
              if (e.target.files) {
                handleImage(e.target.files[0]);
                setFileSize(e.target.files[0].size);
              }
            }}
          />
          {imageName ? (
            <div className='flex justify-between'>
              <span>{imageName}</span>
              <button
                onClick={() => {
                  setImageName('');
                }}
              >
                <Close alt='avril' className='h-4 w-4 ml-1' />
              </button>
            </div>
          ) : (
            <div className='text-gray-400 flex items-center space-x-2 truncate font-semibold'>
              <Upload alt='avril' className='h-4 w-4 mr-1' /> Drag and drop a
              file, or
              <label
                className='text-[#008146] ß cursor-pointer'
                htmlFor='upload'
              >
                browse
              </label>
              <span>(Max 6MB)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropDocument;
