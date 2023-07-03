import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

const data = [
  {
    name: 'Avril Price Institution',
    time: '10:11 pm',
  },
  {
    name: 'Avril Price Institution',
    time: '10:30 pm',
  },
  {
    name: 'Avril Price Institution',
    time: '9:00 am',
  },
  {
    name: 'Avril Price Institution',
    time: '9:00 am',
  },
  {
    name: 'Avril Price Institution',
    time: '9:00 am',
  },
];

const columns: TableColumn<(typeof data)[number]>[] = [
  {
    name: 'Institution Name',
    selector: (event) => event.name,
    grow: 3,
    cell: (event) => (
      <div className='text-lg flex items-center gap-2 font-semibold whitespace-nowrap overflow-hidden'>
        <div className='h-6 w-6 rounded-full bg-gray-200' />
        <div>{event.name}</div>
        <div className='bg-[#42BBFF] text-xs font-normal text-white py-1 px-2 rounded-full'>
          Primary
        </div>
      </div>
    ),
  },
  {
    name: <div className='ml-16'>Time</div>,
    selector: (event) => event.time,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC] ml-10'>{event.time}</div>
    ),
  },
];

export default function RecentInstitutionTable() {
  return (
    <div>
      <Table columns={columns} data={data} />
      <div className='flex justify-end'>
        <Link
          className='flex items-center text my-2 px-4 text-[#007AFF]'
          href='#'
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
