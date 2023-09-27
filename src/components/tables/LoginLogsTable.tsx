import EmptyView from '@/components/misc/EmptyView';
import { User } from '@/types/institute';
import moment from 'moment';
import Link from 'next/link';
import Table, { TableColumn } from 'react-data-table-component';
import { BiChevronRight } from 'react-icons/bi';

interface LoginLogsTableProps {
  id: string;
  path: string;
  method: string;
  isAuthenticated: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const columns: TableColumn<LoginLogsTableProps>[] = [
  {
    name: 'Name',
    selector: (event) => event.user.lastName,
    grow: 3,
    cell: (event) => (
      <div className='text-sm flex items-center gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className='h-6 w-6 rounded-full bg-gray-200' />
        <div>{`${event.user.lastName} ${event.user.firstName}`}</div>
        <div className='bg-[#FFF3EF] text-xs font-normal text-[#FF6633] py-1 px-2 rounded-full'>
          {event.user.type}
        </div>
      </div>
    ),
  },
  {
    name: 'Time',
    selector: (event) => event.createdAt,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC]'>{moment(event.createdAt).format('hh:mm a')}</div>
    ),
  },
];

export default function LoginLogsTable({ data }) {
  const isEmpty = !data || !data.length;

  const userData: LoginLogsTableProps[] | boolean = !isEmpty && data.filter((item) => item.user !== null);
  const noData = isEmpty || !userData || (typeof userData !== 'boolean' && userData?.length === 0) || typeof userData === 'boolean';

  if (noData) {
    return (
      <EmptyView label='No Login Logs Data' useStandardHeight />
    );
  }

  return (
    <div>
      <Table columns={columns} data={userData} />
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
