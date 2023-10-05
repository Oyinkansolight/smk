import Button from '@/components/buttons/Button';
import { BasicCard, CountCard } from '@/components/cards';
import { Institution } from '@/types/institute';

interface proptype {
  school?: Institution;
}

export default function SchoolDashboardView({ school }: proptype) {
  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-end'>
        <div className='flex flex-row gap-x-7'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Filter</option>
          </select>

          <Button
            variant='outline'
            className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>
        </div>
      </div>

      <BasicCard className='flex w-full flex-col !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px] min-h-[477px]'>
        <div className='text-xl font-bold text-[#6B7A99]'>Dashboard</div>
        <hr className='h-[1.8px] bg-[#F5F6F7] mt-[18px]' />

        <div className='flex flex-wrap gap-3 md:gap-[20px] xl:gap-[27px] mt-6'>
          <CountCard
            text={school?.totalStudent ?? '0'}
            title='Total Student'
            variant='basic'
          />
          <CountCard
            text={school?.totalStaff ?? '0'}
            title='Total Staff'
            variant='basic'
          />
          <CountCard
            text={school?.totalClassArm ?? '0'}
            title='Total Classes'
            variant='basic'
          />
          <CountCard
            count={school?.totalSubjects ?? '0'}
            title='Total Subjects'
            variant='basic'
          />
          {/* <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ipsum, fugiat deleniti ratione laudantium eveniet ex consequuntur
            aut officiis id.
          </div> */}
        </div>
      </BasicCard>
    </>
  );
}
