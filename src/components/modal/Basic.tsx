/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

interface BasicModalProps {
  children: any;
  content: any;
  className?: string;
}

export default function BasicModal({
  children,
  content,
  className,
}: BasicModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <div onClick={openModal}>{children}</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={clsxm(
                    className,
                    'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                  )}
                >
                  <div className='flex relative'>
                    <IoCloseCircle
                      onClick={closeModal}
                      className='w-6 h-6 lg:w-10 lg:h-10 absolute right-0'
                    />

                    <span className='mt-16 w-full'>{content}</span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
