/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import DragDropDocument from '@/components/input/DragDropDocument';
import TextArea from '@/components/input/TextArea';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useCreateReport } from '@/server/teacher';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
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

const IncidentReport = ({ closeModal }: { closeModal?: () => void }) => {
  const { mutateAsync } = useCreateReport();
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState<File>();
  const [fileName, setFileName] = useState<string>();
  const { register, control, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    toast.info('Uploading file...');
    const institution = sessionStorage.getItem('institution') ?? '';
    const institutionId = JSON.parse(institution).id;

    if (fileName && fileData?.arrayBuffer && institutionId) {
      const environment = isLocal ? 'staging' : 'production';
      const path = await uploadDocument(
        fileName ?? '',
        await fileData?.arrayBuffer(),
        environment
      );

      setLoading(true);
      const parsedData = {
        ...data,
        reportAttachment: path,
        issues: [data.issues.value],
        institutionId: institutionId,
        priorityLevel: data.priorityLevel.value,
      };

      try {
        const response = await mutateAsync(parsedData);

        if (response.status === 201) {
          toast.success('Report created successfully');
          closeModal && closeModal();
          setLoading(false);
        }
      } catch (error) {
        getErrMsg(error);
        setLoading(false);
      }
    } else {
      toast.error('All fields are required');
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

          <div className='grid grid-cols-1 space-y-2 !text-left'>
            <label className='text-xs font-bold tracking-wide'>Issue</label>
            <Controller
              name='issues'
              control={control}
              render={({ field }) => {
                return <Select options={options} {...field} />;
              }}
            />
          </div>

          <div className='grid grid-cols-1 space-y-2 !text-left'>
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

          <div className='!text-left'>
            <DragDropDocument
              label='Attach Document/Image'
              imageName={fileName ?? ''}
              setImageData={(v) => setFileData(v)}
              setImageName={(v) => setFileName(v)}
              setFileSize={function (value: number): void {
                logger(value);
              }}
            />
          </div>

          <p className='text-sm !text-left text-gray-300'>
            <span>File type: images</span>
          </p>
          <div>
            <Button type='submit' className='w-full justify-center'>
              {loading ? <ImSpinner2 /> : 'Upload Report'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReport;
