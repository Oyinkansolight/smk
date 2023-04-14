'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Close from '~/svg/close.svg';
import Upload from '~/svg/upload.svg';

type propType = {
  label: string;
  setImageData: (value: any) => void;
  imageName: string;
  setImageName: (value: string) => void;
};

const Input = ({ label, setImageData, setImageName, imageName }: propType) => {
  const handleImage = (file: any) => {
    setImageData(file);
    setImageName(file.name);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      handleImage(files[0]);
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
    <div className=''>
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
        <div className='mt-1 w-full border p-5 rounded'>
          <input
            type='file'
            id='upload'
            hidden
            accept='image/*'
            onChange={(e) => {
              handleImage(e.target.files);
            }}
          />
          {imageName ? (
            <div className='flex justify-between'>
              {' '}
              <span>{imageName}</span>{' '}
              <Close
                alt='avril'
                className='h-4 w-4 ml-1'
                onClick={() => {
                  handleImage(null);
                }}
              />{' '}
            </div>
          ) : (
            <div className='text-gray-400 flex space-x-2 truncate'>
              <Upload alt='avril' className='h-4 w-4 mr-1' /> Drag and drop an
              image, or
              <label
                className='text-[#008146] ß cursor-pointer'
                htmlFor='upload'
              >
                browse
              </label>{' '}
              <span>(Max 6MB)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
