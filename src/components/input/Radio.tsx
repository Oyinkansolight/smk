import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

interface RadioProps {
  name?: string;
  isChecked?: boolean;
  onClick?: () => void;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Radio = ({ type, onClick, isChecked = false }: RadioProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheck = () => {
    setChecked(!checked);
    if (onClick) onClick();
  };

  return (
    <div onClick={handleCheck}>
      <input
        name={Math.random().toString()}
        type='radio'
        checked={checked}
        className='peer/radio hidden'
      />

      <div
        className={clsxm([
          type === 'primary' &&
            'hidden h-4 w-4 text-primary peer-checked/radio:block',
          type === 'success' &&
            'text-success hidden h-4 w-4 peer-checked/radio:block',
          type === 'warning' &&
            'hidden h-4 w-4 text-warning peer-checked/radio:block',
          type === 'danger' &&
            'text-danger hidden h-4 w-4 peer-checked/radio:block',
          type === 'info' &&
            'text-info hidden h-4 w-4 peer-checked/radio:block',
        ])}
      >
        <Image src='/icons/done.png' alt='done' height={10} width={10} />
      </div>

      <RiCheckboxBlankCircleLine
        className={clsxm([
          type === 'primary' &&
            'h-4 w-4 text-primary peer-checked/radio:hidden',
          type === 'success' &&
            'text-success h-4 w-4 peer-checked/radio:hidden',
          type === 'warning' &&
            'h-4 w-4 text-warning peer-checked/radio:hidden',
          type === 'danger' && 'text-danger h-4 w-4 peer-checked/radio:hidden',
          type === 'info' && 'text-info h-4 w-4 peer-checked/radio:hidden',
        ])}
      />
    </div>
  );
};

export default Radio;
