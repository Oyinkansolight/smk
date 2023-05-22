import SchoolByType from '@/components/views/super-admin/SchoolByType';

const SchoolList = () => {
  return (
    <SchoolByType
      name='All ECCDE Schools'
      title='Total ECCDE Schools'
      type='ECCDE'
    />
  );
};

export default SchoolList;
