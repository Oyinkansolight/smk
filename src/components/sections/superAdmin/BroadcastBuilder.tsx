'use client';

import FormInput from '@/components/input/formInput';
import FormTextArea from '@/components/input/formTextarea';
import Library from '@/components/modal/Library';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import { getErrMsg } from '@/server';
import { useSendMessage } from '@/server/government/communication';
import { useGetTeachersList } from '@/server/institution';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';

const Page = ({ closeModal }: { closeModal?: () => void }) => {
  const router = useRouter();

  const UserTypes = [
    { label: 'STUDENT', value: 'STUDENT' },
    { label: 'PARENT', value: 'PARENT' },
    { label: 'GOVERNMENT_ADMIN', value: 'GOVERNMENT_ADMIN' },
    { label: 'STAFF', value: 'STAFF' },
    { label: 'INSTITUTE_ADMIN', value: 'INSTITUTE_ADMIN' },
    { label: 'DEFAULT', value: 'DEFAULT' },
  ];
  const [stage, setStage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<number | string>('');
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishData, setPublishedData] = useState(null);
  const [files, setFiles] = useState<{ name: string; id: string }[]>();

  const handleSendMessage = useSendMessage();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const { data: staffs, isLoading } = useGetTeachersList();
  const staffData = (staffs?.data ?? []).map((v) => {
    return {
      value: v.id,
      label: v?.user && `${v?.user?.firstName} ${v?.user?.lastName}`,
    };
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    if (data.recepients.length == 0 || !data.body || !data.title) {
      toast.error('All fields must be completed');
      return;
    }
    const filteredRecepients: string[] = [];
    data.recepients.map((item: { label: string; value: string }) => {
      filteredRecepients.push(item.value);
    });
    data.recepients = filteredRecepients;
    data.files = files?.map((v) => {
      return { type: 'LIBRARY', file: v.id };
    });

    const environment = isLocal ? 'staging' : 'production';

    if (data.localFile && data.localFile.length > 0) {
      toast.info('Uploading file...');

      const path = await uploadDocument(
        `messages/message_${uuid()}`,
        await data.localFile[0].arrayBuffer(),
        environment
      );
      // LIBRARY = 'LIBRARY',
      // FIREBASE_PATH = 'FIREBASE_PATH',
      data.files = [
        {
          type: 'FIREBASE_PATH',
          file: path,
        },
      ];
    }

    const payload = {
      type: 'BROADCAST',
      body: data.body,
      title: data.title,
      files: data.files,
      broadcastRecepients: data.recepients.map((types: string) => {
        return {
          userType: types,
          recepients: [],
        };
      }),
    };
    console.log(payload);

    try {
      setLoading(true);
      const response = await handleSendMessage.mutateAsync(payload);

      if (response) {
        toast.success('Message Sent successfully');
        router.back();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
    // }
  };

  function handleFileRemove(id: string) {
    const updatedFileArray = files?.filter((v) => v.id !== id);
    setFiles(updatedFileArray);
  }

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const nextHandler = (): void => {
    if (stage >= 1 && stage <= 3) {
      setStage(stage + 1);
    }
  };
  const prevHandler = (): void => {
    if (stage >= 2) {
      setStage(stage - 1);
    }
  };
  const stepperData = [
    {
      stage: 1,
      stageName: 'Message Details',
    },
    // {
    //   stage: 2,
    //   stageName: 'Publish',
    // },
  ];

  return (
    <section className='py-6'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <div>
              <div className='table-add-student  lg:px-10 px-4  pb-4 bg-white'>
                <div className='text-left mt-5'>
                  <div className='mb-3 w-full'>
                    {/* <FormInput
                      label='Enter Recipient Name*'
                      setFormValue={setSearch}
                      register={register}
                      formValue={search}
                      placeholder='Jane Doe'
                    /> */}
                    {!isLoading && (
                      <Controller
                        control={control}
                        name='recepients'
                        render={({ field }) => (
                          <div>
                            <div className='font-bold'>Select Audience</div>
                            <ReactSelect
                              isMulti
                              required
                              {...field}
                              options={UserTypes || []}
                              className='h-auto mt-2 select'
                            />
                          </div>
                        )}
                      />
                    )}
                  </div>
                  <div className='mb-3 w-full'>
                    <FormInput
                      label='Enter Message Title'
                      name='title'
                      register={register}
                      placeholder='Jane Doe'
                      helper={
                        errors?.title && {
                          message: 'Title is required',
                          type: 'danger',
                        }
                      }
                    />
                  </div>
                </div>
                <div className='text-left mt-1'>
                  <FormTextArea
                    label='Enter Message Body'
                    name='body'
                    register={register}
                    setFormValue={setSearch}
                    formValue={search}
                    placeholder='Type your message...'
                    helper={
                      errors?.body && {
                        message: 'Message Body is required',
                        type: 'danger',
                      }
                    }
                  />
                </div>
              </div>
              <div className='table-add-student mt-7   pt-5 pb-10 bg-white'>
                <div className='flex justify-between  border-b px-6'>
                  <h2 className='text-2xl font-bold'>Attachment </h2>
                  <div className='relative'>
                    <div
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                      className='cursor-pointer py-3 text-black  text-xs rounded-md px-4 flex space-x-3'
                    >
                      <span>Attach File</span>
                      <RiArrowDropDownLine size={20} />
                    </div>
                    {dropDown && (
                      <div
                        className='fixed inset-0 z-[9]'
                        onClick={() => {
                          setDropDown(!dropDown);
                        }}
                      />
                    )}
                    {dropDown && (
                      <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-[#f7f7f7] w-[200px] h-max absolute top-10 transition-all duration-200 right-0 z-10'>
                        <label
                          htmlFor='upload_file'
                          className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                        >
                          Upload from your computer
                        </label>
                        <input
                          hidden
                          type='file'
                          id='upload_file'
                          {...register('localFile')}
                        />

                        <div
                          onClick={() => {
                            setIsOpen(!isOpen);
                          }}
                          className='cursor-pointer p-3 hover:bg-slate-100  text-left font-medium w-full'
                        >
                          Upload from from Library
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='px-6 py-4'>
                  <div className='flex space-x-2 items-center'>
                    {files &&
                      files.map((v, id) => (
                        <div
                          key={id}
                          className='flex space-x-1 items-center rounded-md p-1 bg-gray-300'
                        >
                          <p>{v.name}</p>
                          <button
                            onClick={() => {
                              handleFileRemove(v.id);
                            }}
                          >
                            <IoClose className='w-6 h-6 ' />
                          </button>
                        </div>
                      ))}

                    {getValues('localFile') && (
                      <div>
                        Selected File: {getValues('localFile')?.[0]?.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='my-6 flex justify-end w-full'>
            <div className='flex space-x-6'>
              {/* <button
                type='button'
                onClick={prevHandler}
                className='w-[200px] rounded px-2 py-3 text-xs text-[#008146] border border-[#008146]'
              >
                Send Later
              </button> */}

              <button className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '>
                {loading ? <ImSpinner2 /> : 'Send'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {isOpen && (
        <Library
          onClickHandler={onClickHandler}
          setFiles={setFiles}
          files={files}
        />
      )}
    </section>
  );
};

export default Page;
