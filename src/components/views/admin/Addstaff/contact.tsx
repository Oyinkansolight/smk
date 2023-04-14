'use client';

// import Back from '@/'

const Contact = () => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Contact Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Phone Number{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Email{' '}
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
            Address{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Town{' '}
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

export default Contact;
