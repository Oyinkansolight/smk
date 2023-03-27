import Select, {
  ActionMeta,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';

import clsxm from '@/lib/clsxm';

export interface DropdownSelectProps {
  options: OptionsOrGroups<string, GroupBase<string>> | undefined;
  label: string;
  name?: string;
  value?: string;
  onChange?:
    | ((newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void)
    | undefined;
}

export default function DropdownSelect({
  options,
  label,
  name,
  onChange,
  value,
}: DropdownSelectProps) {
  return (
    <div className='w-full'>
      <div className='py-1 text-start text-lg font-bold'>{label}</div>
      <Select
        name={name ?? label}
        value={value}
        onChange={onChange}
        className='text-start'
        classNames={{
          control: () =>
            clsxm(
              'border border-black !rounded-lg min-w-[25rem] p-3 text-start'
            ),
        }}
        placeholder='Select Option'
        options={options}
      ></Select>
    </div>
  );
}
