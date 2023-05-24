import clsxm from '@/lib/clsxm';

export default function TextTabBar({
  tabs,
  selectedIdx,
  onChange,
}: {
  tabs: string[];
  selectedIdx: number;
  onChange: (idx: number) => void;
}) {
  return (
    <div className='flex  p-5 rounded-xl bg-white my-4'>
      {tabs.map((v, i) => (
        <div
          onClick={() => onChange(i)}
          className={clsxm(
            'font-bold flex-1 text-center cursor-pointer text-[#D4D5D7]',
            i === selectedIdx && 'text-black'
          )}
          key={i}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
