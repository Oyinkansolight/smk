import clsxm from '@/lib/clsxm';
import { useState } from 'react';

const opt = ['a', 'b', 'c', 'd', 'e', 'f'];
export default function AssignmentQuestionView({
  question,
  options,
}: {
  question: string;
  options: string[];
}) {
  const [selectedOption, setSelectedOption] = useState<number>();
  return (
    <div>
      <div className='font-bold text-xl'>{question}</div>
      <div className='h-8' />
      <div className='grid grid-cols-2 gap-4'>
        {options.map((option, idx) => (
          <div
            onClick={() => setSelectedOption(idx)}
            className={clsxm(
              'border-gray-300 px-4 text-lg cursor-pointer h-12 border rounded-md flex items-center',
              selectedOption === idx && 'bg-gray-200'
            )}
            key={idx}
          >
            <div className='text-sm text-gray-300'>{opt[idx]}</div>
            <div className='w-8' />
            <div className='font-bold text-xl'>{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
