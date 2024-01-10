import clsxm from '@/lib/clsxm';

export default function TextTabBar({
  tabs,
  callback,
  onChange,
  selectedIdx,
  activeClassName,
}: {
  selectedIdx: number;
  callback?: () => void;
  activeClassName?: string;
  tabs: (string | JSX.Element)[];
  onChange: (idx: number) => void;
}) {
  return (
    <div className='flex flex-wrap gap-1 justify-start p-5 rounded-xl bg-white my-4 hideScroll'>
      {tabs.map((v, i) => (
        <div
          onClick={() => {
            onChange(i);
            callback && callback();
          }}
          className={clsxm(
            'font-bold cursor-pointer text-[#D4D5D7] whitespace-nowrap px-2',
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
