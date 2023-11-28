'use client';

import BackButton from '@/components/accordions/BackButton';
import Button from '@/components/buttons/Button';
import EmptyView from '@/components/misc/EmptyView';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import clsxm from '@/lib/clsxm';
import { useGetStudentSubmittedActivity } from '@/server/institution/lesson-note';
import moment from 'moment';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';

export default function Page() {
  const params = useSearchParams();
  const { data: submissions } = useGetStudentSubmittedActivity({
    classArmId: params?.get('classArmId'),
    subjectId: params?.get('subjectId'),
    type: params?.get('type') as (typeof ACTIVITY_TYPES)[number] | undefined,
  });
  return (
    <div className='h-full layout'>
      <BackButton />
      <div className='text-3xl pt-8 text-[#D4D5D7]'>
        {'Class Work > Submissions'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Submissions</div>
      </div>

      {submissions && submissions?.length > 0 ? (
        <>
          <div className='flex gap-8 items-center text-[#746D69] bg-white p-4 rounded-md'>
            <input className='rounded-full border p-3' placeholder='search' />
            <div className='flex-1' />
            <div className='flex items-center'>
              Filter By
              <BiChevronDown className='w-6 h-6' />
            </div>
            <BiSortUp className='h-6 w-6' />
            <Link href='/teacher/lesson-note/class-work/late-submissions'>
              <Button className='bg-[#E5002B] px-10 hover:bg-[#9e001d] text-xs py-3 active:bg-[#c9072a] justify-center'>
                View Late Submissions
              </Button>
            </Link>
          </div>
          <div className='h-4' />
          <div className='grid p-4 text-[#746D69] font-bold text-sm md:text-base grid-cols-5'>
            <div className='col-span-2'>Name</div>
            <div>Date Submitted</div>
            <div>Due Date</div>
            <div></div>
          </div>
          <div className='flex flex-col gap-2'>
            {submissions &&
              (submissions.length === 0 ? (
                <EmptyView label='No submissions' useStandardHeight />
              ) : (
                submissions?.map((submission, i) => (
                  <Link
                    href={`/teacher/lesson-note/class-work/submissions/grade?subjectId=${params?.get(
                      'subjectId'
                    )}&classArmId=${params?.get(
                      'classArmId'
                    )}&type=${params?.get('type')}&submissionId=${submission.id}&format=${submission.activity.format}
                    &studentId=${submission.student.id}&activityId=${submission.activity.id}`}
                    key={submission.id}
                  >
                    <AssignmentListItem
                      id={i + 1}
                      key={submission.id}
                      title={`${submission?.student?.lastName} ${submission?.student?.firstName}`}
                      dateSubmitted={moment(submission.createdAt).format(
                        'MMMM DD'
                      )}
                    />
                  </Link>
                ))
              ))}
          </div>
          {/* <PaginatedCounter pageCount={10} currentPage={0} /> */}
        </>
      ) : (
        <EmptyView
          label='No submissions for this lesson task'
          useStandardHeight
        />
      )}
    </div>
  );
}

function AssignmentListItem({
  id,
  title,
  dateSubmitted,
}: {
  id: number;
  title: string;
  dateSubmitted?: string;
}) {
  return (
    <div
      className={clsxm(
        'border rounded bg-white p-4 grid grid-cols-5 items-center font-bold text-[#746D69]'
      )}
    >
      <div className='flex items-center col-span-2 gap-8'>
        <div>{id}.</div>
        <div className='relative rounded-full border h-16 w-16 bg-gray-300 md:block hidden '></div>
        <div>{title}</div>
      </div>
      <div>{dateSubmitted ? dateSubmitted : '-'}</div>
      <div>-</div>
      <div className='flex justify-end '>
        <Button
          disabled={!dateSubmitted}
          className='bg-[#1A8FE3] px-10 hover:bg-[#0c5d96] disabled:bg-[#BDBEBE] text-xs py-3 active:bg-[#126eb0] justify-center'
        >
          Grade
        </Button>
      </div>
    </div>
  );
}
