/* eslint-disable no-console */
import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import Index from '@/components/stepper';
import { INSTITUTION_TYPES } from '@/constant/institution';
import { getErrMsg } from '@/server';
import { useGetCurrentSessionTerm } from '@/server/government/terms';
import {
  CreateRubricParams,
  useCreateRubric,
  useGetGradeRubricByInstitutionType,
} from '@/server/institution/grade';
import { Session } from '@/types/classes-and-subjects';
import { GradeRubricInterface } from '@/types/institute';
import { useCallback, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import ReactSelect from 'react-select';
import Select from 'react-select';
import { toast } from 'react-toastify';
import GenericLoader from '@/components/layout/Loader';

interface ManageGradeRubricProps {
  closeModal?: () => void;
  allSessions?: Session[];
};

const initialRubric = [
  { label: '', maxRange: 0, minRange: 0, remark: '' },
  { label: '', maxRange: 0, minRange: 0, remark: '' },
  { label: '', maxRange: 0, minRange: 0, remark: '' },
  { label: '', maxRange: 0, minRange: 0, remark: '' },
];

export default function ManageGradeRubric({ closeModal, allSessions }: ManageGradeRubricProps) {
  const [loading, setLoading] = useState(false);
  const [currentInstitution, setCurrentInstitution] = useState(INSTITUTION_TYPES.SECONDARY);
  const currentSessionId = allSessions?.find((v) => v.isCurrent && v.institutionType === currentInstitution)?.id;
  const { data: term } = useGetCurrentSessionTerm({
    sessionId: currentSessionId,
  });

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const params = {
    institutionType: currentInstitution,
    sessionId: currentSessionId,
    termId: term?.id,
  }
  const { data, refetch, isError, isLoading: isLoadingRubric } = useGetGradeRubricByInstitutionType(params);

  // const reversedData: GradeRubricInterface[] = [];


  const [rubrics, setRubrics] = useState<GradeRubricInterface[] |
    (CreateRubricParams['rubrics'][number] & { label: string })[]
  >(data && data.length > 0 ? data : initialRubric);
  const [currentStage, setCurrentStage] = useState(0);
  const { mutateAsync: createRubric, isLoading } = useCreateRubric();

  const handleCreateRubric = useCallback(async () => {
    try {
      const response = await createRubric({
        institutionType: currentInstitution,
        rubrics: rubrics,
        sessionId: currentSessionId,
        termId: term?.id,
      });
      toast.success(response.data.data.message ?? 'Success');
      closeModal && closeModal();
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  }, [
    createRubric,
    currentInstitution,
    rubrics,
    currentSessionId,
    term?.id,
    closeModal,
  ]);

  const allInstitutions = [
    { value: INSTITUTION_TYPES.ECCDE, label: INSTITUTION_TYPES.ECCDE },
    { value: INSTITUTION_TYPES.PRIMARY, label: INSTITUTION_TYPES.PRIMARY },
    { value: INSTITUTION_TYPES.SECONDARY, label: INSTITUTION_TYPES.SECONDARY },
    { value: INSTITUTION_TYPES.TERTIARY, label: INSTITUTION_TYPES.TERTIARY },
  ];

  const handleInstitutionChange = async (value: { value: string; label: string }) => {
    toggleLoading();
    setCurrentInstitution(value.value);
    setRubrics(initialRubric);
    // reversedData = [];
    refetch();

    setTimeout(() => {
      console.log(isLoadingRubric);
      console.log(isError);



      if (!isLoadingRubric || !isError) {
        console.log(data);
        console.log(isError);


        if (data && data?.length > 0) {
          setRubrics(data);
        }

        toggleLoading();
      }
    }, 2000);

  };

  return (
    <div>
      <div className='text-center'>
        <div className='text-2xl font-bold'>Manage Grade Rubric</div>
        <div>Kindly select the appropriate options below:</div>
        <div className='bg-[#F4F9FF] flex flex-col items-center py-4 mb-5'>
          <div className='max-w-min'>
            <Index
              variant='#008146'
              section=''
              data={[
                { stage: 1, stageName: 'Add Rubric Label' },
                { stage: 2, stageName: 'Select Rubric Range' },
              ]}
              currentStage={currentStage + 1}
            />
          </div>
          <div>
            <span className='font-bold'>Note:</span> Once a Rubric label is
            changed, you would have to choose the range again.
          </div>
        </div>
      </div>

      {currentStage === 0 &&
        <div className='flex flex-row items-center gap-2 mb-6'>
          <div>Institution type:</div>
          <Select
            name="institution"
            className='text-primary'
            options={allInstitutions}
            onChange={(value) => handleInstitutionChange(value as { value: string; label: string })}
            //Defaults to secondary institution
            defaultValue={allInstitutions[2]}
          />
        </div>
      }

      {currentStage === 0 && !loading ? (
        <div>
          {rubrics.map((v: unknown, i: number) => (
            <div key={i}>
              <div className='flex items-end gap-3'>
                <Input
                  label='Rubric Label'
                  placeholder='eg. A'
                  containerClassName='w-full'
                  inputClassName='max-h-[10px]'
                  formValue={rubrics[i].label}
                  setFormValue={(v) => {
                    const n = [...rubrics];
                    n[i].label = v as string;
                    setRubrics(n);
                  }}
                />
                <Input
                  label='Remark'
                  placeholder='Enter Details'
                  containerClassName='w-full'
                  inputClassName='max-h-[10px]'
                  formValue={rubrics[i].remark}
                  setFormValue={(v) => {
                    const n = [...rubrics];
                    n[i].remark = v as string;
                    setRubrics(n);
                  }}
                />
                <div
                  onClick={() => setRubrics(Array(rubrics.length - 1).fill(0))}
                  className='bg-[#FFF8F8] cursor-pointer text-red-500 p-4 rounded-full'
                >
                  <BsTrashFill />
                </div>
              </div>
              <div className='h-px my-4 bg-gray-100' />
            </div>
          ))}
          <div className='flex justify-start'>
            <Button
              onClick={() =>
                setRubrics([
                  ...rubrics,
                  {
                    label: '',
                    maxRange: 0,
                    minRange: 0,
                    remark: '',
                  },
                ])
              }
            >
              Add New Rubric Label
            </Button>
          </div>
        </div>
      ) : loading && (
        <GenericLoader />
      )}

      {currentStage === 1 && (
        <div>
          {rubrics.map((v: unknown, i: number) => (
            <div key={i}>
              <div className='grid grid-cols-4 gap-3'>
                <div className='flex-1 col-span-2'>
                  <div className='font-bold text-xs my-1'>
                    Select Rubric Label
                  </div>
                  <ReactSelect
                    value={{ value: rubrics[i].label, label: rubrics[i].label }}
                    options={rubrics
                      .map((v) => ({
                        value: v.label,
                        label: v.label,
                      }))
                      .filter((v) => v.label !== '')}
                    onChange={(value) => {
                      const n = [...rubrics];
                      n[i].label = value?.value ?? '';
                      setRubrics(n);
                    }}
                    placeholder='Select Rubric Label'
                  />
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-xs my-1'>
                    Minimum Percentage
                  </div>
                  <ReactSelect
                    value={{
                      value: rubrics[i].minRange,
                      label: rubrics[i].minRange,
                    }}
                    options={Array(10)
                      .fill(0)
                      .map((v, i) => ({
                        label: i * 10,
                        value: i * 10,
                      }))}
                    onChange={(value) => {
                      const n = [...rubrics];
                      n[i].minRange = value?.value ?? 0;
                      setRubrics(n);
                    }}
                  />
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-xs my-1'>
                    Maximum Percentage
                  </div>
                  <ReactSelect
                    options={Array(10)
                      .fill(0)
                      .map((v, i) => ({
                        label: (i + 1) * 10,
                        value: (i + 1) * 10,
                      }))}
                    onChange={(value) => {
                      const n = [...rubrics];
                      n[i].maxRange = value?.value ?? 0;
                      setRubrics(n);
                    }}
                  />
                </div>
              </div>
              <div className='h-px my-4 bg-gray-100' />
            </div>
          ))}
        </div>
      )}

      <div className='h-24' />

      <div className='flex justify-end gap-4'>
        <Button
          variant='outline'
          disabled={currentStage === 0}
          onClick={() => setCurrentStage(currentStage - 1)}
        >
          Prev
        </Button>
        <Button
          onClick={() =>
            currentStage === 0
              ? setCurrentStage(currentStage + 1)
              : handleCreateRubric()
          }
          disabled={isLoading}
        >
          {currentStage === 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
