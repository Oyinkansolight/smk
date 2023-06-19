'use client';

import clsxm from '@/lib/clsxm';

interface propTypes {
  items: { label: string; icon: JSX.Element }[];
  selected?: number;
  onSelect?: (idx: number) => void;
  buttonActiveClassName?: string;
  variant?: 'primary' | 'secondary';
}
export default function TabBar({
  items,
  selected,
  onSelect,
  buttonActiveClassName,
  variant = 'secondary',
}: propTypes) {
  return (
    <div className='border-b-[3px] flex overflow-x-auto overflow-y-hidden whitespace-nowrap'>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            '-px-1 -mb-px inline-flex h-[70px] items-center whitespace-nowrap  bg-transparent px-2 pt-2 text-center focus:outline-none sm:px-4',

            [
              variant === 'primary' && [
                'text-primary',
                selected === i && variant === 'primary'
                  ? buttonActiveClassName || `border-primary text-primary`
                  : 'border-[#EDEFF2] text-[#ADB8CC] hover:border-gray-400',
              ],
              variant === 'secondary' && [
                'text-secondary',
                selected === i && variant === 'secondary'
                  ? buttonActiveClassName || `border-secondary text-secondary`
                  : 'border-[#EDEFF2] text-[#ADB8CC] hover:border-gray-400',
              ],
            ]
          )}
        >
          {item.icon}

          <span
            className={clsxm(
              'mx-1 text-sm',
              selected === i ? 'font-[900]' : 'font-bold'
            )}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
