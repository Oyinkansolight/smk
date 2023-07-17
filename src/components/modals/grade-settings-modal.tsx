import AccordionAlt from '@/components/accordions/AccordionAlt';
import Button from '@/components/buttons/Button';
import { useGetProfile } from '@/server/auth';
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                <Dialog.Panel className='w-full max-h-[618px] max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all'>
                  <GradeSettingsView
                    institutionType={
                      profile?.userInfo?.staff?.institution?.instituteType ?? ''
                    }
                    sessionId={profile?.currentSession?.id ?? 1}
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
}: {
  institutionType: string;
  sessionId: number;
}) {
  const { data: items, refetch } = useGetCategoryByInstitutionType({
    institutionType: 'PRIMARY',
    sessionId: 1,
    termId: 1,
  });
  useEffect(() => {
    refetch();
  }, [institutionType, refetch, sessionId]);

  const [count, setCount] = useState([2, 2, 2]);

  useEffect(() => {
    setCount(Array(items?.data.length).fill(2));
  }, [items]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='font-bold text-xl'>Grade Settings</div>
      {items?.data.map((v, i) => (
        <AccordionAlt
          key={i}
          titleClassName='bg-[#EFF7F6]'
          length={56 * count[i] + 100}
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
            {Array(count[i])
              .fill(0)
              .map((v, i) => (
                <EditableForm key={i} />
              ))}
            <div>
              <Button
                onClick={() => {
                  const n = [...count];
                  n[i] = n[i] + 1;
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
    </div>
  );
}

function EditableForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [percent, setPercent] = useState('50');
  const [category, setCategory] = useState({ label: 'Class Work' });
  return isEditing ? (
    <div className='flex gap-8 h-10'>
      <ReactSelect
        value={category}
        onChange={(v) => setCategory({ label: v?.label ?? '' })}
        options={[{ label: 'Class Work' }]}
      />
      <input
        className='rounded border'
        value={percent}
        onChange={(v) => setPercent(v.currentTarget.value)}
      />
      <div className='flex-1' />
      <Button
        className='bg-[#1A8FE3] px-5 hover:bg-[#0c5d96] disabled:bg-[#BDBEBE] text-xs py-3 active:bg-[#126eb0] justify-center'
        onClick={() => setIsEditing(false)}
      >
        Submit
      </Button>
    </div>
  ) : (
    <div className='flex gap-8 text-xs h-10 items-center'>
      <div>{category.label}</div>
      <div>{percent}%</div>
      <div className='flex-1' />
      <FiEdit3
        onClick={() => setIsEditing(true)}
        className='h-5 w-5 text-[#746D69]'
      />
    </div>
  );
}
