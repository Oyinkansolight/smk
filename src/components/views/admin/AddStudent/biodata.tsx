'use client';

const Biodata = () => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            First name
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Last name
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Gender{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Date of Birth{' '}
          </label>
          <input
            type='date'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Height{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Weight{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Parent Name{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Parent Occupation{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
