/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import {
  getFromLocalStorage,
  getFromSessionStorage,
  timeTablePeriodSorter,
} from '@/lib/helper';
import logger from '@/lib/logger';
import request from '@/server';
import {
  useGetAcademicSessionsTermsWeek,
  useRemoveStaffSubject,
} from '@/server/institution';
import { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { BsArrowDownCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function SubjectList({
  studentSubjectsList,
  managedClassArm,
  teacher,
  classId,
}: {
  // subjectCount?: number
  studentSubjectsList?: any[];
  managedClassArm?: any;
  teacher?: string;
  classId?: string;
}) {
  const [itemId, setItemId] = useState('');
  const [currentView, setCurrentView] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [periods, setPeriods] = useState<any[]>([]);
  const [, setWeekId] = useState<string | number>(0);
  const [subjectId, setSubjectId] = useState<string | number>(0);

  const [loading, setLoading] = useState(false);
  const removeSubject = useRemoveStaffSubject();
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';

  let currentTermInfo;

  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }
  const { data } = useGetAcademicSessionsTermsWeek(currentTermInfo?.id ?? '');

  const handleDeleteSubject = async () => {
    const response = await removeSubject.mutateAsync({
      id: itemId,
    });

    if (response) {
      toast.success('Subject un-assigned successfully');
      toggleDeleteModal();
    } else {
      toast.error('An error occurred');
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  function fetchPeriods(weekId: string | number) {
    setWeekId(weekId);
    setLoading(true);

    request
      .get(
        `/v1/institutions/institutes/get-week-periods-by-subject?sessionId=${currentSessionId}&termId=${currentTermInfo?.id}&weekId=${weekId}&subjectId=${subjectId}&classId=${classId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(false);
        setPeriods(res.data.data.data.data);
        // setperiodsList(getOccurrences(res.data.data.data.data));
      })
      .catch((err) => {
        logger(err);
        setLoading(false);
      });
  }

  return (
    <>
      {/* <ControlledModal
        isOpen={showDeleteModal}
        toggleModal={toggleDeleteModal}
        content={
          <DeleteControlledModal
            title={`Un-assign ${subjectName}`}
            body={`Are you sure you want to un-assign ${subjectName} from ${teacher}?`}
            toggleModal={toggleDeleteModal}
            handleDelete={handleDeleteSubject}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      /> */}

      <div className='!w-full'>
        {currentView === 0 && (
          <div className='bg-white border-2  rounded-md'>
            <div className='mx-8 font-bold text-2xl text-[#6B7A99] my-4 border-b'>
              Subjects
            </div>

            <div className='p-8'>
              <div className='flex flex-wrap gap-4 px-4 pb-4'>
                {studentSubjectsList &&
                  studentSubjectsList.length > 0 &&
                  studentSubjectsList.map((v, i) => (
                    <div
                      key={v?.id ?? i}
                      className='border flex flex-col items-center justify-center gap-5 rounded-md w-full aspect-square min-w-[200px] lg:max-w-[200px] max-h-[200px] relative group'
                    >
                      <div className='flex items-center justify-center h-28 w-28 font-black rounded-full border border-[#DADEE6] bg-[#E2EEFF33] text-[#DADEE6] text-5xl'>
                        <div>{v?.name?.substring(0, 1)}</div>
                      </div>
                      <div
                        className='font-medium text-center text-sm cursor-pointer'
                        onClick={() => {
                          setCurrentView(1);
                          setSubjectId(v?.id);
                          // setClassId(v?.subject?.class?.class?.id);
                          setSubjectName(v?.name);
                        }}
                      >
                        {v ? `${v?.name} ` : 'Subject Name'}
                      </div>
                    </div>
                  ))}
              </div>

              {!studentSubjectsList ||
                (studentSubjectsList.length === 0 && (
                  <EmptyView
                    label='No subject has been assigned to this user'
                    useStandardHeight
                  />
                ))}
            </div>
          </div>
        )}
        {currentView === 1 && (
          <div className='bg-white border-2 rounded-md !w-full'>
            <div className='flex justify-start px-8'>
              <div
                onClick={() => setCurrentView(0)}
                className='flex items-center py-1 px-3 cursor-pointer rounded-md text-sm bg-[#EDEFF2] gap-2 my-5'
              >
                <BiChevronLeft className='text-[#E5A500] h-8 w-8' />
                <span>Go Back</span>
              </div>
            </div>
            <div className='p-8 w-full'>
              <div className='h-12' />
              <div className='flex gap-4 flex-col'>
                <div className='flex flex-col space-y-6'>
                  {(data?.data || []).map((v: any, i: number) => {
                    return (
                      <div key={v.id}>
                        <div
                          onClick={() => {
                            setShowContent(!showContent);
                            setCurrentIndex(i);
                            fetchPeriods(v.id);
                          }}
                          className='border-b flex items-center justify-between gap-4 py-4 cursor-pointer'
                        >
                          <div className='flex space-x-2 items-center'>
                            <BsArrowDownCircle
                              className={clsxm(
                                'h-[27px] w-[27px] text-[#7F9CFF] transition-transform duration-300',
                                showContent && currentIndex === i
                                  ? 'rotate-180'
                                  : 'text-[#C3CAD9]'
                              )}
                            />
                            <h2 className='text-xs font-normal'>
                              Week {v.name}
                            </h2>
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
                              className='border border-primary text-primary text-sm p-2 rounded-sm'
                              onClick={() => {
                                fetchPeriods(v.id);
                              }}
                            >
                              View Curriculum
                            </button>
                          </div>
                        </div>
                        {showContent && currentIndex === i && (
                          <div className='w-full border duration-200 transition-all flex flex-col divide-y-2 !text-xs mt-[33px]'>
                            {timeTablePeriodSorter(periods)?.map(
                              (v: any, j: number) => {
                                return (
                                  <div
                                    key={v.id ?? j}
                                    className={clsxm(
                                      'grid grid-cols-3 py-[22px] px-5'
                                    )}
                                  >
                                    <div>Period {j + 1}</div>
                                    <div>
                                      <span className='text-[#8898AA] mr-1'>
                                        Theme:
                                      </span>
                                      {v.theme}
                                    </div>
                                    <div>
                                      <span className='text-[#8898AA] mr-1'>
                                        Topic
                                      </span>
                                      {v.title}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                            {loading && (
                              <div className='text-center tetx-xs'>
                                Loading..
                              </div>
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
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
