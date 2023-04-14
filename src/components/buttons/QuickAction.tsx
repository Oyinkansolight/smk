import clsxm from '@/lib/clsxm';
import React from 'react';
import Icon from '~/svg/quick_action.svg';

interface QuickActionButtonProps {
  onClick?: () => void;
  title: string;
  className?: string;
}

const QuickActionButton = ({
  onClick,
  title,
  className,
}: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsxm(
        'flex flex-col items-center justify-center',
        'h-[103px] w-[142px] rounded-[9px] border-[0.5px] shadow-sm',
        className
      )}
    >
      <div className='flex flex-col items-center gap-[13.5px]'>
        <div className='flex h-[55px] w-[55px] items-center justify-center rounded-full border-2 border-[#F5F6F7] shadow-sm'>
          <Icon className='h-[28px] w-[28px]' />
        </div>
        <div className='text-[10.8px] font-bold text-[#4D5E80]'>{title}</div>
      </div>
    </button>
  );
};

export default QuickActionButton;
