import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import { DragEventHandler, useState } from 'react';
import { TbTrash } from 'react-icons/tb';

export default function DragDropGeneric({
  onChange,
  value,
  label,
}: {
  value?: File;
  label?: string;
  onChange: (file?: File) => void;
}) {
  const [isFileOver, setIsFileOver] = useState(false);
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFileOver(true);
  };
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsFileOver(false);
  };
  return (
    <div>
      {label && <div className='font-bold'>{label}</div>}
      <div
        onDrop={(e) => {
          e.preventDefault();
          const { files } = e.dataTransfer;
          if (files && files.length > 0) {
            onChange(files[0]);
          }
          setIsFileOver(false);
        }}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={clsxm(
          'h-[255px] justify-between py-4 border flex flex-col items-center',
          isFileOver && 'bg-gray-50'
        )}
      >
        {value ? (
          <div className='flex flex-1 items-center justify-center gap-4'>
            <div className='py-2 px-6 border border-[#008146] rounded'>
              {value.name} Selected
            </div>
            <TbTrash
              className='h-6 w-6 text-red-500 cursor-pointer'
              onClick={() => onChange(undefined)}
            />
          </div>
        ) : (
          <>
            <Image
              src='/images/add_image.png'
              alt='add-image'
              height={48}
              width={48}
            />
            <div>
              Drag and drop an image or,{' '}
              <label
                className='inline text-[#008146] cursor-pointer'
                htmlFor='file-upload-input_drag_drop_generic'
              >
                browse
              </label>
              <input
                type='file'
                className='hidden'
                id='file-upload-input_drag_drop_generic'
                onChange={(e) => {
                  if (e.currentTarget?.files && e.currentTarget?.files[0]) {
                    onChange(e.currentTarget?.files[0]);
                  }
                }}
              />
            </div>
            <div>Max 6MB</div>
            <div>Recommended size 1024x576</div>
            <div className='text-[#008146] cursor-pointer'>
              Download Sample FIle
            </div>
          </>
        )}
      </div>
    </div>
  );
}