'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import DragDropDocument from '@/components/input/DragDropDocument';
import TextArea from '@/components/input/TextArea';
import { uploadDocument } from '@/firebase/init';
import { useGetProfile } from '@/server/auth';
import { UploadFileParams, useUploadFile } from '@/server/library';
import NewMaterial from '@/types/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<File>();
  const { data: profile } = useGetProfile();
  const [fileName, setFileName] = useState<string>();
  const { handleSubmit, register, control } = useForm();
  const { mutateAsync } = useUploadFile();
  const onSubmit = async (d: any) => {
    toast.info('Uploading file...');
    if (fileName && data?.arrayBuffer) {
      const path = await uploadDocument(
        `${uuid()}_${fileName}` ?? '',
        await data?.arrayBuffer()
      );

      const toUpload: NewMaterial = { ...d, documentPath: path };
      const fileUploadDetails: UploadFileParams = {
        filename: d.title,
        fileUrl: path,
        createdBy: profile?.userInfo?.email,
        userTypes: [],
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

      <div className='grid grid-cols-4 gap-10'>
        <div>
          <div className='flex flex-col items-center flex-1 justify-start h-full gap-6'>
            <Image
              src='/images/document_upload.png'
              alt='document-upload'
              height={200}
              width={150}
            />
            <div>Upload documents on Subjects</div>
          </div>
        </div>
        <div className='col-span-3'>
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
          <Button className='my-10 w-full justify-center' type='submit'>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}