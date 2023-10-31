/* eslint-disable @typescript-eslint/no-explicit-any */
import AccordionAlt from '@/components/accordions/AccordionAlt';
import EmptyView from '@/components/misc/EmptyView';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteControlledModal from '@/components/modal/DeleteModalContent';
import PeriodStatusModal from '@/components/modals/period-status-modal';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import request from '@/server';
import { getErrMsg } from '@/server';
import {
  useGetAcademicSessionsTermsWeek,
  useRemoveStaffSubject,
} from '@/server/institution';
import { useState } from 'react';
import { AiFillFlag } from 'react-icons/ai';
import { BiChevronLeft } from 'react-icons/bi';
import { BsArrowDownCircle } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function SubjectList({
  studentSubjectsList,
  managedClassArm,
  teacher,
}: {
  // subjectCount?: number
  studentSubjectsList?: any[];
  managedClassArm?: any;
  teacher?: string;
}) {
  // const subjects = ['Mathematics', 'Further Mathematics', 'English', 'Civic'];
  const [itemId, setItemId] = useState('');
  const [currentView, setCurrentView] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [showcontent, setShowContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [periods, setperiods] = useState<any[]>([]);
  const [periodsList, setperiodsList] = useState<any[]>([]);
  const [weekid, setWeekId] = useState<string | number>(0);
  const [subjectId, setSubjectId] = useState<string | number>(0);
  const [classId, setClassId] = useState<string | number>(0);

  // const [periodsUpdate, setperiodsUpdate] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const removeSubject = useRemoveStaffSubject();
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';

  let currentTermInfo;

  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }
  const { data } = useGetAcademicSessionsTermsWeek(currentTermInfo?.id ?? '');
  console.log(data);

  const handleDeleteSubject = async () => {
    const response = await removeSubject.mutateAsync({
      id: itemId,
    });

    if (response) {
      toast.success('Subject un-assigned successfully');
      toggleDeleteModal();
    } else {
      toast.error('An error occured');
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
        setperiods(res.data.data.data.data);
        // setperiodsList(getOccurrences(res.data.data.data.data));
      })
      .catch((err) => {
        logger(err);
        setLoading(false);
      });
  }

  return (
    <>
      <ControlledModal
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
      />

      <div>
        {currentView === 0 && (
          <div className='bg-white border-2 rounded-md'>
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
                          // setCurrentView(1);
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
      </div>
    </>
  );
}
