'use client';
import clsxm from '@/lib/clsxm';

export default function TabBar({
  items,
  selected,
  onSelect,
}: {
  items: { label: string; icon: JSX.Element }[];
  selected?: number;
  onSelect?: (idx: number) => void;
}) {
  return (
    <div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200'>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            '-px-1 -mb-px inline-flex h-20 items-center whitespace-nowrap border-b-4 bg-transparent px-2 py-2 text-center text-blue-600 focus:outline-none sm:px-4',
            selected === i
              ? 'border-blue-500 text-blue-600'
              : 'text-gray-700 hover:border-gray-400'
          )}
        >
          {item.icon}

          <span className='mx-1 text-sm font-bold'>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
