'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import DragDropDocument from '@/components/input/DragDropDocument';
import TextArea from '@/components/input/TextArea';
import { uploadDocument } from '@/firebase/init';
import { UploadFileParams, useUploadFile } from '@/server/library';
import NewMaterial from '@/types/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<File>();
  const [fileName, setFileName] = useState<string>();
  const { handleSubmit, register, control } = useForm();
  const { mutateAsync } = useUploadFile();
  const onSubmit = async (d: any) => {
    toast.info('Uploading file...');
    if (fileName && data?.arrayBuffer) {
      const path = await uploadDocument(
        fileName ?? '',
        await data?.arrayBuffer()
      );

      const userTypes = d.userTypes.map((userType: any) => userType.value);

      const toUpload: NewMaterial = { ...d, documentPath: path };
      const fileUploadDetails: UploadFileParams = {
        filename: d.title,
        fileUrl: path,
        createdBy: 'superAdmin',
        userTypes: userTypes,
      };
      const response = await mutateAsync(fileUploadDetails);

      if (response.data.data.status) {
        toast.success('File uploaded successfully');
        setTimeout(() => {
          router.push('/super-admin/library');
        }, 2000);
      }
    }
  };
  return (
    <form className='my-10 mx-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='h2 my-10'>Add a file</div>

      <div className='grid grid-cols-2 gap-10'>
        <div>
          <BaseInput label='Title' name='title' register={register} />
          <div className='my-4'>
            <TextArea
              className='min-h-[10rem]'
              label='Description'
              name='description'
              register={register}
            />
          </div>
          <DragDropDocument
            className='min-h-[15rem]'
            label='Select Material'
            setImageData={function (value: any): void {
              setData(value);
            }}
            imageName={fileName ?? ''}
            setImageName={function (value: string): void {
              setFileName(value);
            }}
          />
        </div>
        <div>
          <div className='w-full space-y-2'>
            <label className='block text-sm font-semibold text-left'>
              Select
            </label>
            <Controller
              control={control}
              render={function ({ field }) {
                const options = [
                  { value: 'Institutions', label: 'Institutions' },
                  { value: 'Teachers', label: 'Teachers' },
                  { value: 'Students', label: 'Students' },
                ];
                return (
                  <Select
                    classNames={{ control: () => 'items-start min-h-[2.5rem]' }}
                    isMulti
                    options={options}
                    {...field}
                  />
                );
              }}
              name='userTypes'
            />
          </div>
          <div className='flex flex-col items-center flex-1 justify-center h-full gap-6'>
            <Image
              src='/images/document_upload.png'
              alt='document-upload'
              height={200}
              width={150}
            />
            <div>Upload documents on Subjects</div>
          </div>
        </div>
      </div>
      <Button className='my-10' type='submit'>
        Submit
      </Button>
    </form>
  );
}
