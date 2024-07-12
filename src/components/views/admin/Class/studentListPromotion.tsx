/* eslint-disable @typescript-eslint/no-explicit-any */
// import PaymentStatus from '@/components/profile/PaymentStatus';
import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage, termNumberToName } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { useGetSessionTerms } from '@/server/government/terms';
import {
  useGetInstituteClassArms,
  usePromoteStudent,
} from '@/server/institution/class';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Iprop {
  classArmId: string | null | undefined;
  closeModal?: () => void;
}

export default function StudentListPromotion({
  classArmId,
  closeModal,
}: Iprop) {
  const [selectedTerm, setSelectedTerm] = useState('');
  const sessionId: string = getFromLocalStorage('currentSessionId') ?? '';

  const { data: terms } = useGetSessionTerms({
    sessionId,
  });
  // const { data: getInstitutionStudents } = useGetStudentListScore({
  //   classArmId: classArmId as string,
  //   termId: selectedTerm,
  // });
  const { data: getInstitutionStudents } = useGetClassArmStudents({
    classArmId: classArmId,
    termId: selectedTerm,
  });
  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const institutionId: string = getFromLocalStorage('institutionId') ?? '';
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [nextClassId, setNextClassId] = useState<string>('');
  const [loading, setloading] = useState(false);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 100,
    institutionId,
    // currentSessionId,
  });
  const { mutateAsync } = usePromoteStudent();

  const {
    data: allClasses,
    isLoading,
    isError,
    refetch,
  } = useGetInstituteClassArms({ ...pagingData });

  function handleSelection(studentId: string) {
    const isExist = selected?.includes(studentId);
    if (!isExist) {
      setSelected([...selected, studentId]);
    } else {
      const selectedCopy = [...selected];
      const updatedList = selectedCopy.filter((item) => item !== studentId);
      setSelected(updatedList);
    }
  }

  useEffect(() => {
    if (selectedAll) {
      const allSelectedStudentIds: string[] = [];

      // Iterate through each student and add their ID to the array
      getInstitutionStudents?.forEach((student) => {
        allSelectedStudentIds.push(student.id as string);
      });

      // Update the `selected` state with all the selected student IDs
      setSelected(allSelectedStudentIds);
    } else {
      setSelected([]);
    }
  }, [selectedAll]);

  const payload = {
    fromClassArmId: classArmId as string,
    only: selected,
    toClassArmId: nextClassId,
  };

  async function handlePromotion() {
    if (!payload.toClassArmId) {
      toast.error('Next class is required');
      return false;
    }
    if (!payload.only) {
      toast.error('At least a student must be selected');
      return false;
    }
    setloading(true);
    try {
      const response = await mutateAsync(payload);
      if (response) {
        toast.success('Student promoted Successfully');
        window.location.reload();
        setloading(false);
      }
    } catch (error) {
      toast.error(getErrMsg(error));
      setloading(false);
    }
  }

  return (
    <div className='flex flex-col gap-[22px]'>
      <div>
        <select
          name=''
          id=''
          className='rounded-md w-full outline-none border-none focus:ring-0'
          onChange={(e) => {
            setSelectedTerm(e.target.value);
          }}
        >
          <option value=''> Term</option>
          {(terms?.data ?? []).map((v: any, i: number) => (
            <option key={i} value={v.id}>
              {termNumberToName(v.name)}
            </option>
          ))}
        </select>
        <div className='mb-4 border-b text-gray-500 front-medium'>
          Next Class:
        </div>
        <div className='w-full'>
          {allClasses && allClasses?.data.length > 0 ? (
            <select
              name='promote'
              id='promote'
              className='rounded-md w-full outline-none border-none focus:ring-0'
              onChange={(e) => {
                setNextClassId(e.target.value);
              }}
            >
              <option value=''> --Select next class --</option>
              {allClasses?.data?.map((item: any, key: number) => (
                <option value={item.id} key={key}>
                  {`${item?.class?.name ?? ''} ${item?.arm}`}
                </option>
              ))}
            </select>
          ) : (
            <div className='py-10 text-center'>No Class Arm Found</div>
          )}
        </div>
        <div className='my-4 border-b text-gray-500 front-medium'>
          Students:
        </div>
        <div className='w-full max-h-[600px] overflow-y-auto'>
          <div
            className='flex space-x-2 items-center'
            onClick={() => {
              setSelectedAll(!selectedAll);
            }}
          >
            {selectedAll ? (
              <AiFillCheckCircle
                className={clsxm('h-5 w-5 text-fun-green-500')}
              />
            ) : (
              <div className='h-5 w-5 rounded-full border-2' />
            )}
            <button>Select All</button>
          </div>
          {getInstitutionStudents
            ?.sort((a, b) => a?.firstName.localeCompare(b?.firstName))
            ?.map((student, key) => (
              <div
                className='space-x-2 items-center my-1 grid grid-cols-12'
                key={key}
                onClick={() => {
                  handleSelection(student.id);
                }}
              >
                <div className='col-span-8 flex space-x-2'>
                  {selected?.includes(student.id) ? (
                    <AiFillCheckCircle
                      className={clsxm('h-5 w-5 text-fun-green-500')}
                    />
                  ) : (
                    <div className='h-5 w-5 rounded-full border-2' />
                  )}
                  <p>{`${student.firstName} ${student.lastName}`}</p>
                </div>
                <div className='col-span-2'>{student.position}</div>
                <div className='col-span-2'>{student.total}</div>
              </div>
            ))}
        </div>

        <div className='flex justify-end  mt-8'>
          <Button
            variant='secondary'
            onClick={() => {
              handlePromotion();
            }}
          >
            {loading ? <ImSpinner /> : 'Promote Selected Students'}
          </Button>
        </div>
      </div>
    </div>
  );
}
