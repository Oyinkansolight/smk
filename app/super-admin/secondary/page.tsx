import SchoolByType from '@/components/views/super-admin/SchoolByType';

const SchoolList = () => {
  return (
    <SchoolByType
      name='All Secondary Schools'
      title='Total Secondary Schools'
      type='SECONDARY'
    />
  );
};

export default SchoolList;
