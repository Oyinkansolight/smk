import AccordionAlt from '@/components/accordions/AccordionAlt';
import Button from '@/components/buttons/Button';
import { activityTypes } from '@/components/views/teacher/create-class-activity-view';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import { useCreateGradeSettings } from '@/server/government/classes_and_subjects';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetCategoryByInstitutionType } from '@/server/institution/grade';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import ReactSelect from 'react-select';


export default function GradeSettingsModal({
  children,
}: {
  children: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useGetProfile();
  const { data: terms, refetch: refetchTerms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    refetchTerms();
  }, [profile, refetchTerms]);

  return (
    <>
      <div>
        <div onClick={openModal}>{children}</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[1000]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-h-[618px] max-w-2xl transform overflow-auto rounded-2xl bg-white p-6 shadow-xl transition-all'>
                  <GradeSettingsView
                    institutionType={
                      profile?.userInfo?.staff?.institution?.instituteType ?? ''
                    }
                    sessionId={profile?.currentSession?.id ?? 1}
                    subjectId={2}
                    termId={terms?.data[0].id ?? 1}
                    institutionId={382}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function GradeSettingsView({
  institutionType,
  sessionId,
  termId,
  subjectId,
  institutionId,
}: {
  institutionId: number;
  institutionType: string;
  sessionId: number;
  termId: number;
  subjectId: number;
}) {
  const { data: items, refetch } = useGetCategoryByInstitutionType({
    institutionType: 'PRIMARY',
    sessionId: 1,
    termId: 1,
  });
  useEffect(() => {
    refetch();
  }, [institutionType, refetch, sessionId]);

  const [count, setCount] = useState<
    {
      percent: string;
      category: { label: string };
    }[][]
  >([]);

  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: createSettings } = useCreateGradeSettings();

  const handleSubmit = async () => {
    for (let i = 0; i < count.length; i++) {
      const e = count[i];
      await createSettings({
        classId: 1,
        institutionId,
        subjectId,
        termId,
        sessionId,
        gradeType: items?.data[i].categoryName ?? '',
        gradeList: e.map((v) => ({
          gradeListType: v.category.label,
          percentage: v.percent,
        })),
      });
    }
  };

  useEffect(() => {
    setCount(
      Array(items?.data.length)
        .fill(0)
        .map(() => [
          {
            percent: '50',
            category: { label: 'Class Work' },
          },
        ])
    );
  }, [items]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='font-bold text-xl '>Grade Settings</div>
      {items?.data.length === count.length &&
        items?.data.map((v, i) => (
          <AccordionAlt
            key={i}
            titleClassName='bg-[#EFF7F6]'
            length={
              (isEditing ? 88 : 40) * count[i].length +
              (16 * count[i].length - 1) +
              100
            }
            title={
              <div className='flex items-center justify-between'>
                <div className='grid w-full grid-cols-2 gap-12'>
                  <div>{v.categoryName}</div>
                  <div>{v.percentageScore}%</div>
                </div>
              </div>
            }
          >
            <div className='my-4 mx-4 flex flex-col gap-4'>
              {Array(count[i].length)
                .fill(0)
                .map((v, j) => (
                  <EditableForm
                    index={j}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    value={count[i][j]}
                    setValue={(k) => {
                      const c = [...count];
                      c[i][j] = k;
                      setCount(c);
                    }}
                    removeMe={(idx) => {
                      const c = [...count];
                      c[i].splice(idx, 1);
                      setCount(c);
                    }}
                    key={j}
                  />
                ))}
              <div>
                <Button
                  onClick={() => {
                    const n = [...count];
                    n[i].push({
                      category: { label: 'Class Work' },
                      percent: '50',
                    });
                    setCount(n);
                  }}
                  variant='outline'
                  className='border-blue-500 text-blue-500 hover:bg-blue-200 active:bg-blue-800'
                >
                  Add Assessment
                </Button>
              </div>
            </div>
          </AccordionAlt>
        ))}
      <div className='flex justify-center'>
        <Button
          onClick={() => handleSubmit}
          variant='secondary'
          className='w-[260px] justify-center'
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

function EditableForm({
  index,
  removeMe,
  isEditing,
  setIsEditing,
  value,
  setValue,
}: {
  index: number;
  removeMe: (idx: number) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  value: { percent: string; category: { label: string } };
  setValue: (value: { percent: string; category: { label: string } }) => void;
}) {
  return isEditing ? (
    <div className='grid grid-cols-2 gap-8'>
      <div>
        <div className='font-semibold text-xs'>Select Percentage</div>
        <ReactSelect
          classNames={{ control: () => 'h-10' }}
          value={value.category}
          onChange={(v) =>
            setValue({ ...value, category: { label: v?.label ?? '' } })
          }
          options={activityTypes.map((v) => ({ label: v.value, value: v.key }))}
        />
      </div>
      <div>
        <div className='font-semibold text-xs'>Choose from grade list</div>
        <input
          className='rounded border w-full h-10'
          value={value.percent}
          onChange={(v) =>
            setValue({ ...value, percent: v.currentTarget.value })
          }
        />
        <div
          className={clsxm(
            'text-xs text-end my-2 hover:underline cursor-pointer',
            index === 0 ? 'text-[#CACACA]' : 'text-red-500'
          )}
          onClick={() => {
            if (index !== 0) {
              removeMe(index);
            }
          }}
        >
          Delete Assessment
        </div>
      </div>
    </div>
  ) : (
    <div className='flex gap-8 text-xs h-10 items-center'>
      <div>{value.category.label}</div>
      <div>{value.percent}%</div>
      <div className='flex-1' />
      <FiEdit3
        onClick={() => setIsEditing(true)}
        className='h-5 w-5 text-[#746D69]'
      />
    </div>
  );
}