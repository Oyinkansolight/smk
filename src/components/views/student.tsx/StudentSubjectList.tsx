import AccordionAlt from '@/components/accordions/AccordionAlt';
import PeriodStatusModal from '@/components/modals/period-status-modal';
import { useState } from 'react';
import { AiFillFlag } from 'react-icons/ai';
import { BiChevronLeft } from 'react-icons/bi';


export default function StudentSubjectList() {
  const subjects = ['Mathematics', 'Further Mathematics', 'English', 'Civic'];
  const [currentView, setCurrentView] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  return (
    <div>
      {currentView === 0 && (
        <div className='bg-white border-2 rounded-md'>
          <div className='mx-8 font-bold text-2xl text-[#6B7A99] my-4 border-b'>
            Subjects
          </div>
          <div className='p-8'>
            <div className='flex justify-between py-6 px-4 border-[#F5F6F7] bg-[#F8FDFF] border-2 rounded-md items-center'>
              <div className='flex items-center gap-8'>
                <div>Class:</div>
                <div className='text-bold text-2xl text-[#5A5A5A]'>
                  Primary 1
                </div>
              </div>
              <div>
                <div className='text-end'>Class Teacher:</div>
                <div className='flex gap-4 items-center'>
                  <div className='bg-gray-500 rounded-full h-10 w-10' />
                  <div className='text-[#8898AA] font-bold text-lg'>
                    James Grace
                  </div>
                </div>
              </div>
            </div>
            <div className='h-12' />
            <div className='grid grid-cols-4 gap-4'>
              {Array(16)
                .fill(0)
                .map((v, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentView(1);
                      setSubjectName(subjects[i % subjects.length]);
                    }}
                    className='border cursor-pointer flex flex-col items-center justify-center gap-5 rounded-md w-full aspect-square'
                  >
                    <div className='flex items-center justify-center h-28 w-28 font-black rounded-full border border-[#DADEE6] bg-[#E2EEFF33] text-[#DADEE6] text-5xl'>
                      <div>{subjects[i % subjects.length].substring(0, 1)}</div>
                    </div>
                    <div className='font-bold text-center text-lg'>
                      {subjects[i % subjects.length]}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {currentView === 1 && (
        <div className='bg-white border-2 rounded-md'>
          <div className='flex justify-start px-8'>
            <div
              onClick={() => setCurrentView(0)}
              className='flex items-center py-1 px-3 cursor-pointer rounded-md bg-[#EDEFF2] gap-2 my-5'
            >
              <BiChevronLeft className='text-[#E5A500] h-8 w-8' />
              <div>Go Back</div>
            </div>
          </div>
          <div className='p-8'>
            <div className='flex justify-between py-6 px-4 border-[#F5F6F7] bg-[#F8FDFF] border-2 rounded-md items-center'>
              <div className='grid grid-cols-2 items-center'>
                <div>Class:</div>
                <div className='text-bold text-2xl text-[#5A5A5A]'>
                  Primary 1
                </div>
                <div>Subject:</div>
                <div className='text-bold text-2xl text-[#5A5A5A]'>
                  {subjectName}
                </div>
              </div>
              <div>
                <div className='text-end'>Class Teacher:</div>
                <div className='flex gap-4 items-center'>
                  <div className='bg-gray-500 rounded-full h-10 w-10' />
                  <div className='text-[#8898AA] font-bold text-lg'>
                    James Grace
                  </div>
                </div>
              </div>
            </div>
            <div className='h-12' />
            <div className='flex gap-4 flex-col'>
              {Array(16)
                .fill(0)
                .map((v, i) => (
                  <AccordionAlt
                    key={i}
                    title={
                      <div className='flex text-[#6B7A99] items-center'>
                        <div className='font-extrabold'>Week {i + 1}</div>
                        <div className='w-20' />
                        <AiFillFlag className='h-6 w-6' />
                        <div className='w-10' />
                        <div>
                          Theme:{' '}
                          <span className='font-bold'>Number Theory</span>
                        </div>
                        <div className='w-20' />
                        <div>
                          Topic/Sub Theme:{' '}
                          <span className='font-bold'>Number Theory</span>
                        </div>
                      </div>
                    }
                    length={200}
                  >
                    <div className='flex flex-col px-4'>
                      {Array(4)
                        .fill(0)
                        .map((v, i) => (
                          <PeriodStatusModal key={i}>
                            <div className='grid grid-cols-4 cursor-pointer py-4 border-y'>
                              <div>Period 1</div>
                              <div className='text-[#6B7A99]'>
                                Title:{' '}
                                <span className='font-bold'>Even Numbers</span>
                              </div>
                              <div className='flex text-[#6B7A99] col-span-2 justify-end'>
                                <div className='cursor-pointer'>View</div>
                              </div>
                            </div>
                          </PeriodStatusModal>
                        ))}
                    </div>
                  </AccordionAlt>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}