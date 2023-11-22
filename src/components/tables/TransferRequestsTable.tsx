/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import moment from 'moment';
import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

const columns: TableColumn<(any)[number]>[] = [
  {
    name: 'Institution From',
    selector: (event) => event?.currentInstitution?.instituteName ?? event?.id,
    grow: 3,
    cell: (event) => (
      <div className='text-sm flex items-center gap-2 font-medium whitespace-nowrap'>
        <div className='hidden lg:block h-6 w-6 rounded-full bg-gray-200' />
        <div className='max-w-[125px] overflow-hidden text-ellipsis'>
          {event?.currentInstitution?.instituteName ?? "N/A"}
        </div>
      </div>
    ),
  },
  {
    name: 'Institution To',
    selector: (event) => event?.newInstitution?.instituteName ?? event?.id,
    grow: 3,
    cell: (event) => (
      <div className='text-sm flex items-center gap-2 font-medium whitespace-nowrap'>
        <div className='hidden lg:block h-6 w-6 rounded-full bg-gray-200' />
        <div className='max-w-[125px] text-ellipsis overflow-hidden'>
          {event?.newInstitution?.instituteName ?? "N/A"}
        </div>
      </div>
    ),
  },
  {
    name: 'Time',
    selector: (event) => event.createdAt,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC] whitespace-nowrap text-ellipsis'>{
        moment(event.createdAt).format('DD MMM YYYY')
      }</div>
    ),
  },
];

export default function TransferRequestsTable({ data }) {
  if (!data || data.length === 0) return (
    <EmptyView label='No transfer requests at the moment' />
  );

  return (
    <div>
      <Table columns={columns} data={data.slice(0, 5)} />
      <div className='flex justify-end'>
        <Link
          className='flex items-center text my-2 px-4 text-[#007AFF]'
          href='/admin/transfer-staff'
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
