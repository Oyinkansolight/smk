'use client';

import Button from '@/components/buttons/Button';
import EmptyView from '@/components/misc/EmptyView';
import BreadCrumbs from '@/components/navigation/BreadCrumbs';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import { useGetStudentSubmittedActivity } from '@/server/institution/lesson-note';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const { data: submissions } = useGetStudentSubmittedActivity({
    classArmId: params?.get('classArmId'),
    subjectId: params?.get('subjectId'),
    type: params?.get('type') as (typeof ACTIVITY_TYPES)[number] | undefined,
    // studentId: 'cae64147-24d8-49f1-aa33-02b6aea56054',
  });
  return (
    <div className='layout w-full flex flex-col gap-4'>
      <BreadCrumbs
        items={[
          { label: 'Home Work' },
          { label: 'Submission' },
          { label: 'Grade' },
        ]}
      />
      <div className='bg-white rounded-md py-[8px] px-[40px] font-bold text-xl text-[#746D69]'>
        <div>
          <span className='text-[#D4D5D7]'>Subject: </span> { }
        </div>
        <div>
          <span className='text-[#D4D5D7]'>Date Assigned: </span> October 16
        </div>
        <div>
          <span className='text-[#D4D5D7]'>Topics: </span>Thermodynamics
        </div>
        <div>
          <span className='text-[#D4D5D7]'>Class: </span>Primary 1A
        </div>
      </div>
      <div className='flex font-bold text-[#746D69] gap-6 text-base'>
        <div className='flex-1 text-center'>Student Name</div>
        <div className='w-56 text-center'>Scores (40)</div>
      </div>
      <div className='bg-white flex flex-col gap-6 rounded-md p-4'>
        {submissions &&
          (submissions.length > 0 ? (
            submissions?.map((sub, i) => (
              <GradeListItem
                key={i}
                index={i}
                score={0}
                studentName={`${sub.student.lastName} ${sub.student.firstName}`}
              />
            ))
          ) : (
            <EmptyView useStandardHeight label='No Submissions for this task' />
          ))}
        <div className='flex justify-end'>
          <Button className='bg-[#1A8FE3] px-10 hover:bg-[#0c5d96] text-xs py-3 active:bg-[#126eb0] justify-center'>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

function GradeListItem({
  index,
  studentName,
  score,
}: {
  index: number;
  studentName: string;
  score: number;
}) {
  return (
    <div className='flex gap-6 h-14'>
      <div className='flex-1 px-5 text-center items-center border rounded-md flex'>
        <div>{index + 1}</div>
        <div className='w-10' />
        <div className='h-10 w-10 bg-slate-200 rounded-full px-4' />
        <div className='font-bold text-base mx-5'>{studentName}</div>
      </div>
      <div className='w-56 text-center rounded-md border flex items-center justify-center'>
        <div>{score}</div>
      </div>
    </div>
  );
}
