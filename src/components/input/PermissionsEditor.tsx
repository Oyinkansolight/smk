import SinglePermissionEditCard from '@/components/cards/SinglePermissionEditCard';

const permissions = [
  { name: 'ECCDE Institution Administration' },
  { name: 'Primary Institution Administration' },
  { name: 'Secondary Institution Administration' },
  { name: 'Tertiary Institution Administration' },
];

const permissionsList = [
  'Institution Management',
  'Student Management',
  'Teacher Management',
  'Subject Management',
  'Content/Library Management',
  'Test & Exam Management',
  'Academic & Timetable Management',
  'Admin Role Management',
  'Grade Book Management',
  'Messaging',
  'Reporting',
];

export default function PermissionsEditor({
  isEditing,
}: {
  isEditing: boolean;
}) {
  return (
    <div className='border-t-2 flex flex-col gap-4'>
      {permissions.map((v, i) => (
        <SinglePermissionEditCard
          key={`${i}`}
          isEditing={isEditing}
          permissions={permissionsList}
          title={v.name}
        />
      ))}
    </div>
  );
}
