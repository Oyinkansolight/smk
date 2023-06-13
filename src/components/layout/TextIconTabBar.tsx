export default function TextIconTabBar({
  items,
  idx,
  setIdx,
  trailing,
}: {
  items: { icon: JSX.Element; label: string }[];
  idx: number;
  setIdx: (idx: number) => void;
  trailing?: JSX.Element;
}) {
  return (
    <div className='flex flex-row bg-white py-4 px-6 rounded-lg justify-between h-[78px] mb-6'>
      <div className='flex flex-row gap-7'>
        {items.map((v, i) =>
          i === idx ? (
            <div
              onClick={() => setIdx(i)}
              className='flex flex-row gap-2 items-center cursor-pointer text-[#1a8fe3] font-[900]'
            >
              {v.icon}
              <div className='text-lg  text-[#1a8fe3] leading-[18px]'>
                {v.label}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIdx(i)}
              className='flex flex-row gap-2 items-center cursor-pointer text-[#D4D5D7]'
            >
              {v.icon}
              <div className='text-lg font-bold  leading-[18px]'>{v.label}</div>
            </div>
          )
        )}
      </div>

      {trailing}
    </div>
  );
}
