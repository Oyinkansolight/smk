'use client';

import Button from '@/components/buttons/Button';

const Biodata = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>General Details</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </section>
  );
};

export default Biodata;