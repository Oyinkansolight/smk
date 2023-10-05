/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { useGetSubjectList } from '@/server/institution';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TaskListView() {
 

  const { data: subjectsList } = useGetSubjectList();
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-end'>
        <div className='flex items-center font-bold'>
          <div>Filter</div> <MdKeyboardArrowDown className='h-5 w-5' />
        </div>
        <div className='w-8' />
        <div className='flex gap-5'>
          <Button
            variant='outline'
            className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>
          <Button
            variant='outline'
            className='!text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Manage
          </Button>
        </div>
      </div>
      <div className='layout h-full'>
        <div className='flex flex-col bg-white h-screen overflow-y-auto'>
          <div className='w-full'>
            <div className='font-bold py-8 px-4 md:text-4xl text-xl'>
              Subjects
              <div className='h-px bg-black mt-[22px] mb-10 flex flex-wrap ' />
              <div className='flex flex-wrap gap-x-[52px] px-4 gap-y-10 justify-items-center'>
                {subjectsList ? (
                  subjectsList.map((v: any, i: number) => (
                    <div
                      key={v?.id ?? i}
                      onClick={() => {
                        // setCurrentView(1);
                        // setSubjectName(v?.subject?.name);
                      }}
                      className=' w-60 h-60 p-4 border cursor-pointer flex flex-col items-center justify-center gap-5 rounded-md aspect-square'
                    >
                      <div className='flex items-center justify-center h-28 w-28 font-black rounded-full border border-[#DADEE6] bg-[#E2EEFF33] text-[#DADEE6] text-5xl'>
                        <div>{v?.name?.substring(0, 1)}</div>
                      </div>
                      <div className='font-bold text-center text-lg'>
                        {v?.name ?? 'Subject Name'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
