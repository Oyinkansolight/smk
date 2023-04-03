import QuickActionButton from '@/components/buttons/QuickAction';
import { BasicCard } from '@/components/cards';
import StudentClockInTime from '@/components/views/student.tsx/StudentClockInTime';

// const timeLineData = [
//   {
//     image: '/images/teacher_step_1.png',
//     title: 'MR. Gbadamosi’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_3.png',
//     title: 'Submitted a bug',
//     details: 'Yesterday 12:39 AM',
//   },
//   {
//     image: '/images/teacher_step_4.png',
//     title: 'Modified A data in Page X',
//     details: 'Aug 11',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '3:30 PM',
//   },
// ];

const quickActions = ['Add Item', 'Mange Schedule'];

export default function StudentDashboardView() {
  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-between'>
        <div className='text-xl font-bold text-[#6B7A99]'>Dashboard</div>

        <div className='text-right'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Filter</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='max-w-sm'>
          <StudentClockInTime />
          <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[29px] !pb-[27px] !pt-[18px]'>
            <div className='flex flex-col gap-5'>
              <div className='font-bold'>Quick Actions</div>

              <div className='flex flex-wrap gap-x-[25px] gap-y-10'>
                {quickActions.map((action, i) => (
                  <QuickActionButton key={i} title={action} />
                ))}
              </div>
            </div>
          </BasicCard>
        </div>
      </div>
    </>
  );
}
