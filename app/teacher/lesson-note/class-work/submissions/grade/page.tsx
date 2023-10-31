'use client';

import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import ReactSelect from 'react-select';
import Toggle from 'react-toggle';
import { useGetStudentSubmittedActivity } from '@/server/institution/lesson-note';
import { useSearchParams } from 'next/navigation';
import logger from '@/lib/logger';
import GenericLoader from '@/components/layout/Loader';
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';

export default function Page() {
  const params = useSearchParams();
  const [addToGradeList, setAddToGradeList] = useState(false);
  const classArmId = params?.get('classArmId');
  const subjectId = params?.get('subjectId');
  const studentId = params?.get('studentId');
  const { data: submissions, isLoading: isLoadingActivity } =
    useGetStudentSubmittedActivity({
      type: 'CLASS_WORK',
      classArmId,
      subjectId,
      studentId
    });

  logger(submissions);

  if (isLoadingActivity) {
    return (
      <div className='flex justify-center items-center h-[40vh]'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <div className='h-full layout mt-10'>
      <div className='text-3xl text-[#D4D5D7]'>
        {'Assignments > Submissions > Grade'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Grade</div>
      </div>
      <div className='font-bold pb-4 flex items-center gap-4'>
        <div className='h-10 w-10 rounded-full bg-gray-200' />
        <div>{`${submissions?.[0]?.student?.lastName} ${submissions?.[0]?.student?.firstName}`}</div>
      </div>
      <div className='flex lg:flex-row flex-col gap-4'>
        <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden w-full'>
          <div className='flex justify-start p-4'>
            {
              submissions?.[0]?.activity?.questionsV2?.map((question, idx) => (
                <div className='flex flex-row gap-6 w-full items-center' key={submissions[idx].id}>
                  <div className="h3">{idx + 1}.</div>
                  <div className='w-full'>
                    <AssignmentQuestionView
                      showAssesment
                      question={question.question ?? ""}
                      options={question.options ?? []}
                      correctOption={question.correctOption}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className=' rounded-lg bg-white p-2'>
          <div className='font-bold text-xl'>Grade Assessment</div>
          <div className='flex flex-col gap-4 mt-6'>
            <div>Add to grade list</div>

            <label>
              <div className='flex flex-row items-center gap-[5px]'>
                <Toggle
                  icons={false}
                  className='custom-toggle'
                  defaultChecked={addToGradeList}
                  onChange={(v) =>
                    setAddToGradeList(v.currentTarget.checked ?? false)
                  }
                />
                <span>{addToGradeList ? <div>Yes</div> : <div>No</div>}</span>
              </div>
            </label>
            <EditStudentGrade />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditStudentGrade() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className='font-bold'>
      <div className='grid py-4 grid-cols-2'>
        <div>Questions</div>
        <div>Score</div>
      </div>
      <div className='flex flex-col gap-2'>
        {Array(1)
          .fill(0)
          .map((v, i) => (
            <div
              className='grid grid-cols-2 items-center bg-[#EFF7F6] p-3 rounded-lg'
              key={i}
            >
              <div>Question {i + 1}</div>
              <EditableFormSelect isEditing={isEditing} />
            </div>
          ))}
      </div>
      <div className='flex items-center justify-center py-4'>
        {isEditing ? (
          <Button
            variant='secondary'
            className='bg-[#1A8FE3] text-xs w-36 justify-center'
            onClick={() => setIsEditing(!isEditing)}
          >
            Submit
          </Button>
        ) : (
          <Button
            className='bg-black hover:bg-gray-900 text-xs w-36 justify-center'
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

function EditableFormSelect({ isEditing }: { isEditing: boolean }) {
  const [value, setValue] = useState<{ label: number } | null>(null);
  const className = 'min-w-[10rem] h-10';
  const getBorderColor = () => {
    if (value && value.label > 3) return 'border-green-500';
    if (value && value.label < 3) return 'border-red-500';
    return '';
  };
  return isEditing ? (
    <ReactSelect
      className={className}
      onChange={(v) => setValue(v)}
      value={value}
      options={Array(6)
        .fill(0)
        .map((v, i) => ({ label: i }))}
    />
  ) : (
    <div className={clsxm(className, 'py-px ')}>
      <div
        className={clsxm(
          'w-full h-full flex items-center border bg-white rounded-lg px-3',
          getBorderColor()
        )}
      >
        <div>{value?.label as number}</div>
      </div>
    </div>
  );
}
