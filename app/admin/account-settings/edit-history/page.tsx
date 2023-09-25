import { BiUser } from 'react-icons/bi';
import { MdArrowBackIos } from 'react-icons/md';

const Page = () => {
  return (
    <div className='h-full px-12'>
      <div className='cursor-pointer flex items-center'>
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <div className='text-3xl font-bold py-8'>
        Account Details Change History
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-6'>Administrator</div>
          <div className='col-span-6'>Timestamp</div>
        </div>
        {Array(5).fill(0).map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'
            key={idx}
          >
            <div className='col-span-6 flex items-center gap-4'>
              <BiUser className='h-12 w-12' /> <div>James Omokwe</div>{' '}
            </div>
            <div className='col-span-6 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              03/03/12 22:43
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
