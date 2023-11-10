import { BiChevronLeft } from 'react-icons/bi';
import { BsArrowLeftCircle } from 'react-icons/bs';

export default function BackButton2({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className='flex px-2 py-1 gap-3 items-center rounded cursor-pointer text-[#808080]'
    >
      <BsArrowLeftCircle className='h-5 w-5 text-[#808080]' />
      <div>Go Back</div>
    </div>
  );
}
