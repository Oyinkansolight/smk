/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import DragDropDocument from '@/components/input/DragDropDocument';
import TextArea from '@/components/input/TextArea';
import { uploadDocument } from '@/firebase/init';
import { useCreateReport } from '@/server/teacher';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

const options = [
  { value: 'staff-conduct', label: 'StaffConduct' },
  { value: 'student-conduct', label: 'StudentConduct' },
  { value: 'school-facility', label: 'SchoolFacility' },
  { value: 'school-activity', label: 'SchoolActivity' },
  { value: 'accident', label: 'Accident' },
  { value: 'theft', label: 'Theft' },
  { value: 'others', label: 'Others' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'very high', label: 'Very High' },
  { value: 'immediate', label: 'Immediate Resolution' },
];

const IncidentReport = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateReport();
  const [fileData, setFileData] = useState<File>();
  const [fileName, setFileName] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    toast.info('Uploading file...');
    const institution = localStorage.getItem('institution') ?? "";
    const institutionId = JSON.parse(institution).id;

    if (fileName && fileData?.arrayBuffer && institutionId) {
      const path = await uploadDocument(
        fileName ?? '',
        await fileData?.arrayBuffer()
      );

      const parsedData = {
        ...data,
        reportAttachment: path,
        issues: [data.issues.value],
        institutionId: institutionId,
        priorityLevel: data.priorityLevel.value,
      };

      const response = await mutateAsync(parsedData);

      if (response.status === 201) {
        toast.success('Report created successfully');
        setTimeout(() => {
          router.refresh();
        }, 2000);
      }

    } else {
      toast.error('Something went wrong. Please try again.')
    }


  };

  return (
    <div className='relative flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover'>
      <div className='absolute bg-white inset-0 z-0'></div>
      <div className='sm:max-w-lg w-full bg-white rounded-xl z-10'>
        <div className='text-center'>
          <div className='h2 font-bold text-gray-900'>Make New Report</div>
          <p className='mt-2 text-sm text-gray-400'>
            Provide an exhaustive narration of your issue.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-3'>
          <div className='grid grid-cols-1 space-y-2'>
            <BaseInput
              name='title'
              type='text'
              label='Title'
              register={register}
              placeholder='Report Title'
            />
          </div>

          <div className='grid grid-cols-1 space-y-2'>
            <label className='text-xs font-bold tracking-wide'>Issue</label>
            <Controller
              name='issues'
              control={control}
              render={({ field }) => {
                return <Select options={options} {...field} />;
              }}
            />
          </div>

          <div className='grid grid-cols-1 space-y-2'>
            <label className='text-xs font-bold tracking-wide'>
              Priority Level
            </label>
            <Controller
              control={control}
              name='priorityLevel'
              render={({ field }) => {
                return <Select options={priorityOptions} {...field} />;
              }}
            />
          </div>

          <div className='grid grid-cols-1 space-y-2'>
            <TextArea
              className='min-h-[10rem]'
              label='Description'
              name='description'
              register={register}
            />
          </div>

          <DragDropDocument
            label='Attach Document/Image'
            imageName={fileName ?? ''}
            setImageData={(v) => setFileData(v)}
            setImageName={(v) => setFileName(v)}
          />

          <p className='text-sm text-gray-300'>
            <span>File type: doc,pdf,types of images</span>
          </p>
          <div>
            <Button type='submit' className='w-full justify-center'>Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReport;
