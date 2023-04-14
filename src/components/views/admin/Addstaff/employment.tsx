'use client';

// import Back from '@/'

const Employment = () => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Employment History</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Name of Employer
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Role
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <label htmlFor='' className='text-xs font-bold'>
          Select Type of Employment
        </label>
        <div>
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
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Type of Employment
          </label>
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
      </div>
    </section>
  );
};

export default Employment;
