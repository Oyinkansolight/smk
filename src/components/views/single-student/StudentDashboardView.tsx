import { BasicCard, CountCard } from '@/components/cards';

interface Iprop {
  schoolType?: string;
  classArm?: string;
  studentAve?: number;
  totalSubject?: number;
}
export default function StudentDashboardView({
  schoolType,
  classArm,
  studentAve,
  totalSubject,
}: Iprop) {
  return (
    <>
      <BasicCard className='flex w-full flex-col !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px] min-h-[477px]'>
        <div className='text-xl font-bold text-[#6B7A99]'>Dashboard</div>
        <hr className='h-[1.8px] bg-[#F5F6F7] mt-[18px]' />

        <div className='flex flex-wrap gap-3 md:gap-[20px] xl:gap-[27px] mt-6'>
          <CountCard
            count={schoolType ?? 'Secondary'}
            title='School Type'
            variant='basic'
          />
          <CountCard count={classArm ?? '1A'} title='Class' variant='basic' />
          <CountCard
            count={studentAve ?? '0%'}
            title='Student Average'
            variant='basic'
          />
          <CountCard
            count={totalSubject ?? 0}
            title='Total Subjects'
            variant='basic'
          />
        </div>
      </BasicCard>
    </>
  );
}
