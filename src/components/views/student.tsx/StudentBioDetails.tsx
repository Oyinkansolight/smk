import EditableFormItem from '@/components/cards/EditableFormItem';

export default function StudentBioDetails() {
  return (
    <div>
      <div className='text-[#6B7A99] font-bold text-lg'>Bio Details</div>
      <div className='h-[2px] bg-[#F5F6F7] my-6' />
      <div className='flex flex-col gap-6'>
        <EditableFormItem title='Name' subtitle='Student Name' />
        <div className='flex gap-6'>
          <EditableFormItem
            className='flex-1'
            title='Age'
            subtitle='10 Years'
          />
          <EditableFormItem className='flex-1' title='Gender' subtitle='Male' />
        </div>
        <EditableFormItem title='Other Info' subtitle='Student Name' />
      </div>
    </div>
  );
}
