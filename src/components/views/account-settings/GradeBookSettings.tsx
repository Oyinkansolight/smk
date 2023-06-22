import Button from '@/components/buttons/Button';
import ReactTable, { TableColumn } from 'react-data-table-component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  { name: 'Institution Type', cell: (row) => row.type },
  { name: 'Grade Category', cell: (row) => row.category },
  {
    name: '',
    cell: (row) => (
      <div className='flex justify-end w-full gap-4'>{row.actions}</div>
    ),
  },
];

export default function GradeBookSettings() {
  return (
    <div className='flex flex-col gap-[22px] my-[22px]'>
      <div className='flex justify-end'>
        <Button variant='outline'>Grade Rubric Settings</Button>
      </div>
      <div className='bg-white'>
        <div className='text-[#6B7A99] text-xl font-bold m-4'>
          Grade Category
        </div>
        <ReactTable
          columns={columns}
          data={[
            {
              type: 'ECCDE',
              category: '-',
              actions: (
                <>
                  <div className='text-[#008146]'>Add Category</div>
                </>
              ),
            },
            {
              type: 'Primary',
              category: 'CA 1, CA 2, Examination',
              actions: (
                <>
                  <div className='text-[#008146]'>View Category</div>
                  <div className='text-[#008146]'>Edit Category</div>
                </>
              ),
            },
            {
              type: 'Secondary',
              category: '-',
              actions: (
                <>
                  <div className='text-[#008146]'>Add Category</div>
                </>
              ),
            },
            {
              type: 'Tertiary',
              category: 'Test, Attendance, Examination',
              actions: (
                <>
                  <div className='text-[#008146]'>View Category</div>
                  <div className='text-[#008146]'>Edit Category</div>
                </>
              ),
            },
          ]}
        ></ReactTable>
      </div>
    </div>
  );
}
