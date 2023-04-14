'use client';

type propType = {
  label: string;
  placeholder: string;
  formValue: string | number;
  setFormValue: (value: string | number) => void;
};

const Input = ({ label, formValue, setFormValue, placeholder }: propType) => {
  return (
    <div className=''>
      <div>
        <label htmlFor='' className='text-xs font-bold'>
          {label}
        </label>
        <div className='mt-1 w-full border p-2 rounded'>
          <input
            type='text'
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
