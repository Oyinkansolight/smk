import SchoolByType from '@/components/views/super-admin/SchoolByType';

const SchoolList = () => {
  return (
    <SchoolByType
      name='All Primary Schools'
      title='Total Primary Schools'
      type='PRIMARY'
    />
  );
};

export default SchoolList;
