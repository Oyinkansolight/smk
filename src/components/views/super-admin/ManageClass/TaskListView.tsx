/* eslint-disable @typescript-eslint/no-explicit-any */
import TimeTable from '@/components/views/super-admin/SingleSchoolCalendar/Timetable';
import logger from '@/lib/logger';
import Image from 'next/image';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

interface timetableArg {
  classId: string;
  termId: number;
}
interface propType {
  schoolType: string | null;
  academicyear?: string | null;
  sessionId: string | null;
  classList: any;
  sessionterms?: any;
  currentTermId: number;
}
export default function TaskListView({
  schoolType,
  academicyear,
  classList,
  sessionId,
  currentTermId,
}: propType) {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [classId, setclassId] = useState<string>('');
  const [currentClassName, setClassName] = useState<string>('');
  const [termId, settermId] = useState<any>(null);

  function HandleTimeTable({ classId, termId }: timetableArg) {
    setShowTimeTable(true);
    logger(classId);
    setclassId(classId);
    settermId(termId);
  }


  const getClassesByInstitution = classList.filter(
    (item: any) =>
      typeof item.institutionType === 'string' &&
      item.institutionType.toLowerCase().includes(academicyear?.toLowerCase())
  );
  function customSort(a: any, b: any) {
    const aIsJSS = a.name.startsWith('JSS');
    const bIsJSS = b.name.startsWith('JSS');

    if (aIsJSS && !bIsJSS) {
      return -1;
    } else if (!aIsJSS && bIsJSS) {
      return 1;
    } else {
      // If both elements are JSS or both are SSS, sort them alphabetically.
      return a.name.localeCompare(b.name);
    }
  }

  const sortedSecondary = getClassesByInstitution
    ? getClassesByInstitution.sort(customSort)
    : [];
  return (
    <div className='flex flex-col space -y-6'>
      {!showTimeTable ? (
        <div>
          <div className='flex justify-between items-center'>
            <div className='text-[#6B7A99] font-bold text-xl'>
              {academicyear}
            </div>
          </div>

          {classList.length > 0 ? (
            <div className='mt-6'>
              {sortedSecondary.map((v: any, i: number) => {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setClassName(v.name);
                      HandleTimeTable({
                        classId: v.id,
                        termId: currentTermId,
                      });
                    }}
                    className='flex text-gray-500 font-medium justify-between items-center duration-200 transition-all hover:bg-slate-200 w-full border-2  border-gray-200 rounded p-4 mb-2'
                  >
                    <div>{`${v.name}`}</div>
                    <BsArrowRight size={20} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='py-10 text-center'>No class found</div>
          )}
        </div>
      ) : (
        <div className='mt-2'>
          <div className='flex justify-between items-center pr-4'>
            <button
              onClick={() => {
                setShowTimeTable(false);
              }}
              className='flex items-center space-x-4 bg-[#EDEFF2] rounded-md px-3 py-1'
            >
              <Image
                src='/svg/back_yellow.svg'
                width={10}
                height={10}
                alt='back'
                className='h-3 w-3'
              />
              <h3 className='text-[14px] font-bold'>Back</h3>
            </button>
            <h3 className='font-medium text-base'>{currentClassName} </h3>
          </div>
          <TimeTable
            sessionId={sessionId}
            schoolType={schoolType}
            classId={classId}
            termId={termId}
          />
        </div>
      )}
    </div>
  );
}
