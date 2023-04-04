import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import clsxm from '@/lib/clsxm';
export default function SearchInput(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { className?: string }
) {
  return (
    <div className={clsxm('relative', props.className)}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <BiSearchAlt2 className='h-5 w-5 text-[#C3CAD9]' />
      </div>
      <input
        {...props}
        type='text'
        className='block w-full min-w-[180px] rounded-full border-none bg-white p-2.5 pl-10 font-sans text-[10px] text-gray-900 shadow-md placeholder:font-[900] placeholder:text-[#7D8FB3]'
      />
    </div>
  );
}
