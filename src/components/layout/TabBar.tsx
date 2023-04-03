'use client';
import clsxm from '@/lib/clsxm';

export default function TabBar({
  items,
  selected,
  onSelect,
  buttonActiveClassName,
}: {
  items: { label: string; icon: JSX.Element }[];
  selected?: number;
  onSelect?: (idx: number) => void;
  buttonActiveClassName?: string;
}) {
  return (
    <div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap '>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            '-px-1 -mb-px inline-flex h-20 items-center whitespace-nowrap border-b-[3px] bg-transparent px-2 pt-2 text-center text-blue-600 focus:outline-none sm:px-4',
            selected === i
              ? buttonActiveClassName || `border-blue-500 text-[#3361FF]`
              : 'border-[#EDEFF2] text-[#ADB8CC] hover:border-gray-400'
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
