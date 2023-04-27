'use client';

const Publish = () => {
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Publish</h2>
      <p>Kindly ensure that the details below are correct before submitting:</p>

      <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Week</h2>
            <p>Week 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Period</h2>
            <p>Period 1</p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Subject</h2>
            <p>Mathematics</p>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4  items-center mb-10 py-5 border-b'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Title</h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Teaching Method</h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>
              Instructional Materials
            </h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>
              Teacher Preparation for the lesson
            </h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Step 1</h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Subjects</h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publish;
