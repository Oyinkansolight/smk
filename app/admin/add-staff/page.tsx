/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/Addstaff/biodata';
import Contact from '@/components/views/admin/Addstaff/contact';
import Education from '@/components/views/admin/Addstaff/education';
import Employment from '@/components/views/admin/Addstaff/employment';
import Publish from '@/components/views/admin/Addstaff/publish';
import Training from '@/components/views/admin/Addstaff/training';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useCreateStaff } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AddStaff = () => {
  const { data: institutionProfile } = useGetProfile();
  // console.log(institutionProfile);

  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const [publishData, setpublishData] = useState(null);
  const [trainingDetails, setTrainingDetails] = useState<
    { titleOfTraining: string; year: number | null }[]
  >([]);
  const [assignedClassSubject, setassignedClassSubject] = useState<
    { classId: number | null; subjectId: number | null }[]
  >([]);

  const handleCreateStaff = useCreateStaff();

  const addTrainingDetail = () => {
    setTrainingDetails([
      ...trainingDetails,
      { titleOfTraining: '', year: null },
    ]);
  };
  const removeTrainingDetail = (id: number) => {
    const updatedItems = trainingDetails.filter((_, i) => i !== id);
    setTrainingDetails(updatedItems);
    toast.success('Record deleted');
  };
  const handleTrainingChange = (name: string, value: any, id: number) => {
    const updatedItems = trainingDetails.map((item, i) => {
      if (i === id) {
        return { ...item, [name]: value }; // Update the name property
      }
      return item;
    });
    setTrainingDetails(updatedItems);
  };
  const addSubjectClass = () => {
    setassignedClassSubject([
      ...assignedClassSubject,
      { classId: null, subjectId: null },
    ]);
  };
  const removeRemoveSubjectClass = (id: number) => {
    const updatedItems = assignedClassSubject.filter((_, i) => i !== id);
    setassignedClassSubject(updatedItems);
    toast.success('Record deleted');
  };
  const handleSubjectClassChange = (name: string, value: any, id: number) => {
    const updatedItems = assignedClassSubject.map((item, i) => {
      if (i === id) {
        return { ...item, [name]: value }; // Update the name property
      }
      return item;
    });
    setassignedClassSubject(updatedItems);
  };
  useEffect(() => {
    addTrainingDetail();
    addSubjectClass();
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(errors);
    // console.log(data);
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.gender &&
      data.staffType &&
      data.dob
    ) {
      setStage(stage + 1);
    }
    if (
      stage === 2 &&
      data.phoneNumber &&
      data.address &&
      data.email &&
      data.townId
    ) {
      setStage(stage + 1);
    }
    if (stage === 3) {
      setStage(stage + 1);
    }

    if (
      stage === 4 &&
      data.schoolname &&
      data.staffId &&
      data.dateposted &&
      data.qualification &&
      data.dateappointed &&
      data.jobTitle &&
      data.retirementDate &&
      data.salarygrade
    ) {
      setStage(stage + 1);
    }
    if (stage === 5) {
      const staffData = {
        profileImg: 'http://placeimg.com/640/480',
        firstName: data.firstName,
        lastName: data.lastName,
        staffType: data.staffType,
        gender: data.gender,
        dob: data.dob,
        password: '1234',
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        lga: data.townId,
        nextOfKin: data.nextOfKin,
        relationshipToNextOfKin: data.relationshipToNextOfKin,
        addressOfNextOfKin: data.addressOfNextOfKin,
        phoneOfNextOfKin: data.phoneOfNextOfKin,
        institutionId: institutionProfile?.id,
        trainingDetails: trainingDetails,
        employmentDetails: {
          schoolName: data.schoolname,
          staffId: data.staffId,
          datePosted: data.dateposted,
          highestQualification: data.qualification,
          DateOfFirstAppointment: data.dateappointed,
          retirementDate: data.retirementDate,
          salaryGradeLevel: data.salarygrade,
          jobTitle: data.jobTitle,
        },
        subjectAndClasses: assignedClassSubject,
      };

      setpublishData(data);

      try {
        setloading(true);
        const response = await handleCreateStaff.mutateAsync(staffData);

        if (response) {
          toast.success('Staff Added successful');
          setloading(false);

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        setloading(false);
        toast.error(getErrMsg(error));
      }
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
      stageName: 'Bio Details',
    },
    {
      stage: 2,
      stageName: 'Contact Details',
    },
    {
      stage: 3,
      stageName: 'Training History',
    },

    {
      stage: 4,
      stageName: 'Employment Details ',
    },
    {
      stage: 5,
      stageName: 'Subjects and Classes',
    },
    {
      stage: 6,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Staff created successfully'
          description='Institution Staff created successfully'
          link='/super-admin/all-staff'
          textLink='Manage staff'
        />
      )}
      <Link href='/admin'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Add Staff</h1>

      <Stepper
        variant='#007AFF'
        section='admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <Biodata
              register={register}
              errors={errors}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
            />
          )}
          {stage === 2 && <Contact register={register} errors={errors} />}
          {stage === 3 && (
            <Training
              register={register}
              errors={errors}
              removeTrainingDetail={removeTrainingDetail}
              addTrainingDetail={addTrainingDetail}
              trainingDetails={trainingDetails}
              handleTrainingChange={handleTrainingChange}
            />
          )}
          {stage === 4 && <Employment register={register} errors={errors} />}
          {stage === 5 && (
            <Education
              removeRemoveSubjectClass={removeRemoveSubjectClass}
              addSubjectClass={addSubjectClass}
              assignedClassSubject={assignedClassSubject}
              handleSubjectClassChange={handleSubjectClassChange}
            />
          )}

          {stage === 6 ||
            (stage === 7 && <Publish publishData={publishData} />)}
          <div className='mb-6 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                onClick={prevHandler}
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
              >
                Prev
              </button>
              {stage <= 6 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  {loading ? <ImSpinner2 className='animate-spin' /> : 'Next'}
                </button>
              )}
              {stage === 7 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStaff;
