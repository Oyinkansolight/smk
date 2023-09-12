 /* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/input/formInput';
import { HTMLInputTypeAttribute } from 'react';

type InputProp = {
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  name?: string;
  helper?: HelperProps;
  isEditing?: boolean;
};

type HelperProps = {
  message?: string;
  type?: string;
};

export default function EditableFormItemAlt(prop: InputProp) {
  return prop.isEditing ? (
    <Input
      formValue={prop.value}
      setFormValue={prop.onChange}
      label={prop.label}
      placeholder={prop.placeholder}
      type={prop.type}
    />
  ) : (
    <div>
      <div className='py-1 text-[#A5A5A5] border-b border-[#F5F6F7]'>
        {prop.label}
      </div>
      <div className='text-xl py-1  border-[#F5F6F7]'>
        {prop.value ?? 'None'}
      </div>
    </div>
  );
}
