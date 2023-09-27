import EmptyView from '@/components/misc/EmptyView';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import { Institution } from '@/types/institute';
import moment from 'moment';
import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

const columns: TableColumn<(Institution)>[] = [
  {
    name: 'Institution Name',
    selector: (event) => event.instituteName ?? '',
    grow: 3,
    cell: (event) => (
      <div className='text-sm flex items-center gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className='h-6 w-6 rounded-full bg-gray-200' />
        <div className='text-[#525F7F] max-w-[150px] 2xl:max-w-[200px] text-ellipsis overflow-hidden'>{event.instituteName}</div>
        <div
          className={clsxm(
            event.instituteType === INSTITUTION_TYPES.SECONDARY && 'bg-[#FF7C33]',
            event.instituteType === INSTITUTION_TYPES.TERTIARY && 'bg-[#42BBFF]',
            'flex items-center text-[10px] px-[5px] h-4 font-normal text-white rounded-full capitalize'
          )}
        >
          {event.instituteType}
        </div>
      </div>
    ),
  },
  {
    name: 'Time',
    selector: (event) => moment(event.createdAt).format('hh:mm a'),
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC]'>{moment(event.createdAt).format('hh:mm a')}</div>
    ),
  },
];

export default function RecentlyAddedInstitutions({ data }) {
  if (!data || !data.length) {
    return (
      <EmptyView label='No Institution Data' useStandardHeight />
    );
  }

  return (
    <div>
      <Table columns={columns} data={data.slice(0, 5)} />
      <div className='flex justify-end'>
        <Link
          className='flex items-center text my-2 px-4 text-[#007AFF]'
          href="/super-admin/all-school"
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
