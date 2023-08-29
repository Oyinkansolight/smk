/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';
import AddEvent from '@/components/modal/AddEvent';
import EditEvent from '@/components/modal/EditEvent';
import { getErrMsg } from '@/server';
import { useCreateAcademicEvent, useGetAcademicEvent } from '@/server/Schedule';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function StudentDashboardView({ currentTermId }: any) {
  const [schoolType, setschoolType] = useState<string | null>('');

  const queryString = useSearchParams();
  const { data, isLoading } = useGetAcademicEvent();
  const [loading, setloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [session, setsession] = useState<string | null>('');
  const [title, settitle] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  // const [events, setEvents] = useState([]);

  function handleModal() {
    setIsOpen(!isOpen);
  }
  function handleModalEdit() {
    setIsOpenEdit(!isOpenEdit);
  }
  // function back() {
  //   if (typeof window !== 'undefined') {
  //     window.history.back();
  //   }
  // }

  const handdleCreateAcademicCalendar = useCreateAcademicEvent();
  const SubmitHandler = async () => {
    const data = {
      sessionId: session,
      institutionType: schoolType,
      term: currentTermId,
      title,
      startDate,
      endDate,
    };

    try {
      setloading(true);
      const response = await handdleCreateAcademicCalendar.mutateAsync(data);

      if (response) {
        toast.success('Event created successfully');
        setloading(false);
        setIsOpen(false);
        //2 Second - Open Success Modal
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  useEffect(() => {
    // Create a URLSearchParams object with the query string
    const searchParams = new URLSearchParams(queryString ?? '');

    // Extract the values of session and term parameters
    const currrentsession = searchParams.get('session');
    // const currrentterm = searchParams.get('term');
    const st = queryString && queryString.get('schooltype');

    // initial data: Secondary school, Output: "Secondary"
    setschoolType(st && st.replace(' School', ''));
    // setterm(currrentterm);
    setsession(currrentsession);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredEvents = (data?.data ?? []).filter(
    (item: any) =>
      item?.session?.id === Number(session) &&
      item.institutionType.includes(schoolType)
  );
  // setEvents(filteredEvents);

  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-end'>
        {/* <button
          onClick={back}
          className='bg-[#EDEFF2] font-normal text-[10px] px-2 py-1 flex space-x-1 items-center'
        >
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <span>Back</span>
        </button> */}
        <div className='flex flex-row gap-x-7'>
          <Button
            onClick={handleModal}
            variant='outline'
            className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Add Event
          </Button>
        </div>
      </div>
      {isOpen && (
        <AddEvent
          setstartDate={setstartDate}
          setendDate={setendDate}
          settitle={settitle}
          onClickHandler={handleModal}
          SubmitHandler={SubmitHandler}
          loading={loading}
        />
      )}
      {isOpenEdit && <EditEvent onClickHandler={handleModalEdit} />}

      <div className='bg-white rounded-md px-6 py-10'>
        <div className='bg-[#ECF4FF] rounded-lg pr-10 pl-5 py-8'>
          <div className='flex justify-between items-center text-[10px]'>
            <div className='font-semibold text-[#5A5A5A] text-xs'>
              {schoolType} - Academic Roadmap
            </div>

            {/* <p className='font-bold'>
            <span className='font-normal'>Start Date:</span> 23, September,
            2022
          </p>
          <p className='font-bold'>
            <span className='font-normal'>End Date:</span> 23, December, 2022
          </p> */}
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

        {isLoading ? (
          <div className='text-center my-4'>Loading...</div>
        ) : (
          filteredEvents.map((item: any, idx: number) => (
            <div
              key={idx}
              className='bg-white border rounded-lg px-4 py-2 mt-4'
            >
              <div className='text-[#6B7A99] grid grid-cols-12 items-center text-[10px]'>
                <div className='font-semibold  text-xs col-span-4'>
                  {item.title}
                </div>

                <div className='col-span-6 flex space-x-4 items-center'>
                  <p className='font-bold'>
                    <span className='font-normal'>Start Date:</span>{' '}
                    {moment(item.startDate).format('ll')}
                  </p>
                  <p className='font-bold'>
                    <span className='font-normal'>End Date:</span>{' '}
                    {moment(item.endDate).format('ll')}
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
          ))
        )}
      </div>
    </>
  );
}
