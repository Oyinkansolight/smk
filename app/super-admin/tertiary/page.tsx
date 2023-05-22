import SchoolByType from '@/components/views/super-admin/SchoolByType';

const SchoolList = () => {
  return (
    <SchoolByType
      name='All Tertiary Schools'
      title='Total Tertiary Schools'
      type='TERTIARY'
    />
  );
};

export default SchoolList;
