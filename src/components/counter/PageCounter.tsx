import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default function PageCounter({
  page = 1,
  onChange,
  maxPage,
}: {
  page: number;
  maxPage: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className='flex items-center gap-10'>
      <div
        onClick={() => {
          if (page === 1) return;
          onChange(page - 1);
        }}
        className='rounded-full flex justify-center items-center h-8 w-8 shadow-md'
      >
        <BiChevronLeft className='h-12 w-12' />
      </div>
      <div className='rounded-full font-bold flex justify-center items-center h-12 w-12 shadow-md'>
        <div>
          {page}/{maxPage}
        </div>
      </div>
      <div
        onClick={() => {
          if (page === maxPage) return;
          onChange(page + 1);
        }}
        className='rounded-full flex justify-center items-center h-8 w-8 shadow-md'
      >
        <BiChevronRight className='h-12 w-12' />
      </div>
    </div>
  );
}
