import clsxm from '@/lib/clsxm';

export default function GridTabBar({
  items,
  selected,
  onSelect,
}: {
  items: { label: string; icon: JSX.Element }[];
  selected?: number;
  onSelect?: (idx: number) => void;
  buttonActiveClassName?: string;
}) {
  return (
    <div className='grid w-full grid-cols-2 whitespace-nowrap'>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            'border-2',
            i % 2 === 0 && 'border-r-0',
            i > 1 && Number(selected) === 3 && 'border-r-2',
            i <= 1 && Number(selected) <= 1 && 'border-b-0',
            i > 1 && Number(selected) > 1 && 'border-t-0',
            'relative flex  h-[108px] w-[108px] flex-col items-center justify-center bg-[#F7F8FA] p-5',
            selected === i
              ? 'rounded-[11.57px] border-0 bg-white text-[#3361FF] shadow-lg'
              : 'text-[#C3CAD9]'
          )}
        >
          <div>{item.icon}</div>
          <div className='h-4' />
          <div className='font-bold'>{item.label}</div>
          <div
            className={clsxm(
              'full absolute top-5 right-5 h-2 w-2 rounded bg-[#3361FF]',
              selected === i ? '' : 'hidden'
            )}
          />
        </button>
      ))}
    </div>
  );
}
