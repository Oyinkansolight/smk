import clsxm from '@/lib/clsxm';
import React, { useEffect, useState } from 'react';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

interface CheckboxProps {
  name?: string;
  isChecked?: boolean;
  onClick?: () => void;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Checkbox = ({
  type = 'primary',
  onClick,
  isChecked = false,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheck = () => {
    setChecked(!checked);
    if (onClick) onClick();
  };

  return (
    <div>
      <input
        name={Math.random().toString()}
        type='checkbox'
        checked={checked}
        onChange={handleCheck}
        className='peer/checkbox hidden'
      />

      <div
        className={clsxm([
          type === 'primary' &&
          'hidden h-4 w-4 text-primary peer-checked/checkbox:block',
          type === 'success' &&
          'text-success hidden h-4 w-4 peer-checked/checkbox:block',
          type === 'warning' &&
          'hidden h-4 w-4 text-warning peer-checked/checkbox:block',
          type === 'danger' &&
          'text-danger hidden h-4 w-4 peer-checked/checkbox:block',
          type === 'info' &&
          'text-info hidden h-4 w-4 peer-checked/checkbox:block',
        ])}
      >
        <GrCheckboxSelected
          className={clsxm([
            type === 'primary' && 'text-primary',
            type === 'success' && 'text-success',
            type === 'warning' && 'fill-current text-warning',
            type === 'danger' && 'text-danger',
            type === 'info' && 'text-info',
            'fill-current',
          ])}
        />
      </div>

      <GrCheckbox
        className={clsxm([
          type === 'primary' &&
          'h-4 w-4 text-primary peer-checked/checkbox:hidden',
          type === 'success' &&
          'text-success h-4 w-4 peer-checked/checkbox:hidden',
          type === 'warning' &&
          'h-4 w-4 text-warning peer-checked/checkbox:hidden',
          type === 'danger' &&
          'text-danger h-4 w-4 peer-checked/checkbox:hidden',
          type === 'info' && 'text-info h-4 w-4 peer-checked/checkbox:hidden',
          'fill-current',
        ])}
      />
    </div>
  );
};

export default Checkbox;
