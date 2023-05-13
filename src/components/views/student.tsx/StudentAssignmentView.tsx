import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';

export default function StudentAssignmentView() {
  return (
    <div>
      <div>Topic:</div>
      <div className='font-bold text-lg'>Algebra - Part 1</div>
      <div className='h-[2px] bg-gray-200 my-10' />
      <div className='flex flex-col gap-16'>
        <AssignmentQuestionView
          question='1. What is 2 + 2?'
          options={['4', '6', '5', '7']}
        />
        <AssignmentQuestionView
          question='2. What is 2 + 2?'
          options={['4', '6', '5', '7']}
        />
      </div>
    </div>
  );
}
