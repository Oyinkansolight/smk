import clsxm from '@/lib/clsxm';

interface GridTabBarProps {
  items: { label: string; icon: JSX.Element }[];
  selected?: number;
  onSelect?: (idx: number) => void;
  buttonActiveClassName?: string;
  variant?: 'primary' | 'secondary';
}

export default function GridTabBar({
  items,
  selected,
  onSelect,
  variant = 'primary',
}: GridTabBarProps) {
  return (
    <div className='grid grid-cols-2 whitespace-nowrap overflow-hidden'>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            'max-h-[108px] max-w-[108px] border-2',
            i % 2 === 0 && 'border-r-0',
            i > 1 && Number(selected) === 3 && 'border-r-2',
            i <= 1 && Number(selected) <= 1 && 'border-b-0',
            i > 1 && Number(selected) > 1 && 'border-t-0',
            'relative flex  aspect-square w-full flex-col items-center justify-center bg-[#F7F8FA] p-5',
            selected === i
              ? 'rounded-[11.57px] border-0 bg-white shadow-md'
              : 'text-[#C3CAD9]',
            selected === i && variant === 'primary' && 'text-[#3361FF]',
            selected === i && variant === 'secondary' && 'text-[#008146]',
            selected === i &&
              variant === 'secondary' &&
              'border border-[#008146]'
          )}
        >
          <div>{item.icon}</div>
          <div className='h-4' />
          <div className='font-bold text-xs'>{item.label}</div>
          <div
            className={clsxm(
              'full absolute top-5 right-5 h-2 w-2 rounded',
              selected === i ? '' : 'hidden',
              variant === 'primary' ? 'bg-[#3361FF]' : 'bg-[#008146]'
            )}
          />
        </button>
      ))}
    </div>
  );
}
