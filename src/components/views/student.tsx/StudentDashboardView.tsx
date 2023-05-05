import QuickActionButton from '@/components/buttons/QuickAction';
import { BasicCard } from '@/components/cards';
import BreakTimeView from '@/components/views/student.tsx/BreakTimeView';
import ClassScheduleView, {
  ClassScheduleViewProps,
} from '@/components/views/student.tsx/ClassScheduleView';
import StudentClockInTime from '@/components/views/student.tsx/StudentClockInTime';
import moment from 'moment';
import { RiCalendar2Fill } from 'react-icons/ri';

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

const classes: ClassScheduleViewProps[] = [
  {
    classState: 0,
    end: new Date(),
    start: new Date(),
    name: 'Math Class',
    teacherName: 'James Akanni',
    progress: 87,
  },
  {
    classState: 1,
    end: new Date(),
    start: new Date(),
    name: 'English Class',
    teacherName: 'Super Teacher',
    progress: 10,
  },
  {
    classState: 1,
    end: new Date(),
    start: new Date(),
    name: 'English Class',
    teacherName: 'Super Teacher',
    progress: 10,
  },
];

const classesAfterBreak: ClassScheduleViewProps[] = [
  {
    classState: 1,
    end: new Date(),
    start: new Date(),
    name: 'Science Class',
    teacherName: 'Eliot Baby',
    progress: 0,
  },
];

const quickActions = ['Attend Class', 'Assessments'];

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

      <div className='flex flex-col gap-x-8 lg:flex-row'>
        <div className='max-w-xs'>
          <StudentClockInTime />
          <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[29px] !pb-[27px] !pt-[18px]'>
            <div className='flex flex-col gap-5'>
              <div className='font-bold'>Quick Actions</div>

              <div className='flex flex-wrap gap-x-[25px] gap-y-10'>
                {quickActions.map((action, i) => (
                  <QuickActionButton
                    key={i}
                    title={action}
                    className='aspect-square flex-1'
                  />
                ))}
              </div>
            </div>
          </BasicCard>
        </div>
        <div className='flex-1'>
          <div>
            <div className='flex items-center justify-between'>
              <div className='text-lg font-bold text-[#6B7A99]'>
                Schedule/Classes
              </div>

              <div className='flex items-center rounded-sm border border-[#9E7200] bg-[#FFFCF5] px-4 py-1'>
                <RiCalendar2Fill className='h-5 w-5 text-[#DCA007]' />
                <div>{moment(classes[0].start).format('DD/MM/YYYY')}</div>
              </div>
            </div>
            <div className='py-8'>
              <div className='h-[2px] bg-[#F5F6F7] ' />
            </div>
            <div className='flex flex-col gap-8'>
              {classes.map((c, i) => (
                <ClassScheduleView key={i} {...c} />
              ))}
              <BreakTimeView start={new Date()} end={new Date()} />
              {classesAfterBreak.map((c, i) => (
                <ClassScheduleView key={i + classes.length} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
