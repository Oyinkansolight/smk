import EmptyView from '@/components/misc/EmptyView';
import moment from 'moment';
import Table, { TableColumn } from 'react-data-table-component';

interface Event {
  id: string;
  title: string;
  type: string;
  institutionType: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const columns: TableColumn<Event>[] = [
  {
    name: 'Event Name',
    selector: (event) => event.title,
    grow: 3,
    cell: (event) => (
      <div className='text-sm font-medium whitespace-nowrap overflow-hidden'>
        <div className='text-[#525F7F]'>{event.title}</div>
      </div>
    ),
  },
  {
    name: 'Start Date',
    selector: (event) => event.startDate,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC] whitespace-nowrap'>
        {moment(event.startDate).format('DD MMM yyyy')}
      </div>
    ),
  },
  {
    name: 'End Date',
    selector: (event) => event.endDate,
    cell: (event) => (
      <div className='font-bold text-[#ADB8CC] whitespace-nowrap'>
        {event.startDate === event.endDate
          ? moment(event.startDate).format('DD MMM yyyy')
          : event.endDate
          ? moment(event.endDate).format('DD MMM yyyy')
          : '-'}
      </div>
    ),
  },
];

export default function EventCalendarTable({ data }) {
  if (!data || !data.length) {
    return <EmptyView label='No Event Calendar Data' useStandardHeight />;
  }

  return (
    <div>
      <Table columns={columns} data={data.slice(0, 5)} />
      <div className='flex justify-end'>
        {/* <Link
          href='/super-admin/academic-calendar'
          className='flex items-center text my-2 text-[#007AFF]'
        >
          <div>View All</div>
          <BiChevronRight className='h-5 w-5' />
        </Link> */}
      </div>
    </div>
  );
}
