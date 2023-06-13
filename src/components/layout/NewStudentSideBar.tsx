import Image from 'next/image';

const items = [
  {
    img: '/images/sidebar-icons/Dashboard.png',
    label: 'Dashboard',
  },
  {
    img: '/images/sidebar-icons/Classes.png',
    label: 'Period',
  },
  {
    img: '/images/sidebar-icons/Subjects.png',
    label: 'Subjects',
  },
  {
    img: '/images/sidebar-icons/Dashboard-1.png',
    label: 'Timetable',
  },
  {
    img: '/images/sidebar-icons/Dashboard-2.png',
    label: 'Attendance',
  },
  {
    img: '/images/sidebar-icons/Assignment.png',
    label: 'Assignments',
  },
  {
    img: '/images/sidebar-icons/Performance.png',
    label: 'Grade Book',
  },
  {
    img: '/images/sidebar-icons/Dashboard-4.png',
    label: 'Settings',
  },
];
export default function NewStudentSidebar() {
  return (
    <div className='flex bg-[#f5f9ff] flex-col gap-8 w-40 items-center justify-center py-4 border-r'>
      {items.map((v, i) => (
        <div
          key={i}
          className='flex flex-col whitespace-nowrap p-6 gap-1 text-[#CACACA] hover:text-extrabold hover:text-[#3361FF] items-center hover:border hover:bg-[#F5F8FF] h-16 w-24 justify-center rounded-lg cursor-pointer border-[#3361FF]'
        >
          <Image src={v.img} alt={v.img} height={49} width={52} />
          <div className=' text-sm'>{v.label}</div>
        </div>
      ))}
    </div>
  );
}
