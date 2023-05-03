import clsxm from '@/lib/clsxm';

export default function AccountSettingsSideBar({
  items,
  onClick,
  selected,
}: {
  selected: number;
  items: string[];
  onClick: (idx: number) => void;
}) {
  return (
    <div className='bg-white'>
      {items.map((v, i) => (
        <div
          onClick={() => onClick(i)}
          key={i}
          className={clsxm(
            'bg-white border border-l-4 border-transparent text-lg px-6 py-2 cursor-pointer',
            selected === i && 'border-secondary'
          )}
        >
          <div>{v}</div>
        </div>
      ))}
    </div>
  );
}
