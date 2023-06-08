import AccordionAlt from '@/components/accordions/AccordionAlt';
import Button from '@/components/buttons/Button';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

export default function GradeSettingsModal({
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
                  <GradeSettingsView />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function GradeSettingsView() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='font-bold text-xl'>Grade Settings</div>
      <AccordionAlt
        titleClassName='bg-[#EFF7F6]'
        length={100}
        title={
          <div className='flex items-center justify-between'>
            <div className='flex gap-10'>
              <div>Continuous Assessment(CA) 2</div>
              <div>15%</div>
            </div>
            <Button
              variant='outline'
              className='border-blue-500 text-xs text-blue-500 hover:bg-blue-100 bg-white'
            >
              Add Assessment
            </Button>
          </div>
        }
      >
        <div className='my-4 mx-4 flex flex-col gap-4'>
          {Array(2)
            .fill(0)
            .map((v, i) => (
              <div key={i} className='flex gap-12 text-xs'>
                <div>Class Work</div>
                <div>50%</div>
                <div className='flex-1' />
                <FiEdit3 className='h-5 w-5 text-[#746D69]' />
              </div>
            ))}
        </div>
      </AccordionAlt>
      <AccordionAlt
        titleClassName='bg-[#EFF7F6]'
        length={100}
        title={
          <div className='flex items-center justify-between'>
            <div className='flex gap-10'>
              <div>Continuous Assessment(CA) 2</div>
              <div>15%</div>
            </div>
            <Button
              variant='outline'
              className='border-blue-500 text-xs text-blue-500 hover:bg-blue-100 bg-white'
            >
              Add Assessment
            </Button>
          </div>
        }
      >
        <div className='my-4 mx-4 flex flex-col gap-4'>
          {Array(2)
            .fill(0)
            .map((v, i) => (
              <div key={i} className='flex gap-12 text-xs'>
                <div>Class Work</div>
                <div>50%</div>
                <div className='flex-1' />
                <FiEdit3 className='h-5 w-5 text-[#746D69]' />
              </div>
            ))}
        </div>
      </AccordionAlt>
      <AccordionAlt
        titleClassName='bg-[#EFF7F6]'
        length={100}
        title={
          <div className='flex items-center justify-between'>
            <div className='flex gap-10'>
              <div>Examinations</div>
              <div>15%</div>
            </div>
            <Button
              variant='outline'
              className='border-blue-500 text-xs text-blue-500 hover:bg-blue-100 bg-white'
            >
              Add Assessment
            </Button>
          </div>
        }
      >
        <div className='my-4 mx-4 flex flex-col gap-4'>
          {Array(2)
            .fill(0)
            .map((v, i) => (
              <div key={i} className='flex gap-12 text-xs'>
                <div>Class Work</div>
                <div>50%</div>
                <div className='flex-1' />
                <FiEdit3 className='h-5 w-5 text-[#746D69]' />
              </div>
            ))}
        </div>
      </AccordionAlt>
    </div>
  );
}
