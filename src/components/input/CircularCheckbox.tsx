import Image from 'next/image';

import clsxm from '@/lib/clsxm';

export default function CircularCheckbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'relative h-5 w-5 rounded-full border border-[#126DFB]',
        checked ? 'bg-[#126DFB]' : 'bg-white'
      )}
    >
      <div className='absolute inset-1'>
        {checked && (
          <Image
            className='text-white'
            src='/svg/check.svg'
            alt='check mark'
            fill
          />
        )}
      </div>
    </div>
  );
}
