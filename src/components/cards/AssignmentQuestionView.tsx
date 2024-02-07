/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomRichTextEditor from '@/components/input/TextEditor/CustomRichTextEditor';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { TbCircleCheckFilled, TbCircleXFilled } from 'react-icons/tb';

export interface answers {
  questionId?: string;
  answerOption?: number;
  answerText?: string;
}

export default function AssignmentQuestionView({
  question,
  options,
  correctOption = 0,
  showAssessment = false,
  setAnswers,
  answers,
  qId,
  studentAnswer,
  format = 'MULTIPLE_CHOICE',
  editor,
}: {
  qId?: string;
  question: string;
  options: string[];
  correctOption?: number;
  showAssessment?: boolean;
  setAnswers?: any;
  answers?: any;
  studentAnswer?: number;
  format?: string;
  editor?: any;
}) {
  const [selectedOption, setSelectedOption] = useState<number>();

  function handleOptionSelection(questionId, optionIdx) {
    //check if answer exist
    let answersCopy = answers;
    const result = answers.find((item) => item.questionId === questionId);
    if (result) {
      answersCopy = answersCopy.filter(
        (item) => item.questionId !== result.questionId
      );
      setAnswers([
        ...answersCopy,
        { questionId: qId, answerOption: optionIdx },
      ]);
    } else {
      setAnswers([
        ...answersCopy,
        { questionId: qId, answerOption: optionIdx },
      ]);
    }
  }

  return format === 'MULTIPLE_CHOICE' ? (
    <div className='bg-white px-4 py-[18px] rounded-[9px]'>
      <div className='font-bold text-xl'>{question}</div>
      <div className='h-8' />
      <div className='grid grid-cols-2 gap-4'>
        {options.map((option, idx) => (
          <div
            key={option}
            onClick={() => {
              setSelectedOption(idx);
              handleOptionSelection(qId, idx);
            }}
            className={clsxm(
              'border-gray-300 px-4 text-lg cursor-pointer h-12 border rounded-md flex items-center',
              idx === selectedOption && idx !== correctOption && 'bg-gray-50',
              correctOption === idx && showAssessment && 'border-[#1BB449]',
              showAssessment &&
                studentAnswer !== correctOption &&
                idx === studentAnswer &&
                'border-[#FF0000]'
            )}
          >
            <div
              className={clsxm(
                'border-2 rounded-full h-4 w-4 relative flex items-center justify-center',
                (idx === correctOption &&
                  idx === selectedOption &&
                  showAssessment) ||
                  (studentAnswer === correctOption &&
                    studentAnswer === idx &&
                    'border-[#1BB449]'),
                showAssessment &&
                  studentAnswer !== correctOption &&
                  idx === studentAnswer &&
                  'border-[#FF0000]'
              )}
            >
              {selectedOption === idx && (
                <div
                  className={clsxm(
                    'inset-[3px] h-2 w-2 bg-gray-600 rounded-full',
                    idx === correctOption && showAssessment && 'bg-[#1BB449]',
                    showAssessment &&
                      studentAnswer !== correctOption &&
                      idx === studentAnswer &&
                      'bg-[#FF0000]'
                  )}
                />
              )}
            </div>
            <div className='w-8' />
            <div className='font-bold text-xl'>{option}</div>
            {(selectedOption === idx &&
              correctOption === idx &&
              showAssessment) ||
              (studentAnswer === correctOption && studentAnswer === idx && (
                <>
                  <div className='flex-1' />
                  <TbCircleCheckFilled className='text-[#1BB449] h-5 w-5' />
                </>
              ))}

            {studentAnswer === idx &&
              correctOption !== idx &&
              showAssessment && (
                <>
                  <div className='flex-1' />
                  <TbCircleXFilled className='text-[#FF0000] h-5 w-5' />
                </>
              )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='bg-white px-4 py-[18px] rounded-[9px]'>
      <div
        className='font-bold text-xl'
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className='h-8' />
      <div className=''>
        <CustomRichTextEditor editor={editor} />
      </div>
    </div>
  );
}
