/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Table from '@/components/tables/TableComponent';
import { useGetSchools } from '@/server/institution';
import { Institution } from '@/types/institute';
import Image from 'next/image';
import Link from 'next/link';
import { TableColumn } from 'react-data-table-component';
import AvrilImage from '~/svg/avril.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const columns: TableColumn<Institution & { idx: string }>[] = [
  {
    name: 'No',
    selector: (item) => item.idx,
    cell: (item) => <div>#{item.idx + 1}</div>,
    width: '90px',
    sortable: true,
  },
  {
    name: 'Name',
    grow: 2,
    selector: (item) => item.instituteName ?? '',
    sortable: true,
    cell: (item) => {
      return (
        <div className='flex items-center gap-4 text-[#525F7F]'>
          {item.instituteLogo && !item.instituteLogo?.includes('profile_picture') ? (
            <Image
              src={
                item.instituteLogo.includes('placeimg') ||
                  item.instituteLogo.includes('picsum')
                  ? item.instituteLogo
                  : `/${item.instituteLogo}`
              }
              className='h-8 w-8 rounded-full'
              alt=''
              width={20}
              height={10}
            />
          ) : (
            <AvrilImage alt='avril' className='h-8 w-8 min-w-[32px] min-h-[32px] rounded-full' />
          )}
          <Link href={`/super-admin/school?id=${item.id}`}>
            <h2 className='text-sm font-medium'>{item.instituteName}</h2>
          </Link>
        </div>
      )
    },
  },
  {
    name: 'Type',
    selector: (item) => item.instituteType ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.instituteType} </div>,
  },
  {
    name: 'Number of Students',
    selector: (item) => item.studentCount ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.studentCount}</div>,
  },
  {
    name: 'Number of Staff',
    selector: (item) => item.studentCount ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'>{item.studentCount}</div>,
  },
  {
    name: 'Location',
    selector: (item) => item.instituteAddress ?? '',
    sortable: true,
    cell: (item) => <div className='col-span-2'> {item.instituteAddress} </div>,
  },
];

const SchoolList = ({
  name,
  title,
  type,
}: {
  name: string;
  title: string;
  type?: string;
}) => {
  // const mockData = [
  //   {
  //     logo: 1,
  //     name: 'Avril Price School',
  //     numberOfStudent: '12,500',
  //     type: 'Primary',
  //     staff: '',
  //     location: 'Benin',
  //   },
  //   {
  //     logo: 2,
  //     name: 'Scaling Heights School',
  //     numberOfStudent: '12,500',
  //     type: 'Primary',
  //     staff: '',
  //     location: 'Benin',
  //   },
  //   {
  //     logo: 3,
  //     name: 'Black Dash School',
  //     numberOfStudent: '12,500',
  //     type: 'Primary',
  //     staff: '',
  //     location: 'Benin',
  //   },
  //   {
  //     logo: 4,
  //     name: 'Reaction Primary ',
  //     numberOfStudent: '12,500',
  //     type: 'Primary',
  //     staff: '',
  //     location: 'Benin',
  //   },
  //   {
  //     logo: 5,
  //     name: 'Victory International  School',
  //     numberOfStudent: '12,500',
  //     type: 'Primary',
  //     staff: '',
  //     location: 'Benin',
  //   },
  // ];
  const { data, isLoading } = useGetSchools(type ? type : '');

  // const [allSchool, setallSchool] = useState(mockData);

  // const handleSearch = (value: string) => {
  //   const result = mockData.filter((data) =>
  //     data.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setallSchool(result);
  // };

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Dashboard</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>{name}</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'> {title} </p>
          <h1 className='font-semibold text-2xl'>{(data || []).length ?? 0}</h1>
        </div>

        <Link
          href='/super-admin/add-school'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Institution
        </Link>
      </div>
      <Table
        data={((data ?? []) as any[]).map((item, i) => ({
          idx: i + 1,
          ...item,
        }))}
        columns={columns}
        progressPending={isLoading || !data}
        progressComponent={<div className='font-bold'>Loading...</div>}
      />
    </section>
  );
};

export default SchoolList;
