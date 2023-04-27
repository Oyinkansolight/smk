'use client';

type propType = {
  label: string;
  placeholder: string;
  formValue: string | number;
  setFormValue: (value: string | number) => void;
  type?: string;
  disabled?: boolean;
};

const Input = ({
  label,
  formValue,
  type,
  setFormValue,
  placeholder,
  disabled,
}: propType) => {
  return (
    <div className=''>
      <div>
        <label htmlFor='' className='text-xs font-bold'>
          {label}
        </label>
        <div className='mt-1 w-full border p-2 rounded'>
          <input
            disabled={disabled}
            type={type || 'text'}
            className='w-full border-none outline-none'
            placeholder={placeholder}
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
