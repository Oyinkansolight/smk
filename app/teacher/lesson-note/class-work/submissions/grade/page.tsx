/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Toggle from 'react-toggle';
import { useGetStudentSingleSubmittedActivity, useGradeSubmission } from '@/server/institution/lesson-note';
import { useSearchParams } from 'next/navigation';
import GenericLoader from '@/components/layout/Loader';
import SubjectiveViewer from '@/components/cards/SubjectiveViewer';
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import { SubmissionAnswer } from '@/types/test-and-exam';
import { toast } from 'react-toastify';

export default function Page() {
  const params = useSearchParams();
  const [addToGradeList, setAddToGradeList] = useState(false);
  const studentId = params?.get('studentId');
  const classArmId = params?.get('classArmId');
  const activityId = params?.get('activityId');
  const submissionId = params?.get('submissionId');
  const [scores, setScores] = useState([]);

  const { mutateAsync: submitAssessment } = useGradeSubmission()

  const { data: submissions, isLoading: isLoadingActivity } =
    useGetStudentSingleSubmittedActivity({
      type: 'CLASS_WORK',
      classArmId,
      activityId,
      studentId
    });

  useEffect(() => {
    if (submissions?.[0]?.activity?.questionsV2) {
      setScores(
        submissions?.[0]?.activity?.questionsV2?.map((question, idx) => ({
          answerId: question.id,
          score: 0,
        }))
      );
    }
  }, [submissions?.[0]?.activity?.questionsV2]);

  const handleGrading = async () => {
    const res = await submitAssessment({
      submissionId: submissionId ?? "",
      answers: scores,
      // scores,
      // addToGradeList
    })

    if (res) {
      toast.success('Assessment graded successfully')
    } else {
      toast.error('An error occurred')
    }
  }

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
        {'Classwork > Submissions > Grade'}
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
            {submissions?.[0]?.activity?.format === 'MULTIPLE_CHOICE' &&
              submissions?.[0]?.activity?.questionsV2?.map((question, idx) => (
                <div className='flex flex-row gap-6 w-full items-center' key={submissions[idx].id}>
                  <div className="h3">{idx + 1}.</div>
                  <div className='w-full'>
                    <AssignmentQuestionView
                      showAssessment
                      question={question.question ?? ""}
                      options={question.options ?? []}
                      correctOption={question.correctOption}
                      studentAnswer={submissions?.[0]?.answers?.[idx]?.answerOption}
                    />
                  </div>
                </div>
              ))
            }

            {submissions?.[0]?.activity?.format === 'SUBJECTIVE' && submissions?.[0]?.activity?.questionsV2[0]?.question && (
              <div className='flex flex-col gap-10'>
                <SubjectiveViewer content={submissions?.[0]?.activity?.questionsV2[0]?.question} />

                <div className='flex flex-col gap-4'>
                  <div className='h3 px-6'>Student Answer</div>
                  <div className='-mt-10'>
                    <SubjectiveViewer content={submissions?.[0]?.answers?.[0]?.answerText} />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className=' rounded-lg bg-white p-4'>
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
            <EditStudentGrade questions={submissions?.[0]?.activity?.questionsV2} setScores={setScores} handleGrading={handleGrading} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditStudentGrade({ questions, setScores, handleGrading }: { questions: any[], setScores: Dispatch<SetStateAction<never[]>>, handleGrading: () => void }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleScoreChange = (score: number, idx: number) => {
    setScores((prev): any => {
      const newScores: SubmissionAnswer[] = [...prev];
      newScores[idx].score = score;
      return newScores;
    });
  }

  return (
    <div className='font-bold'>
      <div className='grid py-4 grid-cols-2'>
        <div>Questions</div>
        <div>Score</div>
      </div>
      <div className='flex flex-col gap-2'>
        {questions
          .map((v, i) => (
            <div
              className='grid grid-cols-2 items-center bg-[#EFF7F6] p-3 rounded-lg'
              key={v.id}
            >
              <div>Question {i + 1}</div>
              <EditableFormSelect isEditing={isEditing} handleScoreChange={handleScoreChange} />
            </div>
          ))}
      </div>
      <div className='flex items-center justify-center py-4'>
        {isEditing ? (
          <Button
            variant='secondary'
            className='bg-[#1A8FE3] text-xs w-36 justify-center'
            onClick={() => {
              setIsEditing(!isEditing);
              isEditing && handleGrading();
            }}
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

function EditableFormSelect({ isEditing, handleScoreChange }: { isEditing: boolean, handleScoreChange: (score: number, idx: number) => void }) {
  const [value, setValue] = useState<{ label: number } | null>(null);
  const className = 'min-w-[10rem] h-10';
  const getBorderColor = () => {
    if (value && value.label > 3) return 'border-green-500';
    if (value && value.label < 3) return 'border-red-500';
    return '';
  };
  return isEditing ? (
    <ReactSelect
      isSearchable={false}
      className={className}
      onChange={(v) => {
        setValue(v)
        handleScoreChange(v?.label as number, 0)
      }}
      value={value}
      options={Array(11)
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
