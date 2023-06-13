/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export default function BaseAccordion({
  title,
  arrowIcon = <BiChevronDown className='h-6 w-6' />,
  className,
  children,
  titleClassName,
  length = 500,
}: {
  title: string | JSX.Element;
  titleClassName?: string;
  bodyClassName?: string;
  children: JSX.Element;
  arrowIcon?: JSX.Element;
  length?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={clsxm(className)}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsxm(
          'flex flex-row-reverse justify-between cursor-pointer items-center p-4',
          titleClassName
        )}
      >
        <div
          className={clsxm(
            'transition-transform duration-300',
            expanded ? 'rotate-180' : 'text-[#C3CAD9]'
          )}
        >
          {arrowIcon}
        </div>
        {title}
      </div>
      <div
        style={{
          height: expanded ? `${length}px` : '0px',
        }}
        className={clsxm(
          'overflow-hidden transition-all duration-200 overflow-y-auto px-4'
        )}
      >
        {children}
      </div>
    </div>
  );
}
