'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasicSearch } from '@/components/search';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import { useGetSchools } from '@/server/institution';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Castle from '~/svg/castle.svg';

// const columns: TableColumn<Institution & { idx: string }>[] = [
//   {
//     name: 'No',
//     selector: (item) => item.idx,
//     cell: (item) => <div>#{item.idx + 1}</div>,
//     width: '90px',
//     sortable: true,
//   },
//   {
//     name: 'Name',
//     grow: 2,
//     selector: (item) => item.instituteName ?? '',
//     sortable: true,
//     cell: (item) => {
//       return (
//         <div className='flex items-center gap-4 text-[#525F7F]'>
//           {!item.instituteLogo ? (
//             <AvrilImage
//               alt='avril'
//               className='h-8 w-8 min-w-[32px] min-h-[32px] rounded-full'
//             />
//           ) : !item.instituteLogo?.includes('profile_picture') ? (
//             <Image
//               src={
//                 item.instituteLogo.includes('placeimg') ||
//                 item.instituteLogo.includes('picsum')
//                   ? item.instituteLogo
//                   : `/${item.instituteLogo}`
//               }
//               className='h-8 w-8 rounded-full'
//               alt=''
//               width={20}
//               height={10}
//             />
//           ) : (
//             <FirebaseLogo path={item.instituteLogo} sizePixels={32} />
//           )}
//           <Link href={`/super-admin/school?id=${item.id}`}>
//             <h2 className='text-sm font-medium'>{item.instituteName}</h2>
//           </Link>
//         </div>
//       );
//     },
//   },
//   {
//     name: 'Type',
//     selector: (item) => item.instituteType ?? '',
//     sortable: true,
//     cell: (item) => <div className='col-span-2'>{item.instituteType} </div>,
//   },
//   {
//     name: 'Number of Students',
//     selector: (item) => item.studentCount ?? '',
//     sortable: true,
//     cell: (item) => (
//       <div className='col-span-2'>
//         {item.studentCount ?? item.students?.length}
//       </div>
//     ),
//   },
//   {
//     name: 'Number of Staff',
//     selector: (item) => item.studentCount ?? '',
//     sortable: true,
//     cell: (item) => (
//       <div className='col-span-2'>{item.staffCount ?? item.staff?.length}</div>
//     ),
//   },
//   {
//     name: 'Location',
//     selector: (item) => item.instituteAddress ?? '',
//     sortable: true,
//     cell: (item) => <div className='col-span-2'> {item.instituteAddress} </div>,
//   },
// ];

const SchoolList = ({ name, title }: { name: string; title: string }) => {
  const [instituteName, setInstituteName] = useState('');
  const [pagingData, setPagingData] = useState({
    page: 1,
    limit: 10,
    instituteName,
  });
  const { data, isLoading, refetch } = useGetSchools({ ...pagingData });

  const handleSetInstitutionName = (name: string) => {
    setInstituteName(name);
    setPagingData({ ...pagingData, instituteName: name });
  };

  useEffect(() => {
    refetch();
  }, [pagingData, refetch]);

  const InstituteTypeCard = ({ type, title, count }) => {
    return (
      <div
        className={clsxm(
          type === 'ECCDE' && 'bg-[#FFFEF5] border-[#FFE664]',
          type === 'Primary' && 'bg-[#FFF8F4] border-[#FFCAAB]',
          type === 'Tertiary' && 'bg-[#F9FFFA] border-[#73ED95]',
          type === 'Secondary' && 'bg-[#FAFDFF] border-[#A4DEFF]',
          'p-4 space-y-2 rounded-lg  border-[0.5px] '
        )}
      >
        <h4
          className={clsxm(
            type === 'ECCDE' && ' text-[#D9B80E]',
            type === 'Primary' && ' text-[#AC4407]',
            type === 'Tertiary' && ' text-[#008F28]',
            type === 'Secondary' && ' text-[#6699B6]',
            'text-sm font-normal '
          )}
        >
          {title}
        </h4>
        <h1 className='text-4xl'>{count}</h1>
      </div>
    );
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {/* <Link href='/super-admin'>
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
          <h1 className='font-semibold text-2xl'>
            {pagingData.limit * (data?.paging.totalPage ?? 0)}
          </h1>
        </div>

        <Link
          href='/super-admin/add-school'
          className='w-max rounded border bg-[#5754F7] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Institution
        </Link>
      </div>
      <Table
        handleSearchParam={handleSetInstitutionName}
        data={((data?.data ?? []) as any[]).map((item, i) => ({
          idx: pagingData.page * pagingData.limit - pagingData.limit + i,
          ...item,
        }))}
        columns={columns}
        progressPending={isLoading || !data}
        progressComponent={<div className='font-bold'>Loading...</div>}
        paginationServer
        paginationTotalRows={pagingData.limit * (data?.paging.totalPage ?? 0)}
        onChangePage={(page) => {
          setPagingData({ page, limit: pagingData.limit, instituteName });
        }}
        onChangeRowsPerPage={(limit, page) => {
          setPagingData({ page, limit, instituteName });
        }}
      /> */}

      <div className='rounded-2xl p-4 bg-[#F0FFFF]'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl'>Institutions</h1>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              An overview of all institution
            </h2>
          </div>
          <Link
            href='/super-admin/add-school'
            className='w-max h-fit py-3 rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
          >
            Add Institution
          </Link>
        </div>

        <div className='space-y-4 my-4 pt-4'>
          <InstituteTypeCard
            type='ECCDE'
            title='Total ECCDE Institution'
            count={0}
          />
          <InstituteTypeCard
            type='Primary'
            title='Total Primary Institution'
            count={0}
          />
          <InstituteTypeCard
            type='Secondary'
            title='Total Secondary Institution'
            count={data?.count ?? 0}
          />
          <InstituteTypeCard
            type='Tertiary'
            title='Total Tertiary Institution'
            count={0}
          />
        </div>
      </div>
      <div className='rounded-2xl p-4 mt-8 bg-[#FFF]'>
        <div className='flex sm:flex-row flex-col sm:justify-between justify-start items-end'>
          <div className='space-y-3'>
            <h2 className='text-[#8C8C8C] text-base font-normal'>
              List of all the Institutions in the state
            </h2>
            <BasicSearch />
          </div>
          <div className='flex space-x-2 pb-4'>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by institution</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
            <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
              <span>Filter by location</span>
              <span>
                <svg
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                    fill='#D9D9D9'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {data?.data && (
          <div className='space-y-2 mt-4'>
            {data?.data.map((item, idx) => (
              <InstitutionCard data={item} key={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const InstitutionCard = ({ data }) => {
  const isECCDE =
    data.instituteType.toLowerCase() === INSTITUTION_TYPES.ECCDE.toLowerCase();
  const isTertiary =
    data.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.TERTIARY.toLowerCase();
  const isSecondary =
    data.instituteType.toLowerCase() ===
    INSTITUTION_TYPES.SECONDARY.toLowerCase();
  const isPrimary =
    data.instituteType.toLowerCase() ===
      INSTITUTION_TYPES.PRIMARY.toLowerCase() ||
    data.instituteType.toLowerCase() === 'basic';

  return (
    <div
      className={clsxm(
        isECCDE && 'bg-[#FFFEF9] border-[#FFE664]',
        isPrimary && 'bg-[#FFF8F4] border-[#FFCAAB]',
        isTertiary && 'bg-[#F9FFFA] border-[#73ED95]',
        isSecondary && 'bg-[#FAFDFF] border-[#A4DEFF]',
        'flex flex-row justify-between border-[0.25px] border-l-2 rounded-lg p-2 h-[91px]'
      )}
    >
      <div className='text-sm flex flex-col items-start capitalize gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className='text-[#525F7F] max-w-[150px] 2xl:max-w-[200px] text-ellipsis overflow-hidden'>
          {data.instituteName}T
        </div>
        <div
          className={clsxm(
            isECCDE && 'bg-[#FFE664]',
            isPrimary && 'bg-[#FFCAAB]',
            isTertiary && 'bg-[#73ED95]',
            isSecondary && 'bg-[#6699B6]',
            'flex items-center text-[10px] px-[5px] h-5 font-normal text-white rounded-full capitalize'
          )}
        >
          {data?.instituteType ?? ''}
        </div>

        <div className='text-xs font-light text-[#855201]'>
          {data?.instituteAddress ?? ''}
        </div>
        <div className='text-xs font-light text-[#98988E]'>
          Students: {data?.students.length ?? '0'}
        </div>
        <div className='text-xs font-light text-[#98988E]'>
          Staffs: {data?.staff.length ?? '0'}
        </div>
      </div>

      <div className='flex  flex-col-reverse gap-3'>
        <Castle className='h-8 w-8 self-end opacity-50' />
      </div>
    </div>
  );
};

export default SchoolList;
