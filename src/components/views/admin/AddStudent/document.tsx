'use client';

// import Back from '@/'

const Document = () => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Upload Documents</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Upload ID Card Image{' '}
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
            Upload{' '}
          </label>
          <input
            type='file'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Document Type{' '}
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Upload{' '}
          </label>
          <input
            type='filern'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
    </section>
  );
};

export default Document;
