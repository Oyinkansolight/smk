import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

const data = [
  {
    institutionName: 'Avril Price Institution',
    time: '10:11 pm',
  },
  {
    institutionName: 'Avril Price Institution',
    time: '10:30 pm',
  },
  {
    institutionName: 'Auchi Polytechnic',
    time: '9:00 am',
  },
  {
    institutionName: 'Auchi Polytechnic',
    time: '9:00 am',
  },
  {
    institutionName: 'Auchi Polytechnic',
    time: '9:00 am',
  },
];

const columns: TableColumn<(typeof data)[number]>[] = [
  {
    name: 'Institution From',
    selector: (event) => event.institutionName,
    grow: 3,
    cell: (event) => (
      <div className='text-lg flex items-center gap-2 font-semibold whitespace-nowrap overflow-hidden'>
        <div className='h-6 w-6 rounded-full bg-gray-200' />
        <div className='text-[#525F7F]'>{event.institutionName}</div>
      </div>
    ),
  },
  {
    name: 'Institution To',
    selector: (event) => event.institutionName,
    grow: 3,
    cell: (event) => (
      <div className='text-lg flex items-center gap-2 font-semibold whitespace-nowrap overflow-hidden'>
        <div className='h-6 w-6 rounded-full bg-gray-200' />
        <div className='text-[#525F7F]'>{event.institutionName}</div>
      </div>
    ),
  },
  {
    name: 'Time',
    selector: (event) => event.time,
    grow: 0,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC] '>{event.time}</div>
    ),
  },
];

export default function SuperTransferRequestsTable() {
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
