import Button from '@/components/buttons/Button';
import WeekCheckBox from '@/components/calendars/WeekCheckBox';

export default function StudentClockInTime() {
  return (
    <div className='flex flex-col items-center gap-4 rounded-md border border-dodger-500 bg-[#F6F8FF] p-6'>
      <div className='text-base'>
        You are <span className='text-red-500'>within</span> Your clock in area
      </div>
      <div className='relative aspect-square h-[100px] rounded-full bg-[#EBEBEB] shadow-md'>
        <div className='absolute inset-2 flex items-center justify-center rounded-full bg-white text-lg font-bold shadow-md'>
          <div>00:00</div>
        </div>
      </div>
      <Button>Clock In</Button>
      <WeekCheckBox date={new Date('2023-04-05T05:27:14.617Z')} />
    </div>
  );
}
