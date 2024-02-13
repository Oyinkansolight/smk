/* eslint-disable @typescript-eslint/no-explicit-any */
// import PaymentStatus from '@/components/profile/PaymentStatus';
import GeneralModal from '@/components/modals/general-modal';
import Table from '@/components/tables/TableComponent';
import StudentListPromotion from '@/components/views/admin/Class/studentListPromotion';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import Link from 'next/link';
import { TableColumn } from 'react-data-table-component';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Iprop {
  classArmId: string | null | undefined;
  PromotionTab?: boolean | null | undefined;
}

const studentListColumns: TableColumn<any>[] = [
  { name: 'Number', cell: (row) => <div className='truncate'> {row.id}</div> },
  {
    name: 'Name',
    cell: (row) => (
      <div>
        {row.user[0].firstName} {row.user[0].lastName}
      </div>
    ),
  },
  {
    name: 'Reading Proficiency',
    cell: (row) => <div>{row.readingProficiency} </div>,
  },
  {
    name: 'Attendance Rate',
    cell: () => <div className='text-gray-500 font-bold text-center'>{0}%</div>,
  },
];

export default function StudentList({
  classArmId,
  PromotionTab = false,
}: Iprop) {
  const { data: getInstitutionStudents } = useGetClassArmStudents({
    classArmId: classArmId,
  });

  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        <div className='rounded px-5 flex items-center justify-end'>
          {PromotionTab ? (
            <GeneralModal
              body={<StudentListPromotion classArmId={classArmId} />}
            >
              <button className='w-max rounded border border-secondary px-6 py-3 text-center text-xs text-[#007AFF] '>
                Promote Student
              </button>
            </GeneralModal>
          ) : (
            <Link
              href='/admin/add-student'
              className='w-max rounded border border-secondary px-6 py-3 text-center text-xs text-[#007AFF] '
            >
              Add Student
            </Link>
          )}
        </div>
        <Table
          showFilter={false}
          showSearch={false}
          columns={studentListColumns}
          data={getInstitutionStudents ?? []}
          // data={[]}
        />
      </div>
    </div>
  );
}
