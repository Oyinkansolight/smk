import BasicCard from '@/components/cards/Basic';
import clsxm from '@/lib/clsxm';
import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';

interface ToggleCardProps {
  title: string;
  kebab?: boolean;
  toggle?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ToggleCard = ({
  title,
  toggle = true,
  kebab = false,
  className,
  children,
}: ToggleCardProps) => {
  const [today, setToday] = useState(true);

  const toggleToday = () => setToday(!today);

  return (
    <BasicCard className={clsxm(className, '!m-0')}>
      <div className='flex flex-col gap-y-7'>
        <div className='flex flex-row items-center justify-between'>
          <div className='whitespace-nowrap text-lg font-bold text-[#4D5E80]'>
            {title}
          </div>
          <div className='flex flex-row gap-x-[10px]'>
            {toggle && (
              <div className='flex max-w-[144px] divide-x overflow-hidden rounded-full border-[2px] border-[#F5F6F7] bg-white text-[10.8px] rtl:flex-row-reverse'>
                <button
                  onClick={toggleToday}
                  className={clsxm(
                    today === true
                      ? 'bg-[#008146] !font-[900] text-white'
                      : 'bg-white text-[#6B7A99]',
                    'flex items-center justify-center py-2 px-[13px] font-medium transition-colors duration-200 hover:bg-[#008146] hover:text-white'
                  )}
                >
                  Today
                </button>

                <button
                  onClick={toggleToday}
                  className={clsxm(
                    today === false
                      ? 'bg-[#008146] !font-[900] text-white'
                      : 'bg-white text-[#6B7A99]',
                    'flex items-center justify-center py-2 px-[13px] font-medium transition-colors duration-200 hover:bg-[#008146] hover:text-white'
                  )}
                >
                  Yesterday
                </button>
              </div>
            )}

            {kebab && (
              <div className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[4px] border border-[#ECE9F1] hover:bg-[#ECE9F1] hover:text-black'>
                <CiMenuKebab className='h-[14px] w-[14px] fill-current' />
              </div>
            )}
          </div>
        </div>

        {children}
      </div>
    </BasicCard>
  );
};

export default ToggleCard;
