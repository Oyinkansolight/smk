import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import Index from '@/components/stepper';
import { getErrMsg } from '@/server';
import {
  CreateRubricParams,
  useCreateRubric,
} from '@/server/institution/grade';
import { useCallback, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';



export default function ManageGradeRubric() {
  const [rubrics, setRubrics] = useState<CreateRubricParams['rubrics']>([
    { label: '', maxRange: 0, minRange: 0, remark: '' },
    { label: '', maxRange: 0, minRange: 0, remark: '' },
    { label: '', maxRange: 0, minRange: 0, remark: '' },
    { label: '', maxRange: 0, minRange: 0, remark: '' },
  ]);
  const [currentStage, setCurrentStage] = useState(0);
  const { mutateAsync: createRubric, isLoading } = useCreateRubric();
  const handleCreateRubric = useCallback(async () => {
    try {
      const response = await createRubric({
        institutionType: 'PRIMARY',
        rubrics: rubrics,
        sessionId: '1',
        termId: '1',
      });
      toast.success(response.data.data.message ?? 'Success');
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  }, [rubrics, createRubric]);
  return (
    <div>
      <div className='text-center'>
        <div className='text-2xl font-bold'>Manage Grade Rubric</div>
        <div>Kindly select the appropriate options below:</div>
        <div className='bg-[#F4F9FF] flex flex-col items-center py-4 mb-5'>
          <Index
            variant='#008146'
            section=''
            data={[
              { stage: 1, stageName: 'Add Rubric Label' },
              { stage: 2, stageName: 'Select Rubric Range' },
            ]}
            currentStage={currentStage + 1}
          />
          <div>
            <span className='font-bold'>Note:</span> Once a Rubric label is
            changed, you would have to choose the range again.
          </div>
        </div>
      </div>
      {currentStage === 0 && (
        <div>
          {rubrics.map((v: unknown, i: number) => (
            <div key={i}>
              <div className='flex items-end gap-3'>
                <Input
                  label='Category Name'
                  placeholder=''
                  containerClassName='w-full'
                  inputClassName='max-h-[10px]'
                  formValue={rubrics[i].remark}
                  setFormValue={(v) => {
                    const n = [...rubrics];
                    n[i].remark = v as string;
                    setRubrics(n);
                  }}
                />
                <Input
                  label='Enter percentage score'
                  placeholder=''
                  containerClassName='w-full'
                  inputClassName='max-h-[10px]'
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
                  { label: '', maxRange: 0, minRange: 0, remark: '' },
                ])
              }
            >
              Add New Rubric Label
            </Button>
          </div>
        </div>
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
                    options={[
                      { label: 'A', value: 'A' },
                      { label: 'B', value: 'B' },
                      { label: 'C', value: 'C' },
                      { label: 'D', value: 'D' },
                      { label: 'E', value: 'E' },
                      { label: 'F', value: 'F' },
                    ]}
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