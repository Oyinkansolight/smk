import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import Index from '@/components/stepper';
import { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';

export default function ManageGradeRubric() {
  const [a, setA] = useState([0, 0, 0, 0]);
  const [currentStage, setCurrentStage] = useState(0);
  return (
    <div>
      <div className='text-center'>
        <div className='text-2xl font-bold'>Manage Grade Rubric</div>
        <div>Kindly select the appropriate options below:</div>
        <div className='bg-[#F4F9FF] flex flex-col items-center py-4 mb-5'>
          <Index
            variant='#008146'
            section=''
            data={[
              { stage: 1, stageName: 'Add Rubric Label' },
              { stage: 2, stageName: 'Select Rubric Range' },
            ]}
            currentStage={0}
          />
          <div>
            <span className='font-bold'>Note:</span> Once a Rubric label is
            changed, you would have to choose the range again.
          </div>
        </div>
      </div>
      {a.map((v: unknown, i: number) => (
        <div key={i}>
          <div className='flex items-end gap-3'>
            <Input
              label='Category Name'
              placeholder=''
              containerClassName='w-full'
              inputClassName='max-h-[10px]'
            />
            <Input
              label='Enter percentage score'
              placeholder=''
              containerClassName='w-full'
              inputClassName='max-h-[10px]'
            />
            <div
              onClick={() => setA(Array(a.length - 1).fill(0))}
              className='bg-[#FFF8F8] cursor-pointer text-red-500 p-4 rounded-full'
            >
              <BsTrashFill />
            </div>
          </div>
          <div className='h-px my-4 bg-gray-100' />
        </div>
      ))}
      <div className='flex justify-start'>
        <Button onClick={() => setA([...a, 0])}>Add New Rubric Label</Button>
      </div>
      <div className='h-24' />
      <div className='flex justify-end gap-4'>
        <Button
          variant='outline'
          disabled={currentStage === 0}
          onClick={() => setCurrentStage(currentStage - 1)}
        >
          Prev
        </Button>
        <Button
          onClick={() => setCurrentStage(currentStage + 1)}
          disabled={currentStage === 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
