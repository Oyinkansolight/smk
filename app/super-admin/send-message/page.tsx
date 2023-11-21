'use client';

import FormInput from '@/components/input/formInput';
import FormTextArea from '@/components/input/formTextarea';
import Library from '@/components/modal/Library';
import Stepper from '@/components/stepper';
import { getErrMsg } from '@/server';
import { useSendMessage } from '@/server/government/communication';
import { useGetTeachersList } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { RiArrowDropDownLine } from 'react-icons/ri';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

const Page = () => {
  const [stage, setStage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<number | string>('');
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishData, setPublishedData] = useState(null);

  const handleSendMessage = useSendMessage();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const { data: staffs, isLoading } = useGetTeachersList();
  const staffData = (staffs?.data ?? []).map((v) => ({
    label: v?.user ? `${v?.user?.firstName} ${v?.user?.lastName}` : ' ',
    value: v.id,
  }));
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
    console.log(data);

    // if (
    //   stage === 1 &&
    //   data.class &&
    //   data.classArm &&
    //   data.classTeacher &&
    //   data.classCapacity &&
    //   data.subjects
    // ) {
    //   setPublishedData(data);
    //   setStage(stage + 1);
    // }
    ///////////////////////
    //   {
    //     "recepients": ["003cbcc0-8d15-45a0-8c23-e92873e3a53e"],
    //     "title": "Test message",
    //     "body": "Type in whatever you want to include as the message body here.",
    //     "files":["https://www.file.url.png"]
    // }
    /////////////////////////

    // if (stage === 2) {
    //   const assignedSubjects = data.subjects.map((subject) => subject.value);

    //   const classArmData = {
    //     arm: data.classArm.toUpperCase(),
    //     capacity: Number(data.classCapacity),
    //     classId: data.class,
    //     subjects: assignedSubjects,
    //     teacherId: data.classTeacher.value,
    //     sessionId: currentSessionInfo?.id,
    //     institutionId: institutionProfile?.userInfo?.esiAdmin?.id,
    //   };
    try {
      setLoading(true);
      const response = await handleSendMessage.mutateAsync(data);

      if (response) {
        toast.success('Message Sent successfully');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(getErrMsg(error));
    }
    // }
  };

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
    {
      stage: 2,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='py-6'>
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Back</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Send Message</h1>

      <Stepper
        variant='#008146'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <div>
              <div className='table-add-student mt-7 lg:px-10 px-4 py-10 pb-4 bg-white'>
                <h2 className='text-2xl font-bold'>Message Details</h2>
                <p>Kindly enter the details of the school below:</p>

                <div className='md:w-1/2 w-3/4 mt-5'>
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
                            <div className='font-bold'>Select Recipient</div>
                            <ReactSelect
                              isMulti
                              required
                              {...field}
                              options={staffData || []}
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
                <div className='md:w-1/2 w-3/4 mt-1'>
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
                <div className='flex justify-between  border-b px-10'>
                  <h2 className='text-2xl font-bold'>Attachment </h2>
                  <div className='relative'>
                    <button
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                      className='py-3 text-black  text-xs rounded-md px-4 flex space-x-3'
                    >
                      <span>Attach File</span>
                      <RiArrowDropDownLine size={20} />
                    </button>
                    {dropDown && (
                      <div
                        className='fixed inset-0 z-[9]'
                        onClick={() => {
                          setDropDown(!dropDown);
                        }}
                      />
                    )}
                    {dropDown && (
                      <div className='shadow-lg rounded-xl flex  flex-col  text-left bg-[#f7f7f7] w-[200px] h-max absolute top-12 transition-all duration-200 right-0 z-10'>
                        <label
                          htmlFor='upload_file'
                          className='p-3 cursor-pointer hover:bg-slate-100  block text-left font-medium max-w-full'
                        >
                          Upload from your computer
                        </label>
                        <input
                          type='file'
                          name='upload_folder'
                          id='upload_file'
                          hidden
                        />

                        <button
                          onClick={() => {
                            setIsOpen(!isOpen);
                          }}
                          className='p-3 hover:bg-slate-100  text-left font-medium w-full'
                        >
                          Upload from from Library
                        </button>
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
      {isOpen && <Library onClickHandler={onClickHandler} />}
    </section>
  );
};

export default Page;
