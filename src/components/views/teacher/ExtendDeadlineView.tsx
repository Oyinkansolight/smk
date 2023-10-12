import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import { getCurrentDate } from '@/lib/helper';

export default function ExtendDeadlineView() {
  return (
    <div>
      <div className='font-bold text-2xl pb-8'>Extend Deadline</div>

      <div className='flex gap-4'>
        <div className='flex-1'>
          <Input label='Due Date' placeholder='Due date ' type='date' />
        </div>
        <div className='flex-1'>
          <Input label='New Due Date' placeholder='New Due date' min={getCurrentDate()} />
        </div>
      </div>
      <div>
        <Button
          className='w-full mt-4 flex items-center justify-center'
          variant='secondary'
        >
          Extend
        </Button>
      </div>
    </div>
  );
}
