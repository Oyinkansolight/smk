import { BasicCard, CountCard } from '@/components/cards';

export default function StudentDashboardView() {
  return (
    <>
      <BasicCard className='flex w-full flex-col !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px] min-h-[477px]'>
        <div className='text-xl font-bold text-[#6B7A99]'>Dashboard</div>
        <hr className='h-[1.8px] bg-[#F5F6F7] mt-[18px]' />

        <div className='flex flex-wrap gap-3 md:gap-[20px] xl:gap-[27px] mt-6'>
          <CountCard count='3' title='Assign Class' variant='basic' />
          <CountCard count='72%' title='Attendance rate' variant='basic' />
          <CountCard count='1' title='Total Subjects' variant='basic' />
        </div>
      </BasicCard>
    </>
  );
}
