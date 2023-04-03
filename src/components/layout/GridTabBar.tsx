import clsxm from '@/lib/clsxm';

export default function GridTabBar({
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
    <div className='grid w-full grid-cols-2 whitespace-nowrap'>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          className={clsxm(
            'relative flex  aspect-square w-auto flex-col items-center justify-center',
            selected === i
              ? `rounded-lg  bg-white ${
                  buttonActiveClassName || 'border-blue-500 text-blue-600'
                }`
              : 'border-2 text-[#C3CAD9] hover:border-gray-400 '
          )}
        >
          <div>{item.icon}</div>
          <div className='h-4' />
          <div className='font-bold'>{item.label}</div>
          <div
            className={clsxm(
              'full absolute top-5 right-5 h-2 w-2 rounded bg-blue-500',
              selected === i ? '' : 'hidden'
            )}
          />
        </button>
      ))}
    </div>
  );
}
