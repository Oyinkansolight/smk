/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { CircularCounter } from '@/components/counter';
import EditWeek from '@/components/modal/Editweek';
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
import { BsArrowDownCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface propType {
  termId: string;
  sessionId: any;
  classId: string;
}

export default function AllCurriculumView({ termId, sessionId, classId }: propType) {
  const params = useSearchParams();
  const [periods, setperiods] = useState<any[]>([]);
  const [periodsList, setperiodsList] = useState<any[]>([]);
  const [periodsUpdate, setperiodsUpdate] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
        theme: '',
        periodTitle: '',
        fileId: '',
        subjectId: id,
      });
    }

    setperiodsUpdate(periodSettings);
    return occurrences;
  }

  const handleCreateCurriculum = useCreateCurriculum();
  const handleSubmit = async () => {
    const data = {
      classId,
      weekId: weekid,
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
        `/v1/institutions/institutes/get-week-periods-by-subject?sessionId=${sessionId}&termId=${termId}&weekId=${weekId}&subjectId=${id}&classId=${classId}`,
        {
          withCredentials: true,
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
              <div key={v.id}>
                <div
                  onClick={() => {
                    setShowContent(!showcontent);
                    setCurrentIndex(i);
                    fetchPeriods(v.id);
                  }}
                  className='border-b flex items-center justify-between gap-4 py-4 cursor-pointer'
                >
                  <div className='flex space-x-2 items-center'>
                    <BsArrowDownCircle
                      className={clsxm(
                        'h-[27px] w-[27px] text-[#7F9CFF] transition-transform duration-300',
                        showcontent && currentIndex === i
                          ? 'rotate-180'
                          : 'text-[#C3CAD9]'
                      )}
                    />
                    <h2 className='text-xs font-normal'>Week {v.name}</h2>
                  </div>
                  {/* <div className='col-span-4'>
                  Theme: <span className='font-bold'>{v.theme}</span>
                </div>
                <div className='col-span-4'>
                  Topic/Sub-Theme:
                  <span className='font-bold'>{v.topic}</span>
                </div> */}
                  <div className=''>
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
                          key={v.id ?? j}
                          className={clsxm('grid grid-cols-3 py-[22px] px-5')}
                        >
                          <div>Period {j + 1}</div>
                          <div>
                            <span className='text-[#8898AA] mr-1'>
                              Topic/Sub-Theme:
                            </span>
                            {v.theme}
                          </div>
                          <div>
                            <span className='text-[#8898AA] mr-1'>Title</span>
                            {v.title}
                          </div>
                        </div>
                      );
                    })}
                    {loading && (
                      <div className='text-center tetx-xs'>Loading..</div>
                    )}
                    {periods.length === 0 && !loading && (
                      <div className='text-center tetx-xs py-4'>
                        No Period Found
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
        {modal && (
          <EditWeek
            onClickHandler={onClickHandler}
            periodsList={periodsList}
            periodsUpdate={periodsUpdate}
            setperiodsUpdate={setperiodsUpdate}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
