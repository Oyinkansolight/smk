/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { useMemo, useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';


export default function AccordionAlt({
  title,
  children,
  titleClassName,
  titleExpandedClassName,
  icon,
  setIsExpanded,
  length = 300,
  bordered = false,
  reversHeader = false,
  isExpanded = false,
}: {
  title: JSX.Element;
  titleClassName?: string;
  titleExpandedClassName?: string;
  bodyClassName?: string;
  children: JSX.Element;
  icon?: JSX.Element;
  length?: number;
  bordered?: boolean;
  reversHeader?: boolean;
  isExpanded?: boolean;
  setIsExpanded?: (isExpanded: boolean) => void;
}) {
  const [ex, setExpanded] = useState(false);

  const expanded = useMemo(() => {
    if (typeof isExpanded === 'undefined') {
      return ex;
    }
    return isExpanded;
  }, [ex, isExpanded]);

  return (
    <div>
      <div
        onClick={() => {
          if (setIsExpanded) {
            setIsExpanded(!isExpanded);
          } else {
            setExpanded(!expanded);
          }
        }}
        className={clsxm(
          'flex gap-2 cursor-pointer items-center rounded-md bg-white z-50 p-4 shadow-sm',
          bordered && 'shadow-none border-2',
          reversHeader && 'flex-row-reverse',
          titleClassName,
          expanded && titleExpandedClassName
        )}
      >
        {icon ? (
          <div
            className={clsxm(
              ' text-[#7F9CFF] transition-transform duration-300',
              expanded ? 'rotate-180' : 'text-[#C3CAD9]'
            )}
          >
            {icon}
          </div>
        ) : (
          <BsArrowDownCircle
            className={clsxm(
              'h-[27px] w-[27px] text-[#7F9CFF] transition-transform duration-300',
              expanded ? 'rotate-180' : 'text-[#C3CAD9]'
            )}
          />
        )}
        <div className='flex-1'>{title}</div>
      </div>
      <div
        style={{
          height: expanded ? `${length}px` : '0px',
        }}
        className={clsxm(
          'overflow-hidden -z-50 transition-all duration-200 overflow-y-auto',
          expanded ? '' : '',
          expanded && bordered ? 'border-x border-b border-[#E3E3E3] px-6' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
}