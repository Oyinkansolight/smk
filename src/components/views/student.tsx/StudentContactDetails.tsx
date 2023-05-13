import EditableFormItem from '@/components/cards/EditableFormItem';

export default function StudentContactDetails() {
  return (
    <div>
      <div className='text-[#6B7A99] font-bold text-lg'>Contact Details</div>
      <div className='h-[2px] bg-[#F5F6F7] my-6' />
      <div className='flex flex-col gap-6'>
        <EditableFormItem
          title='Parent Name'
          subtitle='Beside the address, somewhere in benin city'
        />
        <EditableFormItem
          className='flex-1'
          title='Parent Name'
          subtitle='Beside the address, somewhere in benin city'
        />
        <EditableFormItem
          className='flex-1'
          title='Address'
          subtitle='Beside the address, somewhere in benin city'
        />
        <EditableFormItem title='Office Phone Number' subtitle='080837378292' />
      </div>
    </div>
  );
}
