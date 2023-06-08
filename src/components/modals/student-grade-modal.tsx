import Button from '@/components/buttons/Button';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function StudentGradeModal({
  children,
}: {
  children: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);

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
                  <StudentGradeView />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function StudentGradeView() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-6 items-center font-bold'>
        <div className='h-12 w-12 rounded-full bg-gray-200' />
        <div>Ighosa Ahmed</div>
      </div>
      <div className='rounded-lg p-5 bg-[#EFF7F6] text-[#746D69] font-bold text-lg'>
        <div>Class: Primary 1</div>
        <div className='flex justify-between'>
          <div>Subject: Mathematics</div>
          <div>Average Score: 80%</div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='CA 1 Score' />
        <Input label='CA 1 Score' />
        <Input label='CA 1 Score' />
        <Input label='CA 1 Score' />
      </div>
      <div className='flex justify-center'>
        <Button className='min-w-[15rem] justify-center' variant='secondary'>
          <div>Submit</div>
        </Button>
      </div>
    </div>
  );
}

function Input({ label }: { label: string }) {
  return (
    <div>
      <label className='text-xs font-bold' htmlFor={label}>
        {label}
      </label>
      <input id={label} className='border h-10 rounded-lg w-full' />
    </div>
  );
}
