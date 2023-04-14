import clsxm from '@/lib/clsxm';
import React from 'react';

interface PillProps {
  text: string;
  variant: 'primary' | 'secondary';
}

const Pill = ({ text, variant }: PillProps) => {
  return (
    <div
      className={clsxm(
        variant === 'primary' && 'bg-[#D7F9FF] text-[#6B7A99]',
        variant === 'secondary' && 'bg-[#6B7A99] text-white',
        `flex h-[19px] w-fit items-center justify-center whitespace-nowrap rounded-full px-2 text-[10px] font-light`
      )}
    >
      {text}
    </div>
  );
};

export default Pill;
