'use client';

type propType = {
  label: string;
  formValue: string | number;
  setFormValue: (value: string | number) => void;
  options: string[];
};

const Input = ({ label, formValue, setFormValue, options }: propType) => {
  return (
    <div className=''>
      <div>
        <label htmlFor='' className='text-xs font-bold'>
          {label}
        </label>
        <div className='mt-1 w-full border p-2 rounded'>
          <select
            name=''
            id=''
            className='w-full border-none outline-none capitalize'
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          >
            <option> -- Select -- </option>

            {options.map((item, id) => (
              <option key={id} value={item} selected={formValue === item}>
                {' '}
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Input;
