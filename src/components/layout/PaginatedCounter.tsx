import clsxm from '@/lib/clsxm';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';


export default function PaginatedCounter({
  pageCount,
  currentPage,
  onChange,
}: {
  pageCount: number;
  currentPage?: number;
  onChange?: (idx: number) => void;
}) {
  return (
    <div className='flex justify-center gap-4 my-4'>
      <div
        className='rounded-full border cursor-pointer bg-white h-10 w-10 flex items-center justify-center'
        onClick={() => {
          if (currentPage === 0) return;
          if (onChange) onChange((currentPage ?? 0) - 1);
        }}
      >
        <IoChevronBack />
      </div>
      {Array(pageCount)
        .fill(0)
        .map((v, i) => (
          <div
            onClick={() => onChange && onChange(i)}
            key={i}
            className={clsxm(
              'rounded-full bg-white border cursor-pointer h-10 w-10 flex items-center justify-center',
              currentPage === i &&
                'bg-[#1A8FE3] border-none text-white shadow-md'
            )}
          >
            <div>{i + 1}</div>
          </div>
        ))}
      <div
        onClick={() => {
          if (currentPage === pageCount - 1) return;
          onChange && onChange((currentPage ?? 0) + 1);
        }}
        className='rounded-full border cursor-pointer bg-white h-10 w-10 flex items-center justify-center'
      >
        <IoChevronForward />
      </div>
    </div>
  );
}