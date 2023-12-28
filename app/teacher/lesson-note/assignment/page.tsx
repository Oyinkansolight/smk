/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import GenericLoader from '@/components/layout/Loader';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetTeacherClassArms } from '@/server/institution/class-arm';
import { GetClassActivity, useGetClassActivity } from '@/server/institution/lesson-note';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronRight, BiSortDown, BiSortUp } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [dir, setDir] = useState('DESC');
  const debouncedSearchTerm = useDebounce(query, 1500);
  const [pagingData, setPagingData] = useState<any>({
    query,
    dir
  });

  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;
  const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  const activityObject: GetClassActivity = {
    page: currentPage,
    typeOfActivity: 'ASSIGNMENT',
    classArmId: (arms ?? [])[idx]?.id as unknown as string,
    termId: term as unknown as string,
    sessionId: profile?.currentSession?.[0]?.id,
    dir: pagingData.dir,
  }

  if (pagingData.query) {
    activityObject['query'] = pagingData.query;
  }

  const { data: activities, isLoading: isLoadingActivity, refetch, error }
    = useGetClassActivity(activityObject);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, query: value });
  };

  const handleSort = (value: string) => {
    setDir(value);
    setPagingData({ ...pagingData, dir: value });
  }

  const stripHtml = (content: string) => {
    //Checks if content has html tags with regex
    const regex = /(<([^>]+)>)/ig;
    if (regex.test(content)) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = content;
      return tmp.textContent || tmp.innerText || '';
    }

    //if content does not have <p> tag return content
    return content;
  }

  useEffect(() => {
    const refetchSearchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    refetchSearchRecords();
  }, [refetch, debouncedSearchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  if (isLoadingActivity || isLoadingArms) {
    return (
      <div className='flex flex-col justify-center items-center h-1/2'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <div className='h-full layout pl-0 lg:pl-20 pb-20'>
      <div
        onClick={() => router.push("/teacher/lesson-note")}
        className='flex items-center space-x-4 pt-4 cursor-pointer w-10'>
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Back</h3>
      </div>

      <div className='font-bold text-3xl py-8 h3'>
        <div>Assignment</div>
      </div>
      <TextTabBar
        tabs={[
          ...(arms ?? []).map((arm) =>
            arm.arm ? `${arm.class?.name} ${arm.arm}` : '[NULL]'
          ),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
        callback={() => setCurrentPage(1)}
      />
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input onChange={(e) => handleSearch(e.target.value)} className='rounded-full border p-3' placeholder='Search activity' />
        <div className='flex-1' />
        {/* <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div> */}

        {dir === 'DESC' && <div onClick={() => handleSort('ASC')} className='flex items-center'>
          ASC
          <BiSortUp className='h-6 w-6 cursor-pointer' />
        </div>}

        {dir === 'ASC' && <div onClick={() => handleSort('DESC')} className='flex items-center'>
          DESC
          <BiSortDown className='w-6 h-6 cursor-pointer' />
        </div>}

      </div>
      <div className='h-4' />

      {activities?.data &&
        activities?.data.length > 0 &&
        <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-5 md:grid-cols-6'>
          <div className='col-span-2'>Title</div>
          <div>Subject</div>
          <div className='hidden md:block'>Class</div>
          <div>Date Assigned</div>
          <div>Date Due</div>
        </div>
      }

      <div className='flex flex-col gap-2'>
        {activities?.data &&
          (activities?.data.length === 0 ? (
            <EmptyView
              useStandardHeight
              label='No assignments created for this class.'
            />
          ) : (
            activities?.data?.map((activity, i) => {
              const activityPath = () => {
                if (activity.mode.toUpperCase() === 'ONLINE') {
                  return `/teacher/lesson-note/assignment/submissions?subjectId=${activity.subject.id
                    }&classArmId=${(arms ?? [])[idx].id}&type=${activity.typeOfActivity
                    }&format=${activity.format}`
                }

                if (activity.mode.toUpperCase() === 'OFFLINE') {
                  return `/teacher/lesson-note/assignment/offline-submissions?subjectId=${activity.subject.id
                    }&classArmId=${(arms ?? [])[idx].id}&type=${activity.typeOfActivity
                    }&format=${activity.format}`
                }

                return `/teacher/lesson-note/assignment/submissions?subjectId=${activity.subject.id
                  }&classArmId=${(arms ?? [])[idx].id}&type=${activity.typeOfActivity
                  }&format=${activity.format}`
              }

              const activityTitle = activity?.questionsV2?.[0]?.question;

              return (
                <Link
                  key={activity.id ?? i}
                  href={activityPath()}
                >
                  <LessonTaskListItem
                    isOfflineSubmission={activity.mode.toUpperCase() === 'OFFLINE'}
                    title={
                      activity.typeOfActivity
                        ? `${stripHtml(activityTitle?.slice(0, 25) ?? activity.typeOfActivity)} ${activityTitle && '...'} -  ${activity.format}`.replace('_', ' ')
                        : '[NULL]'
                    }
                    subject={activity.subject.name ?? '[NULL]'}
                    classString={
                      (arms ?? [])[idx].arm
                        ? `${(arms ?? [])[idx].class?.name} ${(arms ?? [])[idx].arm
                        }`
                        : '[NULL]'
                    }
                    dueDate={activity.dueDate}
                    dateCreated={activity.createdAt}
                    key={i}
                  />
                </Link>
              )
            })
          ))}
      </div>

      {activities?.data &&
        activities?.data.length > 0 &&
        <PaginatedCounter
          currentPage={currentPage}
          onChange={setCurrentPage}
          pageCount={activities?.paging?.totalPage ?? 1}
        />
      }
    </div>
  );
}

function LessonTaskListItem({
  title,
  subject,
  isOfflineSubmission,
  classString,
  dueDate,
  dateCreated,
}: {
  isOfflineSubmission?: boolean;
  title: string;
  subject: string;
  classString: string;
  dueDate: Date;
  dateCreated: Date;
}) {
  return (
    <div
      className={clsxm(
        'border rounded bg-white p-4 grid grid-cols-5 md:grid-cols-6 items-center font-bold text-[#746D69]',
        moment() >= moment(dueDate) && 'border-red-500'
      )}
    >
      <div className='flex items-center col-span-2 gap-4'>
        <div className='relative rounded-full border md:block hidden h-16 w-16 '>
          <Image
            alt='book-stack'
            className='absolute inset-2'
            src='/images/book_stack.png'
            fill
          />
        </div>
        <div className='capitalize'>{title}</div>
        {isOfflineSubmission && (
          <div className='font-normal bg-[#A5A5A5] text-white text-sm py-[1px] px-3 rounded'>
            Offline
          </div>
        )}
      </div>
      <div>{subject}</div>
      <div className='hidden md:block'>{classString}</div>
      <div>{moment(dateCreated).format('MMMM DD')}</div>
      <div className='flex justify-between items-center'>
        <div className={clsxm(moment() >= moment(dueDate) && 'text-red-500')}>
          {moment(dueDate).format('MMMM DD')}
        </div>
        <BiChevronRight className='h-10 w-10' />
      </div>
    </div>
  );
}
