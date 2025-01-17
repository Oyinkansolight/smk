/* eslint-disable @typescript-eslint/no-explicit-any */
import clsxm from '@/lib/clsxm';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

interface BasicModalProps {
  content: any;
  isOpen: boolean;
  toggleModal: () => void;
  className?: string;
  closeIcon?: boolean;
  showModal?: boolean;
}

export default function ControlledModal({
  isOpen,
  content,
  className,
  closeIcon = true,
  toggleModal,
  showModal = true,
}: BasicModalProps) {
  if (!showModal) return <></>;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[999]' onClose={toggleModal}>
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
                  {closeIcon && (
                    <IoCloseCircle
                      onClick={toggleModal}
                      className='w-6 h-6 lg:w-10 lg:h-10 absolute right-0'
                    />
                  )}

                  <span className='mt-16 w-full'>{content}</span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
