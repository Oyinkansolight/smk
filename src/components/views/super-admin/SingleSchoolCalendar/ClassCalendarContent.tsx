import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';
import AddEvent from '@/components/modal/AddEvent';
import EditEvent from '@/components/modal/EditEvent';
import Image from 'next/image';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function StudentDashboardView() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  function handleModal() {
    setIsOpen(!isOpen);
  }
  function handleModalEdit() {
    setIsOpenEdit(!isOpenEdit);
  }
  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-between'>
        <div className='bg-[#EDEFF2] font-normal text-[10px] px-2 py-1 flex space-x-1 items-center'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <span>Back</span>
        </div>
        <div className='flex flex-row gap-x-7'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Filter</option>
          </select>
          <button className='text-primary'>Preview Calendar</button>
          <Button
            onClick={handleModal}
            variant='outline'
            className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Add Event
          </Button>
        </div>
      </div>
      {isOpen && <AddEvent onClickHandler={handleModal} />}
      {isOpenEdit && <EditEvent onClickHandler={handleModalEdit} />}

      <div className='bg-white rounded-md px-6 py-10'>
        <div className='bg-[#ECF4FF] rounded-lg pr-10 pl-5 py-8'>
          <div className='flex justify-between items-center text-[10px]'>
            <div className='font-semibold text-[#5A5A5A] text-xs'>
              Primary School - First Term Calendar
            </div>

            <p className='font-bold'>
              <span className='font-normal'>Start Date:</span> 23, September,
              2022
            </p>
            <p className='font-bold'>
              <span className='font-normal'>End Date:</span> 23, December, 2022
            </p>
            <div>
              <NextImage
                src='/svg/calendar_mini.svg'
                width={52}
                height={99}
                alt='calendar_mini'
              />
            </div>
          </div>
        </div>

        <div className='bg-white border rounded-lg px-4 py-2 mt-5'>
          <div className='text-[#6B7A99] grid grid-cols-12 items-center text-[10px]'>
            <div className='font-semibold  text-xs col-span-4'>Resumption</div>

            <div className='col-span-6 flex space-x-4 items-center'>
              <p className='font-bold'>
                <span className='font-normal'>Event Date:</span> 23, December,
                2022
              </p>
            </div>
            <div className='flex items-center justify-end  space-x-2 col-span-2'>
              <Button
                onClick={handleModalEdit}
                variant='outline'
                className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
              >
                Edit Event
              </Button>
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </div>
        <div className='bg-white border rounded-lg px-4 py-2 mt-4'>
          <div className='text-[#6B7A99] grid grid-cols-12 items-center text-[10px]'>
            <div className='font-semibold  text-xs col-span-4'>
              PSCE and BECE Examination Registration
            </div>
            <div className='col-span-6 flex space-x-4 items-center'>
              <p className='font-bold '>
                <span className='font-normal'>Start Date:</span> 23, December,
                2022
              </p>
              <p className='font-bold'>
                <span className='font-normal'>End Date:</span> 23, December,
                2022
              </p>
            </div>
            <div className='flex items-center justify-end  space-x-2 col-span-2'>
              <Button
                variant='outline'
                className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
              >
                Edit Event
              </Button>
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </div>
        <div className='bg-white border rounded-lg px-4 py-2 mt-4'>
          <div className='text-[#6B7A99] grid grid-cols-12 items-center text-[10px]'>
            <div className='font-semibold  text-xs col-span-4'>
              Independence Day Holiday{' '}
            </div>

            <div className='col-span-6 flex space-x-4 items-center'>
              <p className='font-bold'>
                <span className='font-normal'>Start Date:</span> 23, December,
                2022
              </p>
              <p className='font-bold'>
                <span className='font-normal'>End Date:</span> 23, December,
                2022
              </p>
            </div>
            <div className='flex items-center justify-end  space-x-2 col-span-2'>
              <Button
                variant='outline'
                className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
              >
                Edit Event
              </Button>
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
