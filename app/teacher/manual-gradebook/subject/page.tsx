'use client';

import BackButton from '@/components/accordions/BackButton';
import Button from '@/components/buttons/Button';
import GenericLoader from '@/components/layout/Loader';
import EmptyView from '@/components/misc/EmptyView';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  CreateGradeSettingsParams,
  useCreateResultFromGradeBook,
  useCreateSubjectGradeBook,
  useEditSubjectGradeBook,
  useGetSubjectScoreSheet,
} from '@/server/government/classes_and_subjects';
import { useGetSessionTerms } from '@/server/government/terms';
import { Institution } from '@/types/institute';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useSessionStorage } from 'usehooks-ts';

export default function Page() {
  const [idx, setIdx] = useState(1);
  const [ca1_score, setCa1_Score] = useState(0);
  const [ca2_score, setCa2_Score] = useState(0);
  const [exams_score, setExam] = useState(0);
  const [loading, setloading] = useState(false);
  const [isLoadingCreateGradebook, setIsLoadingCreateGradebook] =
    useState(false);
  const [isLoadingGenerateResult, setIsLoadingGenerateResult] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const params = useSearchParams();
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();
  const { data: terms, isLoading: isLoadingTerms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const term = terms?.data[0]?.id;
  const router = useRouter();

  const [institution] = useSessionStorage('institution', {} as Institution);
  const handleCreateGradebook = useCreateSubjectGradeBook();
  const handleCreateResultFromGradebook = useCreateResultFromGradeBook();
  const handleEditGradebook = useEditSubjectGradeBook();

  // const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
  //   teacherId: profile?.userInfo?.staff?.id,
  //   sessionId: profile?.currentSession?.[0]?.id,
  // });
  //TODO: edit data pre-fill
  //TODO: input max | min set rule

  const genericPayload: CreateGradeSettingsParams = {
    subjectId: params?.get('id') as string,
    classArmId: params?.get('classArmId') as string,
    institutionId: institution?.id,
    sessionId: profile?.currentSession?.[0]?.id,
    termId: term as unknown as string,
    limit: 100,
  };

  const { data: StudentScoreSheet, isLoading: isScoreSheetLoading } =
    useGetSubjectScoreSheet(genericPayload);
  // console.log('StudentScoreSheet', StudentScoreSheet);

  if (isLoadingProfile && isLoadingTerms) {
    return (
      <div className='flex flex-col w-full h-full'>
        <GenericLoader />
      </div>
    );
  }

  const handleGenerateGradeBook = async () => {
    delete genericPayload.limit;

    try {
      setIsLoadingCreateGradebook(true);
      const response = await handleCreateGradebook.mutateAsync(genericPayload);

      if (response) {
        toast.success('Gradebook generated successfully');

        setIsLoadingCreateGradebook(false);
      }
    } catch (error) {
      setIsLoadingCreateGradebook(false);
      toast.error(getErrMsg(error));
    }
  };
  const handleGenerateResult = async () => {
    delete genericPayload.limit;
    // delete genericPayload.institutionId;

    try {
      setIsLoadingGenerateResult(true);
      const response = await handleCreateResultFromGradebook.mutateAsync(
        genericPayload
      );

      if (response) {
        toast.success('Result released successfully');

        setIsLoadingGenerateResult(false);
      }
    } catch (error) {
      setIsLoadingGenerateResult(false);
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
        setIsModify(false);

        setloading(false);
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  return (
    <div className='h-full layout'>
      <BackButton />
      <div className='text-gray-600 py-8 text-xl'>
        Grade Book {'>'} {params?.get('subjectName')} -{' '}
        {params?.get('classArmName')}
      </div>
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl'>{params?.get('subjectName')}</h2>
        <div className='flex space-x-1'>
          {StudentScoreSheet && StudentScoreSheet.length > 0 && (
            <Button
              onClickHandler={() => {
                handleGenerateResult();
              }}
              variant='secondary'
              className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
            >
              {isLoadingGenerateResult ? (
                <ImSpinner2 className='animate-spin' />
              ) : (
                'Generate Result'
              )}
            </Button>
          )}

          {StudentScoreSheet && StudentScoreSheet.length === 0 && (
            <Button
              onClickHandler={() => {
                handleGenerateGradeBook();
              }}
              variant='secondary'
              className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
            >
              {isLoadingCreateGradebook ? (
                <ImSpinner2 className='animate-spin' />
              ) : (
                'Generate Score Sheet'
              )}
            </Button>
          )}
        </div>
      </div>
      {/* <TextTabBar
        tabs={[
          ...(arms ?? []).map((arm) =>
            arm.arm ? `${arm.class?.name} ${arm.arm}` : '[NULL]'
          ),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      /> */}

      {isScoreSheetLoading ? (
        <div className='text-center'>Loading...</div>
      ) : StudentScoreSheet && StudentScoreSheet.length ? (
        <div className='bg-white min-h-screen px-10 mt-3'>
          <div className='grid grid-cols-11 py-8 text-[#746D69] text-base'>
            <div />
            <div className='col-span-3 px-4'>Student</div>
            <div>CA1</div>
            <div>CA2</div>
            <div>Exam</div>
            <div>Total</div>
            <div>Grade</div>
            <div>Position</div>
          </div>
          <div className='flex flex-col gap-4'>
            {StudentScoreSheet &&
              StudentScoreSheet.sort((a, b) =>
                a?.student?.lastName.localeCompare(b?.student?.lastName)
              ).map((student, i) => (
                <StudentGradeListItem
                  key={student?.id ?? i}
                  id={i + 1}
                  item={student}
                  isModify={isModify}
                  setCa1_Score={setCa1_Score}
                  setCa2_Score={setCa2_Score}
                  setExam={setExam}
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
  item,
  isModify,
  setCa1_Score,
  setCa2_Score,
  setExam,
  handleGradeBookEdit,
  loading,
  setIsModify,
}: {
  id: number;
  item: any;
  isModify: boolean;
  setIsModify: (v: boolean) => void;
  setCa1_Score: (v: number) => void;
  setCa2_Score: (v: number) => void;
  setExam: (v: number) => void;
  handleGradeBookEdit: (v: string) => void;
  loading: boolean;
}) {
  const [lineToModify, setLineToModify] = useState<number | null>();
  return (
    <div>
      <div className=' space-x-1 grid text-black grid-cols-11 items-center text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
          <div>{item?.student?.lastName + ' ' + item?.student?.firstName}</div>
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
          <div>{item?.ca1_score ?? 0}</div>
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
          <div>{item?.ca2_score ?? 0}</div>
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
          <div>{item?.exams_score ?? 0}</div>
        )}
        <div>{item?.total ?? 0}</div>
        <div>{item?.grade ?? 'N/A'}</div>
        <div>{item?.position ?? 'N/A'}</div>

        <div className='flex items-center space-x-2'>
          <div>
            {!isModify ? (
              <Button
                onClickHandler={() => {
                  setIsModify(true);
                  setLineToModify(id);
                  console.log(id);
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
                    handleGradeBookEdit(item.id);
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
        </div>

        {/*  <div className='text-black flex items-center'>
          <div>{ordinal(id)}</div>
          <BsArrowUp className='h-5 w-5 text-green-500' />
        </div> */}
      </div>
    </div>
  );
}
