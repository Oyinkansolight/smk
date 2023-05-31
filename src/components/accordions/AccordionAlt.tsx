/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';

export default function AccordionAlt({
  title,
  children,
  length = 300,
  bordered = false,
}: {
  title: JSX.Element;
  children: JSX.Element;
  length?: number;
  bordered?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className='flex gap-2 cursor-pointer items-center rounded-md bg-white p-4 shadow-sm'
      >
        <BsArrowDownCircle
          className={clsxm(
            'h-[27px] w-[27px] text-[#7F9CFF] transition-transform duration-300',
            expanded ? 'rotate-180' : 'text-[#C3CAD9]'
          )}
        />
        <div className='flex-1'>{title}</div>
      </div>
      <div
        style={{
          height: expanded ? `${length}px` : '0px',
        }}
        className={clsxm(
          'overflow-hidden transition-all duration-200 overflow-y-auto',
          expanded ? '' : '',
          expanded && bordered ? 'border border-[#E3E3E3] px-6' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
}
