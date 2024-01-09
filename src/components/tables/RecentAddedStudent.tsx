import moment from 'moment';
import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

// const data = [
//   {
//     name: 'Allyson Stairs',
//     time: '10:11 pm',
//   },
//   {
//     name: 'Allyson Stairs',
//     time: '10:30 pm',
//   },
//   {
//     name: 'Allyson Stairs',
//     time: '9:00 am',
//   },
//   {
//     name: 'Allyson Stairs',
//     time: '9:00 am',
//   },
//   {
//     name: 'Allyson Stairs',
//     time: '9:00 am',
//   },
// ];

export default function RecentAddedStudent({ data }) {
  const columns: TableColumn<(typeof data)[number]>[] = [
    {
      name: 'Event Name',
      selector: (data) => data.user[0].firstName,
      grow: 3,
      cell: (data) => (
        <div className='text-lg flex items-center gap-2 font-semibold whitespace-nowrap overflow-hidden'>
          {/* <div className='h-6 w-6 rounded-full bg-gray-200' /> */}
          <div>{data.user[0].firstName}</div>
          <div className='bg-[#FFF3EF] text-xs font-normal text-[#FF6633] py-1 px-2 rounded-full'>
            Student
          </div>
        </div>
      ),
    },

    {
      name: 'Added',
      selector: (data) => data.createdAt,
      cell: (data) => (
        <div className='font-bold text-[#ADB8CC]'>
          {moment(data.createdAt).fromNow()}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} data={data.slice(0, 5)} />
      <div className='flex justify-end'>
        <Link
          className='flex items-center text my-2 px-4 text-[#007AFF]'
          href='/admin/all-student'
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
