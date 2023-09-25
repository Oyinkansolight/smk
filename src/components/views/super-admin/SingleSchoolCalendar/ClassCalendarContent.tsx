/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';
import AddEvent from '@/components/modal/AddEvent';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import EditEvent from '@/components/modal/EditEvent';
import { getErrMsg } from '@/server';
import {
  useCreateAcademicEvent,
  useDeleteAcademicEvent,
  useEditAcademicEvent,
  useGetAcademicEvent,
} from '@/server/Schedule';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface dataType {
  sessionId?: string | null;
  institutionType?: string | null;
  term?: string;
  id?: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
}
export default function StudentDashboardView({ currentTermId }: any) {
  const [schoolType, setschoolType] = useState<string | null>('');

  const queryString = useSearchParams();
  const { data, isLoading } = useGetAcademicEvent();
  const [loading, setloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditEvent, setIsEditEvent] = useState(false);
  const [session, setsession] = useState<string | null>('');
  const [title, settitle] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [action, setAction] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState('');
  const [itemToEdit, setItemToEdit] = useState<dataType | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function dateValidator(start: string, end: string) {
    const getStartDateValue = new Date(start).getTime();
    const getEndtDateValue = new Date(end).getTime();

    if (getEndtDateValue && getStartDateValue) {
      if (getEndtDateValue < getStartDateValue) {
        return true;
      } else return false;
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function handleModal() {
    setIsOpen(!isOpen);
  }
  function resetState() {
    settitle('');
    setstartDate('');
    setendDate('');
  }
  function handleModalEditEvent() {
    setIsEditEvent(!isEditEvent);
  }

  const { mutateAsync } = useDeleteAcademicEvent();

  const deleteEvent = async () => {
    if (itemToDelete) {
      const data = { eventId: itemToDelete };

      try {
        const response = await mutateAsync(data);
        if (response) {
          toast.success('Event deleted successfully');
          toggleModal();
          setAction(null);
        }
      } catch (error) {
        toast.error(getErrMsg(error));
      }
    }
  };

  const handdleCreateAcademicCalendar = useCreateAcademicEvent();
  const handdleEditAcademicCalendar = useEditAcademicEvent();
  const SubmitHandler = async () => {
    const data: dataType = {
      sessionId: session,
      institutionType: schoolType,
      term: currentTermId,
      title,
      startDate,
      endDate,
      type: 'CALENDAR',
    };

    if (!data.title || data.title === '') {
      toast.error('Title cannot be empty');
      return;
    }
    if (dateValidator(data.startDate, data.endDate)) {
      toast.error(`End date can't be lesser than start date`);
      return;
    }

    try {
      setloading(true);
      if (!isEditEvent) {
        const response = await handdleCreateAcademicCalendar.mutateAsync(data);

        if (response) {
          toast.success('Event created successfully');
          setloading(false);
          setIsOpen(false);
          //2 Second - Open Success Modal
        }
      } else {
        data.id = itemToEdit?.id;
        delete data.sessionId;
        delete data.term;
        delete data.institutionType;
        const response = await handdleEditAcademicCalendar.mutateAsync(data);

        if (response) {
          toast.success('Event updated successfully');
          setloading(false);
          setIsEditEvent(false);
          //2 Second - close Success Modal
        }
      }
      resetState();
    } catch (error) {
      setloading(false);
      resetState();
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
      item?.session?.id === session &&
      item.institutionType.includes(schoolType) &&
      item.type === 'CALENDAR'
  );
  // setEvents(filteredEvents);

  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-end'>
        <ControlledModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          content={
            <DeleteModalContent
              title='Delete Event'
              body='Are you sure you want to delete this event?'
              toggleModal={toggleModal}
              handleDelete={deleteEvent}
            />
          }
          className='max-w-[777px] w-full h-[267px]'
        />
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

      {isEditEvent && (
        <EditEvent
          itemToEdit={itemToEdit}
          setstartDate={setstartDate}
          setendDate={setendDate}
          settitle={settitle}
          startDate={startDate}
          endDate={endDate}
          title={title}
          onClickHandler={handleModalEditEvent}
          SubmitHandler={SubmitHandler}
          loading={loading}
        />
      )}

      <div className='bg-white rounded-md px-6 py-10'>
        <div className='bg-[#ECF4FF] rounded-lg pr-10 pl-5 py-8'>
          <div className='flex justify-between items-center text-[10px]'>
            <div className='font-semibold text-[#5A5A5A] text-xs'>
              {schoolType} Schools - Academic Calendar
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
              key={item.id}
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
                <div className='relative flex items-center justify-end  space-x-2 col-span-2'>
                  {action == idx + 1 && (
                    <div className='shadow-lg rounded-xl bg-white w-[180px] h-max absolute top-0 -left-[100px] z-10'>
                      <button
                        onClick={() => {
                          setItemToEdit(item ?? '');
                          handleModalEditEvent();
                          setAction(null);
                        }}
                        className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setItemToDelete(item.id ?? '');
                          toggleModal();
                        }}
                        className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {action && (
                    <div
                      className='fixed inset-0 z-[1]'
                      onClick={() => {
                        setAction(null);
                      }}
                    ></div>
                  )}
                  <BsThreeDotsVertical
                    onClick={() => {
                      setAction(idx + 1);
                    }}
                    size={20}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
