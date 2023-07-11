import clsxm from '@/lib/clsxm';

export default function TextTabBar({
  tabs,
  selectedIdx,
  onChange,
  activeClassName,
}: {
  tabs: (string | JSX.Element)[];
  selectedIdx: number;
  onChange: (idx: number) => void;
  activeClassName?: string;
}) {
  return (
    <div className='flex p-5 rounded-xl bg-white my-4'>
      {tabs.map((v, i) => (
        <div
          onClick={() => onChange(i)}
          className={clsxm(
            'font-bold flex-1 text-center cursor-pointer text-[#D4D5D7]',
            i === selectedIdx && 'text-black',
            i === selectedIdx && activeClassName
          )}
          key={i}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
