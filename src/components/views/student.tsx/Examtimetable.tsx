/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AcadamicCalendar = () => {
  return (
    <section>
      <div className='flex justify-between items-center'>
        <h1 className='text-base text-[#6B7A99]'> TimeTable</h1>
        <select name='' id='' className='border p-2 w-[150px] rounded text-xs'>
          <option value=''>Class Timetable</option>
          <option value=''>Exam Timetable</option>
          <option value=''>Test Timetable</option>
        </select>
      </div>
      <div className='mt-8 p-2 rounded-md'>
        <div className='flex w-full mr-10'>
          <div className='w-[150px] font-medium  p-3  border-l border-y bg-white text-gray-500'>
            Time
          </div>
          <div className='w-full grid grid-cols-5 text-base border font-medium text-center'>
            <div className='p-3 font-bold text-gray-800 border-r '>Monday</div>
            <div className='p-3 font-bold text-gray-800 border-r '>Tuesday</div>
            <div className='p-3 font-bold text-gray-800 border-r '>
              Wednesday
            </div>
            <div className='p-3 font-bold text-gray-800 border-r '>
              Thursday
            </div>
            <div className='p-3 font-bold text-gray-800 border-r '>Friday</div>
          </div>
        </div>
        <div className='flex w-full mr-10 items-stretch'>
          <div className='w-[150px] bg-white   grid place-content-center   border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid place-content-center text-xl  font-light py-5 border-y border-r  text-center'>
            Mental Mathematics
          </div>
        </div>
        <div className='flex w-full mr-10 items-stretch'>
          <div className='w-[150px] bg-white    grid place-content-center   border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid place-content-center text-xl font-light py-5 border-y border-r text-center'>
            Assembly{' '}
          </div>
        </div>
        <div>
          {[1, 2, 3, 4].map((item: any, id: number) => (
            <div key={id}>
              <div className='flex w-full items-stretch'>
                <div className='w-[150px] bg-white font-medium grid place-content-center  border'>
                  9:00 - 9:40
                </div>

                <div className='w-full grid grid-cols-5 text-gray-200  border font-semibold text-center'>
                  <div></div>
                  <div className='px-3 py-5 bg-[#FDE8FF] text-[#ED1CFF]'>
                    <p className=''>English</p>
                  </div>
                  <div className='px-3 py-5 bg-[#FFF3E2] text-[#FF9F1C]'>
                    <p className=''> Basic Science</p>
                  </div>
                  <div className='px-3 py-5 bg-[#F4FFE6] text-[#60AC00]'>
                    <p className=''>Biology</p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full mr-10 items-stretch'>
          <div className='w-[150px] bg-white    grid place-content-center   border'>
            9:00 - 9:40
          </div>
          <div className='w-full grid place-content-center text-xl font-light py-5 border-y border-r text-center'>
            Long Break
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcadamicCalendar;
