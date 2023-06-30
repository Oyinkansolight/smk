import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

const data = [
  {
    eventName: 'Mathematics',
    startDate: '21-02-23',
    endDate: '21-02-23',
  },
  {
    eventName: 'English',
    startDate: '21-02-23',
    endDate: '21-02-23',
  },
  {
    eventName: 'Civic',
    startDate: '21-02-23',
    endDate: '21-02-23',
  },
];

const columns: TableColumn<(typeof data)[number]>[] = [
  {
    name: 'Event Name',
    selector: (event) => event.eventName,
    grow: 3,
    cell: (event) => (
      <div className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
        <div>{event.eventName}</div>
      </div>
    ),
  },
  {
    name: 'Start Date',
    selector: (event) => event.startDate,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC]'>{event.startDate}</div>
    ),
  },
  {
    name: 'End Date',
    selector: (event) => event.endDate,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC]'>{event.endDate}</div>
    ),
  },
];

export default function TimeTable() {
  return (
    <div>
      <Table columns={columns} data={data} />
      <div className='flex justify-end'>
        <Link className='flex items-center text my-2 text-[#007AFF]' href='#'>
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
