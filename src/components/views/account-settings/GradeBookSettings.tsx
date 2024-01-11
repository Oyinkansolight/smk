import Button from '@/components/buttons/Button';
import GeneralModal from '@/components/modals/general-modal';
import EditGradeCategory from '@/components/views/account-settings/EditGradeCategory';
import ManageGradeRubric from '@/components/views/account-settings/ManageGradeRubric';
import { INSTITUTION_TYPES } from '@/constant/institution';
import { useGetCurrentSessionTerm } from '@/server/government/terms';
import { useGetCategoryByInstitutionType } from '@/server/institution/grade';
import { UserProfile } from '@/types/auth';
import { useState } from 'react';
import ReactTable, { TableColumn } from 'react-data-table-component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  { name: 'Institution Type', cell: (row) => row.type },
  {
    name: 'Grade Category',
    cell: (row) => (
      <RenderGradeCategories institutionType={row.type} profile={row.profile} />
    ),
  },
  {
    name: '',
    cell: (row) => (
      <RenderGradeCategoryActions
        institutionType={row.type}
        profile={row.profile}
      />
    ),
  },
];

interface GradeBookSettingsProps {
  profile?: UserProfile;
}

export default function GradeBookSettings({ profile }: GradeBookSettingsProps) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [data, setData] = useState([
    // {
    //   type: INSTITUTION_TYPES.ECCDE,
    //   categories: [],
    //   profile,
    // },
    // {
    //   type: INSTITUTION_TYPES.PRIMARY,
    //   categories: [],
    //   profile,
    // },
    {
      type: INSTITUTION_TYPES.SECONDARY,
      categories: [],
      profile,
    },
    // {
    //   type: INSTITUTION_TYPES.TERTIARY,
    //   categories: [],
    //   profile,
    // },
  ]);

  const allSessions = profile?.currentSession;

  return (
    <div className='flex flex-col gap-[22px] my-[22px]'>
      <div className='flex justify-end'>
        <GeneralModal
          body={<ManageGradeRubric allSessions={allSessions} />}
          panelClassName='!max-h-[1000px] hideScroll'
        >
          <Button variant='outline' className='bg-white'>
            Grade Rubric Settings
          </Button>
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
  profile,
  institutionType,
}: {
  profile: UserProfile;
  institutionType: string;
}) {
  const currentInstitutionSession = profile?.currentSession?.find(
    (v) => v.institutionType === institutionType
  );

  const { data: term } = useGetCurrentSessionTerm({
    sessionId: currentInstitutionSession?.id ?? '',
  });

  const { data } = useGetCategoryByInstitutionType({
    institutionType,
    sessionId: currentInstitutionSession?.id ?? '',
    termId: term ? term?.id : '',
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
  profile,
  institutionType,
}: {
  profile: UserProfile;
  institutionType: string;
}) {
  console.log(profile);
  console.log(institutionType);

  const currentInstitutionSession = profile?.currentSession?.find(
    (v) => v.institutionType === institutionType
  );

  const { data: term } = useGetCurrentSessionTerm({
    sessionId: currentInstitutionSession?.id ?? '',
  });

  const { data } = useGetCategoryByInstitutionType({
    institutionType,
    sessionId: currentInstitutionSession?.id ?? '',
    termId: term ? term?.id : '',
  });
  return (
    <div className='flex w-full justify-end font-bold gap-3'>
      {!data?.data || data.data.length < 1 ? (
        <GeneralModal
          panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
          body={
            <EditGradeCategory
              state='add'
              termId={term ? term.id : ''}
              institutionType={institutionType}
              sessionId={currentInstitutionSession?.id ?? ''}
            />
          }
        >
          <div className='text-[#008146] cursor-pointer'>Add Category</div>
        </GeneralModal>
      ) : (
        <>
          <GeneralModal
            panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
            body={
              <EditGradeCategory
                categories={data.data}
                termId={term ? term.id : ''}
                institutionType={institutionType}
                sessionId={currentInstitutionSession?.id ?? ''}
              />
            }
          >
            <div className='text-[#008146] cursor-pointer'>View Category</div>
          </GeneralModal>
          <GeneralModal
            panelClassName='!max-w-[809px] !max-h-[716px] !py-[58px] !px-[54px]'
            body={
              <EditGradeCategory
                state='edit'
                categories={data.data}
                termId={term ? term.id : ''}
                institutionType={institutionType}
                sessionId={currentInstitutionSession?.id ?? ''}
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
