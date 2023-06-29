import Button from '@/components/buttons/Button';
import GeneralModal from '@/components/modals/general-modal';
import EditGradeCategory from '@/components/views/account-settings/EditGradeCategory';
import ManageGradeRubric from '@/components/views/account-settings/ManageGradeRubric';
import { useState } from 'react';
import ReactTable, { TableColumn } from 'react-data-table-component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  { name: 'Institution Type', cell: (row) => row.type },
  {
    name: 'Grade Category',
    cell: (row) =>
      (row.categories as string[]).length === 0
        ? '-'
        : (row.categories as string[]).join(','),
  },
  {
    name: '',
    cell: (row) => (
      <div className='flex justify-end w-full gap-4 font-semibold underline'>
        {(row.categories as string[]).length === 0 ? (
          <div className='text-[#008146]'>Add Category</div>
        ) : (
          <>
            <GeneralModal
              panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
              body={<EditGradeCategory />}
            >
              <div className='text-[#008146] cursor-pointer'>View Category</div>
            </GeneralModal>
            <GeneralModal
              panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
              body={<EditGradeCategory isEdit />}
            >
              <div className='text-[#008146] cursor-pointer'>Edit Category</div>
            </GeneralModal>
          </>
        )}
      </div>
    ),
  },
];

export default function GradeBookSettings() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [data, setData] = useState([
    {
      type: 'ECCDE',
      categories: [],
    },
    {
      type: 'Primary',
      categories: ['CA 1', 'CA 2', 'Examination'],
    },
    {
      type: 'Secondary',
      categories: [],
    },
    {
      type: 'Tertiary',
      categories: ['Test', 'Attendance', 'Examination'],
    },
  ]);
  return (
    <div className='flex flex-col gap-[22px] my-[22px]'>
      <div className='flex justify-end'>
        <GeneralModal body={<ManageGradeRubric />}>
          <Button variant='outline'>Grade Rubric Settings</Button>
        </GeneralModal>
      </div>
      <div className='bg-white'>
        <div className='text-[#6B7A99] text-xl font-bold m-4'>
          Grade Category
        </div>
        <ReactTable columns={columns} data={data}></ReactTable>
      </div>
    </div>
  );
}
