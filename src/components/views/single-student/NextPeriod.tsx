import Button from '@/components/buttons/Button';

export default function NextPeriod() {
  return (
    <div className='flex gap-8 bg-[#F2F5FF] border-2 items-center p-4 rounded-lg'>
      <div className='h-28 w-28 rounded-lg bg-slate-400' />
      <div className='flex flex-col gap-3 flex-1'>
        <div className='text-[#3479EA] font-bold'>
          4th Period, 09:00 AM - 09:40 AM
        </div>
        <div className='text-[#615E83] font-bold text-2xl'>Mathematics</div>
        <div>
          <div className='text-[#615E83] font-bold'>
            <span className='text-[#333F4859]'>Time Left:</span> 32 Mins
          </div>
          <div className='w-full h-2 bg-[#DADADA] rounded-full overflow-hidden'>
            <div className='w-20 bg-[#FFC136]'> '</div>
          </div>
        </div>
      </div>
      <Button variant='secondary'>Go To Period</Button>
    </div>
  );
}
