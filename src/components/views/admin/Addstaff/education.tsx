'use client';

// import Back from '@/'

const Education = () => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Education Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            School Attended
          </label>
          <div className='mt-1 w-full border p-3'>
            <input
              type='text'
              className='w-full border-none outline-none'
              placeholder='Details here'
            />
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Course Attended
          </label>
          <input
            type='email'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Grade
          </label>
          <div className='mt-1 w-full border p-3'>
            <select name='' id='' className='outline-none w-full border-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Year
          </label>
          <div className='mt-1 w-full border p-4'>
            <select name='' id='' className='outline-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            School Attended
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Course Attended
          </label>
          <input
            type='email'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Grade
          </label>
          <div className='mt-1 w-full border p-4'>
            <select name='' id='' className='outline-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Year
          </label>
          <div className='mt-1 w-full border p-4'>
            <select name='' id='' className='outline-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
