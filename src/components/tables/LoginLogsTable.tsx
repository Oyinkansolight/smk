import EmptyView from '@/components/misc/EmptyView';
import { User } from '@/types/institute';
import moment from 'moment';
import Table, { TableColumn } from 'react-data-table-component';

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
        <div className='grid grid-cols-2 gap-4 md:gap-10'>
          <div className='max-w-[100px] sm:max-w-[200px] lg:max-w-[120px] overflow-hidden text-ellipsis'>{(event.user.lastName && event.user.firstName) ? `${event.user.lastName} ${event.user.firstName}` : 'Admin User'}</div>
          <div className='bg-[#FFF3EF] text-center text-[8px] font-normal text-[#FF6633] py-1 px-2 rounded-full min-w-[120px] overflow-hidden text-ellipsis'>
            {event.user.type}
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Time',
    selector: (event) => event.createdAt,
    cell: (event) => (
      <div className='font-medium text-[#ADB8CC]'>{moment(event.createdAt).format('DD MMM hh:mm a')}</div>
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
      <Table columns={columns} data={userData.slice(0, 5)} />
      {/* <div className='flex justify-end'>
        <Link
          className='flex items-center text my-2 px-4 text-[#007AFF]'
          href='#'
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div> */}
    </div>
  );
}
