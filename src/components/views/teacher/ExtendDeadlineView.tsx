import Input from '@/components/input/formInput';

export default function ExtendDeadlineView() {
  return (
    <div>
      <div className='font-bold text-2xl pb-8'>Extend Deadline</div>

      <div className='flex gap-4'>
        <div className='flex-1'>
          <Input label='Due Date' placeholder='Due date ' type='date' />
        </div>
        <div className='flex-1'>
          <Input label='New Due Date' placeholder='New Due date ' type='date' />
        </div>
      </div>
    </div>
  );
}
