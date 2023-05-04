import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';

export default function EditableFormItem({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={clsxm('border-[2px]  border-[#F5F6F7] rounded-md', className)}
    >
      <div className='h-14 items-center px-4 flex justify-between'>
        <div className='font-bold'>{title}</div>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>Done</Button>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className='text-primary font-bold cursor-pointer'
          >
            Edit
          </div>
        )}
      </div>
      <div className='h-[2px] bg-[#F5F6F7]' />
      <div className='h-16 px-4 text-[#6B7A99] flex items-center'>
        {isEditing ? (
          <BaseInput label='' name='' value={subtitle} />
        ) : (
          <div>{subtitle}</div>
        )}
      </div>
    </div>
  );
}
