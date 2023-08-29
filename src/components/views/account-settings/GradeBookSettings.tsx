import Button from '@/components/buttons/Button';
import GeneralModal from '@/components/modals/general-modal';
import EditGradeCategory from '@/components/views/account-settings/EditGradeCategory';
import ManageGradeRubric from '@/components/views/account-settings/ManageGradeRubric';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetCategoryByInstitutionType } from '@/server/institution/grade';
import { useState } from 'react';
import ReactTable, { TableColumn } from 'react-data-table-component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  { name: 'Institution Type', cell: (row) => row.type },
  {
    name: 'Grade Category',
    cell: (row) => <RenderGradeCategories institutionType={row.type} />,
  },
  {
    name: '',
    cell: (row) => <RenderGradeCategoryActions institutionType={row.type} />,
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
      type: 'PRIMARY',
      categories: ['CA 1', 'CA 2', 'Examination'],
    },
    {
      type: 'SECONDARY',
      categories: [],
    },
    {
      type: 'TERTIARY',
      categories: ['Test', 'Attendance', 'Examination'],
    },
  ]);
  return (
    <div className='flex flex-col gap-[22px] my-[22px]'>
      <div className='flex justify-end'>
        <GeneralModal
          body={<ManageGradeRubric />}
          panelClassName='!max-h-[1000px] hideScroll'
        >
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

function RenderGradeCategories({
  institutionType,
}: {
  institutionType: string;
}) {
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile ? profile?.currentSession?.[0]?.id : '',
  });
  const { data } = useGetCategoryByInstitutionType({
    institutionType,
    sessionId: profile?.currentSession?.[0]?.id,
    termId: terms ? terms?.data[0].id : '',
  });
  return (
    <div>
      {!data?.data || data.data.length < 1
        ? '-'
        : data?.data.map((v) => v.categoryName).join(', ')}
    </div>
  );
}

function RenderGradeCategoryActions({
  institutionType,
}: {
  institutionType: string;
}) {
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const { data } = useGetCategoryByInstitutionType({
    institutionType,
    sessionId: profile?.currentSession?.[0]?.id,
    termId: (terms?.data ?? [])[0]?.id,
  });
  return (
    <div className='flex w-full justify-end font-bold gap-3'>
      {!data?.data || data.data.length < 1 ? (
        <GeneralModal
          panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
          body={
            <EditGradeCategory state='add' institutionType={institutionType} />
          }
        >
          <div className='text-[#008146] cursor-pointer'>Add Category</div>
        </GeneralModal>
      ) : (
        <>
          <GeneralModal
            panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
            body={<EditGradeCategory institutionType={institutionType} />}
          >
            <div className='text-[#008146] cursor-pointer'>View Category</div>
          </GeneralModal>
          <GeneralModal
            panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
            body={
              <EditGradeCategory
                institutionType={institutionType}
                state='edit'
              />
            }
          >
            <div className='text-[#008146] cursor-pointer'>Edit Category</div>
          </GeneralModal>
        </>
      )}
    </div>
  );
}
