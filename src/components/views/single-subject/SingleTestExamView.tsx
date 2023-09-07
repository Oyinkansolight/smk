/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularCounter } from '@/components/counter';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import { useState } from 'react';
import { Subject } from '@/types/classes-and-subjects';
import { useGetCategoryByInstitutionType } from '@/server/institution/grade';
import { INSTITUTION_TYPES } from '@/constant/institution';
import ButtonLink from '@/components/links/ButtonLink';
import { GoKebabHorizontal } from 'react-icons/go';
import GeneralModal from '@/components/modals/general-modal';
import AddTestExam from '@/components/modal/AddTestExam';

interface propType {
  termId: string;
  sessionId: any;
  classId: string;
  subject?: Subject[];
  className: string;
  schoolType: number;
  currentTermName: string;
}

export default function SingleTestExamView({ termId, sessionId, subject, className, currentTermName, schoolType }: propType) {
  // const params = useSearchParams();

  // const id = params?.get('id') as string;

  // const handleSubmit = async () => {
  //   const data = {
  //     weekid: weekId,
  //     periods: periodsUpdate,
  //   };

  //   try {
  //     const response = await handleCreateCurriculum.mutateAsync(data);
  //     if (response) {
  //       toast.success('Curriculum updated successful');
  //       onClickHandler && onClickHandler();
  //       location.reload();
  //     }
  //   } catch (error) {
  //     toast.error(getErrMsg(error));
  //   }
  // };

  const instituteTypes = [
    INSTITUTION_TYPES.ECCDE,
    INSTITUTION_TYPES.PRIMARY,
    INSTITUTION_TYPES.SECONDARY,
    INSTITUTION_TYPES.TERTIARY,
  ];

  const gradeCategoryParams = {
    institutionType: instituteTypes[schoolType],
    sessionId,
    termId,
  }

  const { data: gradeCategory } = useGetCategoryByInstitutionType(gradeCategoryParams);

  const [showContent, setShowContent] = useState(false);

  const count = 100;
  return (
    <div className='bg-white h-full p-4'>
      <div className='rounded-lg py-6 px-6 flex items-center bg-[#ECF4FF]'>
        <div className='font-bold text-[#5A5A5A] text-sm'>{currentTermName} {className} {subject?.[0]?.name} Test & Exam Questions</div>
        <div className='flex-1' />
        {count === 100 ? (
          <Image
            src='/images/curriculum_done.png'
            alt='done'
            height={65}
            width={65}
          />
        ) : (
          <CircularCounter size='sm' total={count} />
        )}
      </div>
      <div className='h-4' />
      <div className='flex flex-col space-y-6'>
        {!gradeCategory || gradeCategory.data.length === 0 ? (
          <div className='flex flex-col items-center gap-8'>
            <div className='h-10' />
            <Image
              src='/images/empty_box.png'
              alt='empty-box'
              height={128}
              width={128}
            />
            <div className='text-xl'>No grade setting for this institution type</div>
            <ButtonLink href='/super-admin/account' variant='outline'>Add Grade Category</ButtonLink>
          </div>
        ) : (
          gradeCategory && gradeCategory.data.map((category: any) => {
            return (
              <div key={category.id}>
                <div
                  onClick={() => {
                    setShowContent(!showContent);
                  }}
                  className={clsxm(
                    'border border-[#E3E3E3] rounded-[5px] shadow-sm h-[54px] px-[15px] py-[18px]',
                    'flex items-center justify-between gap-4 py-4 cursor-pointer'
                  )}
                >
                  <h2 className='font-bold text-[#6B7A99] text-base'>{category.categoryName}</h2>
                  <div className='flex gap-[30px] items-center'>
                    <GeneralModal body={(
                      <AddTestExam subjectName={subject?.[0]?.name} assessmentName={category.categoryName} />
                    )}>
                      <button
                        className='border border-primary text-primary p-2 rounded-[3.259px] h-[31px] items-center flex'
                        onClick={() => {
                          null;
                        }}
                      >
                        Add {category.categoryName}
                      </button>
                    </GeneralModal>

                    <GoKebabHorizontal className='rotate-90 cursor-pointer w-4 h-4' />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
