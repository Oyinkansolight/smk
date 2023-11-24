/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';

export default function BackButton() {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className='cursor-pointer flex items-center my-4'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </button>
    </div>
  );
}
