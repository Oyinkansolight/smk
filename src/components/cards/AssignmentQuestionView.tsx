import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { TbCircleCheckFilled } from 'react-icons/tb';

// const opt = ['a', 'b', 'c', 'd', 'e', 'f'];
export default function AssignmentQuestionView({
  question,
  options,
  correctOption = 0,
  showAssesment = false,
}: {
  question: string;
  options: string[];
  correctOption?: number;
  showAssesment?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<number>();
  return (
    <div className='bg-white px-4 py-[18px] rounded-[9px]'>
      <div className='font-bold text-xl'>{question}</div>
      <div className='h-8' />
      <div className='grid grid-cols-2 gap-4'>
        {options.map((option, idx) => (
          <div
            onClick={() => setSelectedOption(idx)}
            className={clsxm(
              'border-gray-300 px-4 text-lg cursor-pointer h-12 border rounded-md flex items-center',
              idx === selectedOption && idx !== correctOption && 'bg-gray-50',
              selectedOption === idx &&
                correctOption === idx &&
                showAssesment &&
                'border-[#1BB449]'
            )}
            key={idx}
          >
            <div
              className={clsxm(
                'border-2 rounded-full h-4 w-4 relative flex items-center justify-center',
                idx === correctOption &&
                  idx === selectedOption &&
                  showAssesment &&
                  'border-[#1BB449]'
              )}
            >
              {selectedOption === idx && (
                <div
                  className={clsxm(
                    'inset-[3px] h-2 w-2 bg-gray-600 rounded-full',
                    idx === correctOption && showAssesment && 'bg-[#1BB449]'
                  )}
                />
              )}
            </div>
            <div className='w-8' />
            <div className='font-bold text-xl'>{option}</div>
            {selectedOption === idx &&
              correctOption === idx &&
              showAssesment && (
                <>
                  <div className='flex-1' />
                  <TbCircleCheckFilled className='text-[#1BB449] h-5 w-5' />
                </>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
