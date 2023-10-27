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
          if (currentPage === 1) return;
          if (onChange) onChange((currentPage ?? 1) - 1);
        }}
      >
        <IoChevronBack />
      </div>
      {Array(pageCount)
        .fill(0)
        .slice(0, 3)
        .map((v, i) => (
          <div
            onClick={() => onChange && onChange(i + 1)}
            key={i}
            className={clsxm(
              'rounded-full bg-white border cursor-pointer h-10 w-10 flex items-center justify-center',
              currentPage === i + 1 &&
              'bg-[#1A8FE3] border-none text-white shadow-md'
            )}
          >
            <div>{i + 1}</div>
          </div>
        ))}

      {currentPage !== undefined && pageCount > 3 &&
        <div
          key={Math.random() * 100}
          className={clsxm(
            (currentPage >= 4 && currentPage < pageCount)
              ? 'bg-[#1A8FE3] border-none text-white shadow-md' :
              'bg-white text-black',
            'rounded-full border cursor-pointer h-10 w-10 flex items-center justify-center',
          )}
        >
          {currentPage >= 4 && currentPage < pageCount ? currentPage : 4}
        </div>
      }

      {pageCount > 5 && (
        <div
          key={Math.random() * 100}
          className={clsxm(
            'bg-white text-gray-500',
            'rounded-full border cursor-pointer h-10 w-10 flex items-center justify-center',
          )}
        >
          ...
        </div>
      )}

      {/* <div
        className={clsxm(
          currentPage === pageCount
          && 'bg-[#1A8FE3] border-none text-white shadow-md',
          'rounded-full bg-white border cursor-pointer h-10 w-10 flex items-center justify-center'
        )}
      >
        {pageCount}
      </div> */}

      <div
        onClick={() => {
          if (currentPage === pageCount - 1) return;
          onChange && onChange((currentPage ?? 1) + 1);
        }}
        className='rounded-full border cursor-pointer bg-white h-10 w-10 flex items-center justify-center'
      >
        <IoChevronForward />
      </div>
    </div>
  );
}
