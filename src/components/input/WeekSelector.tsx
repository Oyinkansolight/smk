import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function WeekSelector({
  max,
  index,
  onChange,
}: {
  max: number;
  index: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className='flex items-center font-bold my-5 gap-3'>
      <IoChevronBack
        onClick={() => {
          if (index > 0) {
            onChange(index - 1);
          }
        }}
        className='text-blue-500 h-5 w-5'
      />{' '}
      <div>Week {index + 1}</div>{' '}
      <IoChevronForward
        className='text-blue-500 h-5 w-5'
        onClick={() => {
          if (index < max) {
            onChange(index + 1);
          }
        }}
      />
    </div>
  );
}
