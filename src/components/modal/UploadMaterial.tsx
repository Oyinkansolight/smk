/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable unused-imports/no-unused-vars */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import DragDropDocument from '@/components/input/DragDropDocument';
import TextArea from '@/components/input/TextArea';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import { useGetProfile } from '@/server/auth';
import {
  UploadFileParams,
  useUploadFile,
  useUploadFolderFile,
} from '@/server/library';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';

interface UploadMaterialProps {
  folderId?: string;
  folderName?: string;
  toggleUploadModal: () => void;
}

export default function UploadMaterial({
  folderId,
  folderName,
  toggleUploadModal,
}: UploadMaterialProps) {
  const router = useRouter();
  const [data, setData] = useState<File>();
  const { data: profile } = useGetProfile();
  const [fileName, setFileName] = useState<string>();
  const [fileSize, setFileSize] = useState<number>(0);
  const { handleSubmit, register } = useForm();
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: uploadFolderFile } = useUploadFolderFile();
  const onSubmit = async (d: any) => {
    const environment = isLocal ? 'staging' : 'production';
    toast.info('Uploading file...');
    if (fileName && data?.arrayBuffer) {
      const path = await uploadDocument(
        `${uuid()}_${fileName}` ?? '',
        await data?.arrayBuffer(),
        environment
      );

      let fileUploadDetails: UploadFileParams;

      const videoFileType = data.type.split('/')[0];
      const pdfFileType = data.type.split('/')[1];

      if (folderId) {
        fileUploadDetails = {
          folderId,
          userTypes: [],
          fileUrl: path,
          size: Math.round(fileSize / 1024),
          filename: d.title,
          createdBy: profile?.userInfo?.email,
          fileType: videoFileType === 'video' ? videoFileType : pdfFileType,
        };
      } else {
        fileUploadDetails = {
          userTypes: [],
          size: Math.round(fileSize / 1024),
          fileUrl: path,
          filename: d.title,
          createdBy: profile?.userInfo?.email,
          fileType: videoFileType === 'video' ? videoFileType : pdfFileType,
        };
      }

      const response = folderId
        ? await uploadFolderFile(fileUploadDetails)
        : await uploadFile(fileUploadDetails);

      if (response.data.data.status) {
        toast.success('File uploaded successfully');
        toggleUploadModal();
      }
    }
  };
  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-4 gap-10'>
        <div>
          <div className='flex flex-col items-center flex-1 justify-center h-full gap-6 -mt-10'>
            <Image
              src='/images/document_upload.png'
              alt='document-upload'
              height={200}
              width={150}
            />
            <div className='h4'>Upload documents</div>
          </div>
        </div>
        <div className='col-span-3'>
          <div className='h2 mb-6'>
            Add a file {folderName ? `to ${folderName}` : 'to the library'}
          </div>

          <BaseInput label='Title' name='title' register={register} />
          <div className='my-4'>
            <TextArea
              className='min-h-[10rem]'
              label='Description (optional)'
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
            setFileSize={(value: number): void => {
              setFileSize(value);
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
