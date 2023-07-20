/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { CircularCounter } from '@/components/counter';
import Editweek from '@/components/modal/Editweek';
import AddWeekModal from '@/components/modals/add-week-modal';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';
import request from '@/server';
import { getErrMsg } from '@/server';
import { useCreateCurriculum } from '@/server/Schedule';
import { useGetAcademicSessionsTermsWeek } from '@/server/institution';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface propType {
  termId: number;
  sessionId: any;
  classId: number;
}

export default function AllCurriculumView({
  termId,
  sessionId,
  classId,
}: propType) {
  const params = useSearchParams();
  const [periods, setperiods] = useState<any[]>([]);
  const [periodsList, setperiodsList] = useState<any[]>([]);
  const [periodsUpdate, setperiodsUpdate] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [theme, settheme] = useState<string | number>('');
  const [topic, settopic] = useState<string | number>('');
  const [weekid, setWeekId] = useState<string | number>(0);

  const id = params?.get('id') as string;

  function getOccurrences(timetableData: any) {
    const occurrences: any[] = [];
    const periodSettings: any[] = [];

    for (const entry of timetableData) {
      const occurrence = {
        id: entry.id,
        title: 'No title',
        day: entry.day,
        startTime: entry.startTime ?? '9:00',
        endTime: entry.endTime ?? '10:00',
      };
      occurrences.push(occurrence);

      periodSettings.push({
        periodId: null,
        periodTitle: '',
        fileId: 2,
        teacherId: 1,
      });
    }

    setperiodsUpdate(periodSettings);
    return occurrences;
  }

  // "weekId": 73,
  // "theme": "Period theme test",
  // "topic": "Period topic test",
  // "periods": [
  //     {
  //         "periodId": 235,
  //         "periodTitle": "Period title here",
  //         "fileId": 2,
  //         "teacherId": 1
  //     }
  // ]
  const handleCreateCurriculum = useCreateCurriculum();
  const handleSubmit = async () => {
    const data = {
      weekId: weekid,
      theme,
      topic,
      periods: periodsUpdate,
    };
    try {
      const response = await handleCreateCurriculum.mutateAsync(data);
      if (response) {
        toast.success('Curriculum updated successful');
        onClickHandler && onClickHandler();
        location.reload();
      }
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };

  function fetchPeriods(weekId: string | number) {
    setWeekId(weekId);
    setLoading(true);

    request
      .get(
        `/v1/institutions/institutes/get-week-periods-by-subject?sessionId=${sessionId}&classId=${classId}&termId=${termId}&weekId=${weekId}&subjectId=${id}`, {
        withCredentials: true
      }
      )
      .then((res) => {
        setLoading(false);
        setperiods(res.data.data.data.data);
        setperiodsList(getOccurrences(res.data.data.data.data));
      })
      .catch((err) => {
        logger(err);
        setLoading(false);
      });
  }

  const { data } = useGetAcademicSessionsTermsWeek(termId);

  // const router = useRouter();

  const [modal, setModal] = useState(false);
  const [showcontent, setShowContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onClickHandler = () => {
    setModal(!modal);
  };
  const isEmpty = false;
  const count = 100;
  return (
    <div className='bg-white h-full p-4'>
      <div className='rounded-lg py-6 px-6 flex items-center bg-[#ECF4FF]'>
        <div>First Term Curriculum</div>
        <div className='flex-1' />
        {count === 100 ? (
          <Image
            src='/images/curriculum_done.png'
            alt='done'
            height={65}
            width={65}
          />
        ) : (
          <CircularCounter size='sm' total={count} />
        )}
      </div>
      <div className='h-4' />
      <div className='flex flex-col space-y-6'>
        {isEmpty ? (
          <div className='flex flex-col items-center gap-8'>
            <div className='h-10' />
            <Image
              src='/images/empty_box.png'
              alt='empty-box'
              height={128}
              width={128}
            />
            <div className='text-xl'>You have not added a school type yet</div>
            <AddWeekModal>
              <Button variant='outline'>Add Week</Button>
            </AddWeekModal>
          </div>
        ) : (
          (data?.data || []).map((v: any, i: number) => {
            return (
              // <TaskAccordion
              //   bordered
              //   length={4}
              //   lesson={false}
              //   taskName={v.name}
              //   subName={
              //     <div className='flex items-center flex-1 w-full justify-between'>
              //       <div className='flex items-center flex-1 w-[400px]'>
              //         <AiTwotoneFlag className='h-5 w-5 text-[#C3CAD9]' />
              //         <div className='w-4' />
              //         <div>
              //           Theme: <span className='font-bold'>{v.theme}</span>
              //         </div>
              //       </div>
              //       <div className='flex items-center flex-1 w-full'>
              //         <div>
              //           Topic/Sub-Theme:
              //           <span className='font-bold'>{v.topic}</span>
              //         </div>
              //       </div>
              //     </div>
              //   }
              //   actions={
              //     <div className='flex items-center'>
              //       <button
              //         className='border border-primary text-primary p-2 rounded-sm'
              //         onClick={() => {
              //           setModal(true);
              //         }}
              //       >
              //         Edit Week
              //       </button>
              //       <div className='w-2' />
              //       <SlOptionsVertical className='w-4 h-4' />
              //     </div>
              //   }
              //   showIcons={false}
              //   key={i}
              // >
              //   <div className='flex flex-col divide-y-2 !text-xs pt-[33px]'>
              //     {result.map((v: any, j: number) => {
              //       return (
              //         <div
              //           key={j}
              //           className={clsxm(
              //             j === 0 && 'border-t',
              //             j === 3 && 'border-b',
              //             'flex flex-row justify-between py-[22px]'
              //           )}
              //         >
              //           <div>Period {j + 1}</div>
              //           <div>
              //             <span className='text-[#8898AA]'>Title</span>:
              //             {v.title}
              //           </div>
              //           <div className='flex flex-row text-[#ADB3CC] gap-[10px]'>
              //             <div
              //               className='cursor-pointer'
              //               onClick={() =>
              //                 router.push('/super-admin/view-period')
              //               }
              //             >
              //               View
              //             </div>
              //             {/* <div
              //                 className='cursor-pointer'
              //                 onClick={() =>
              //                   router.push('/super-admin/edit-period')
              //                 }
              //               >
              //                 Edit
              //               </div>
              //               <div>Delete</div> */}
              //           </div>
              //         </div>
              //       );
              //     })}
              //   </div>
              // </TaskAccordion>
              <div key={i}>
                <div
                  onClick={() => {
                    setShowContent(!showcontent);
                    setCurrentIndex(i);
                    fetchPeriods(v.id);
                  }}
                  className='border-b grid grid-cols-12 gap-4 items-center py-4 cursor-pointer'
                >
                  <div className='col-span-2'>{v.name} </div>
                  <div className='col-span-4'>
                    Theme: <span className='font-bold'>{v.theme}</span>
                  </div>
                  <div className='col-span-4'>
                    Topic/Sub-Theme:
                    <span className='font-bold'>{v.topic}</span>
                  </div>
                  <div className='col-span-2'>
                    <button
                      className='border border-primary text-primary p-2 rounded-sm'
                      onClick={() => {
                        setModal(true);
                        fetchPeriods(v.id);
                      }}
                    >
                      Edit Week
                    </button>
                  </div>
                </div>
                {showcontent && currentIndex === i && (
                  <div className='w-full border duration-200 transition-all flex flex-col divide-y-2 !text-xs mt-[33px]'>
                    {periods.map((v: any, j: number) => {
                      return (
                        <div
                          key={j}
                          className={clsxm('grid grid-cols-3 py-[22px] px-5')}
                        >
                          <div>Period {j + 1}</div>
                          <div>
                            <span className='text-[#8898AA] mr-1'>Title:</span>
                            {v.title}
                          </div>
                          <div className='flex flex-row justify-end text-[#ADB3CC] gap-[10px] md:pr-10'>
                            <div className='cursor-pointer'>View</div>
                            {/* <div
                                    className='cursor-pointer'
                                    onClick={() =>
                                      router.push('/super-admin/edit-period')
                                    }
                                  >
                                    Edit
                                  </div>
                                  <div>Delete</div> */}
                          </div>
                        </div>
                      );
                    })}
                    {loading && (
                      <div className='text-center tetx-xs'>Loading..</div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
        {modal && (
          <Editweek
            onClickHandler={onClickHandler}
            periodsList={periodsList}
            periodsUpdate={periodsUpdate}
            setperiodsUpdate={setperiodsUpdate}
            settheme={settheme}
            settopic={settopic}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
