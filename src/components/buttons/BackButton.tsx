import { BiChevronLeft } from 'react-icons/bi';

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className='flex px-2 py-1 gap-3 items-center rounded cursor-pointer bg-[#EDEFF2]'
    >
      <BiChevronLeft className='h-5 w-5 text-[#E5A500]' />
      <div>Go Back</div>
    </div>
  );
}
