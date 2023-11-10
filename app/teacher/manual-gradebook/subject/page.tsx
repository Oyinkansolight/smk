'use client';

import Button from '@/components/buttons/Button';
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useCreateSubjectGradeBook,
  useEditSubjectGradeBook,
  useGetSubjectGradeList,
} from '@/server/government/classes_and_subjects';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { ClassArmStudents, Institution } from '@/types/institute';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useSessionStorage } from 'usehooks-ts';

export default function Page() {
  const [idx, setIdx] = useState(1);
  const [ca1_score, setCa1_Score] = useState(0);
  const [ca2_score, setCa2_Score] = useState(0);
  const [exams_score, setExam] = useState(0);
  const [loading, setloading] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const params = useSearchParams();
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();
  const { data: terms, isLoading: isLoadingTerms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;

  const [institution] = useSessionStorage('institution', {} as Institution);
  const handleCreateGradebook = useCreateSubjectGradeBook();
  const handleEditGradebook = useEditSubjectGradeBook();

  // const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
  //   teacherId: profile?.userInfo?.staff?.id,
  //   sessionId: profile?.currentSession?.[0]?.id,
  // });
  //TODO: edit data pre-fill
  //TODO: input max | min set rule

  const studentGrades: any[] = [];
  const { data: allStudents, isLoading: isLoadingStudent } =
    useGetClassArmStudents({
      classArmId: profile?.userInfo?.staff?.managedClassArm?.id,
    });

  const {
    data: gradeList,
    refetch,
    isLoading,
  } = useGetSubjectGradeList({
    subjectId: params?.get('id') as string,
  });

  if (allStudents && gradeList) {
    allStudents.map((v) => {
      const grade = gradeList.find((item) => item.student.id === v.id);
      studentGrades.push({ ...v, grade });
    });
  }

  useEffect(() => {
    refetch();
  }, [idx, refetch]);

  if (isLoadingProfile && isLoadingTerms) {
    return (
      <div className='flex flex-col w-full h-full'>
        <GenericLoader />
      </div>
    );
  }

  const handleGradeBookLog = async (studentId: string) => {
    const payload = {
      subjectId: params?.get('id') as string,
      classArmId: params?.get('classArmId') as string,
      institutionId: institution?.id,
      sessionId: profile?.currentSession?.[0]?.id,
      termId: term as unknown as string,
      studentId,
      ca1_score: Number(ca1_score),
      ca2_score: Number(ca2_score),
      exams_score: Number(exams_score),
    };

    try {
      setloading(true);
      const response = await handleCreateGradebook.mutateAsync(payload);

      if (response) {
        toast.success('Gradebook stored successfully');
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };
  const handleGradeBookEdit = async (gradeBookId: string) => {
    const payload = {
      id: gradeBookId,
      ca1_score: Number(ca1_score),
      ca2_score: Number(ca2_score),
      exams_score: Number(exams_score),
    };

    try {
      setloading(true);
      const response = await handleEditGradebook.mutateAsync(payload);

      if (response) {
        toast.success('Gradebook updated successfully');
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] py-8 text-xl'>
        Grade Book {'>'} {params?.get('subjectName')}
      </div>
      <div className='font-bold text-2xl'>{params?.get('subjectName')}</div>
      {/* <TextTabBar
        tabs={[
          ...(arms ?? []).map((arm) =>
            arm.arm ? `${arm.class?.name} ${arm.arm}` : '[NULL]'
          ),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      /> */}

      {isLoadingStudent ? (
        <div className='text-center'>Loading...</div>
      ) : allStudents && allStudents.length ? (
        <div className='bg-white min-h-screen px-10 mt-3'>
          <div className='grid grid-cols-10 py-8 text-[#746D69] text-base'>
            <div />
            <div className='col-span-3 px-4'>Student</div>
            <div>CA1</div>
            <div>CA2</div>
            <div>Exam</div>
            <div>Total</div>
            {/*   <div>Attendance</div>
              <div>Standing</div> */}
          </div>
          <div className='flex flex-col gap-4'>
            {allStudents &&
              studentGrades.map((student, i) => (
                <StudentGradeListItem
                  key={student?.id ?? i}
                  id={i + 1}
                  student={student}
                  isModify={isModify}
                  setCa1_Score={setCa1_Score}
                  setCa2_Score={setCa2_Score}
                  setExam={setExam}
                  handleGradeBookLog={handleGradeBookLog}
                  handleGradeBookEdit={handleGradeBookEdit}
                  loading={loading}
                  setIsModify={setIsModify}
                />
              ))}
          </div>
        </div>
      ) : (
        <EmptyView label='No Grade List' useStandardHeight />
      )}
    </div>
  );
}

function StudentGradeListItem({
  id,
  student,
  isModify,
  setCa1_Score,
  setCa2_Score,
  setExam,
  handleGradeBookLog,
  handleGradeBookEdit,
  loading,
  setIsModify,
}: {
  id: number;
  student: ClassArmStudents;
  isModify: boolean;
  setIsModify: (v: boolean) => void;
  setCa1_Score: (v: number) => void;
  setCa2_Score: (v: number) => void;
  setExam: (v: number) => void;
  handleGradeBookLog: (v: string) => void;
  handleGradeBookEdit: (v: string) => void;
  loading: boolean;
}) {
  const [lineToModify, setLineToModify] = useState<number | null>();
  return (
    <div>
      <div className=' space-x-1 grid text-black grid-cols-10 items-center text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
          <div>{student.lastName + ' ' + student.firstName}</div>
        </div>
        {isModify && lineToModify === id ? (
          <div className=''>
            <input
              type='number'
              className='rounded-lg w-full outline-none bg-transparent'
              onChange={(e) => {
                setCa1_Score(e.target.value as unknown as number);
              }}
            />
          </div>
        ) : (
          <div>{student?.grade?.ca1_score ?? 0}</div>
        )}
        {isModify && lineToModify === id ? (
          <div>
            <input
              type='number'
              className='rounded-lg w-full outline-none bg-transparent'
              onChange={(e) => {
                setCa2_Score(e.target.value as unknown as number);
              }}
            />
          </div>
        ) : (
          <div>{student?.grade?.ca2_score ?? 0}</div>
        )}
        {isModify && lineToModify === id ? (
          <div className=''>
            <input
              type='number'
              className='rounded-lg w-full outline-none bg-transparent'
              onChange={(e) => {
                setExam(e.target.value as unknown as number);
              }}
            />
          </div>
        ) : (
          <div>{student?.grade?.exams_score ?? 0}</div>
        )}
        <div>{student?.grade?.total ?? 0}</div>

        <div className='flex items-center space-x-2'>
          {student?.grade ? (
            <div>
              {!isModify ? (
                <Button
                  onClickHandler={() => {
                    setIsModify(true);
                    setLineToModify(id);
                  }}
                  variant='secondary'
                  className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                >
                  {loading ? <ImSpinner2 className='animate-spin' /> : 'Modify'}
                </Button>
              ) : (
                <div className='flex space-x-1'>
                  <Button
                    onClickHandler={() => {
                      handleGradeBookEdit(student.grade.id);
                    }}
                    variant='secondary'
                    className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                  >
                    {loading && lineToModify ? (
                      <ImSpinner2 className='animate-spin' />
                    ) : (
                      'Save'
                    )}
                  </Button>
                  {lineToModify === id && (
                    <Button
                      onClickHandler={() => {
                        setLineToModify(null);
                        setIsModify(false);
                      }}
                      variant='secondary'
                      className='flex justify-center h-[46px] bg-[#e3241a] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {!isModify ? (
                <Button
                  onClickHandler={() => {
                    setIsModify(true);
                    setLineToModify(id);
                  }}
                  variant='secondary'
                  className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                >
                  {loading ? <ImSpinner2 className='animate-spin' /> : 'Create'}
                </Button>
              ) : (
                <div className='flex space-x-1'>
                  <Button
                    onClickHandler={() => {
                      handleGradeBookLog(student.id);
                    }}
                    variant='secondary'
                    className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                  >
                    {loading && lineToModify ? (
                      <ImSpinner2 className='animate-spin' />
                    ) : (
                      'Save'
                    )}
                  </Button>
                  {lineToModify === id && (
                    <Button
                      onClickHandler={() => {
                        setLineToModify(null);
                        setIsModify(false);
                      }}
                      variant='secondary'
                      className='flex justify-center h-[46px] bg-[#e3241a] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/*  <div className='text-black flex items-center'>
          <div>{ordinal(id)}</div>
          <BsArrowUp className='h-5 w-5 text-green-500' />
        </div> */}
      </div>
    </div>
  );
}
