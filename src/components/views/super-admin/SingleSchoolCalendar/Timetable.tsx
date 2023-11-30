/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ControlledModal from '@/components/modal/ControlledModal';
import DeleteModalContent from '@/components/modal/DeleteModalContent';
import EditTimeTable from '@/components/modal/EditSchedule';
import AddActivityName from '@/components/modal/TestSchedule';
import { timeConverter } from '@/lib/helper';
import { getErrMsg } from '@/server';
import {
  useCreateAcademicTimeTable,
  useDeleteAcademicTimeTable,
  useEditAcademicTimeTable,
  useGetAcademicTimetable,
} from '@/server/Schedule';
import { useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface dataType {
  id?: string;
  sessionId?: string;
  institutionType: string | null;
  timeTableType: string;
  classId?: string;
  term?: number;
  type: string | number;
  periods?: any[];
  startTime: string | number;
  endTime: string | number;
  eventName?: string | number;
}
const TimeTable = ({
  sessionId,
  classId,
  termId,
  schoolType,
  isClassTimeTable = true,
  examSchedule,
  timeTableType = 'DEFAULT',
}: {
  sessionId: any;
  classId: string;
  termId: number;
  examSchedule?: any;
  isClassTimeTable?: boolean;
  schoolType: string | null;
  timeTableType?: string;
}) => {
  const { data, isLoading } = useGetAcademicTimetable({
    sessionId,
    classId,
    termId,
  });

  const handleCreateAcademicTimeTable = useCreateAcademicTimeTable();
  const handleDeleteAcademicTimeTable = useDeleteAcademicTimeTable();
  const handleEditAcademicTimeTable = useEditAcademicTimeTable();

  const [isOpenActivity, setisOpenActivity] = useState(false);
  const [itemToEdit, setitemToEdit] = useState<dataType | null>();
  const [itemToDelete, setitemToDelete] = useState<string>('');
  const [isEditOpen, setisEditOpen] = useState(false);
  const [startTime, setStartTime] = useState<string | number>('');
  const [endTime, setEndTime] = useState<string | number>('');
  const [subjectId1, setSubjectId1] = useState<string | number>('');
  const [subjectId2, setSubjectId2] = useState<string | number>('');
  const [subjectId3, setSubjectId3] = useState<string | number>('');
  const [subjectId4, setSubjectId4] = useState<string | number>('');
  const [subjectId5, setSubjectId5] = useState<string | number>('');
  const [activityname1, setactivityname1] = useState<string | number>('');
  const [activityname2, setactivityname2] = useState<string | number>('');
  const [activityname3, setactivityname3] = useState<string | number>('');
  const [activityname4, setactivityname4] = useState<string | number>('');
  const [activityname5, setactivityname5] = useState<string | number>('');
  const [eventName, seteventname] = useState<string | number>('');
  const [loading, setloading] = useState(false);
  const [type, setType] = useState<string | number>('period');
  const [activity1, setactivity1] = useState(false);
  const [activity2, setactivity2] = useState(false);
  const [activity3, setactivity3] = useState(false);
  const [activity4, setactivity4] = useState(false);
  const [activity5, setactivity5] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const modalActivityHandler = () => {
    setisOpenActivity(!isOpenActivity);
  };

  const generateKey = (decider: boolean) => {
    return decider ? 'eventName' : 'subject';
  };
  const resetState = () => {
    setSubjectId1('');
    setSubjectId2('');
    setSubjectId3('');
    setSubjectId4('');
    setSubjectId5('');
    setactivityname1('');
    setactivityname2('');
    setactivityname3('');
    setactivityname4('');
    setactivityname5('');
    seteventname('');
    setStartTime('');
    setEndTime('');
    setactivity1(false);
    setactivity2(false);
    setactivity3(false);
    setactivity4(false);
    setactivity5(false);
  };
  const SubmitHandler = async () => {
    const data: dataType = {
      sessionId: sessionId,
      institutionType: schoolType,
      classId,
      term: termId,
      timeTableType: timeTableType,
      type,
      periods: [
        {
          day: 'Monday',
          [generateKey(activity1)]: activity1 ? activityname1 : subjectId1,
          isEvent: activity1,
        },
        {
          day: 'Tuesday',
          [generateKey(activity2)]: activity2 ? activityname2 : subjectId2,
          isEvent: activity2,
        },
        {
          day: 'Wednesday',
          [generateKey(activity3)]: activity3 ? activityname3 : subjectId3,
          isEvent: activity3,
        },
        {
          day: 'Thursday',
          [generateKey(activity4)]: activity4 ? activityname4 : subjectId4,
          isEvent: activity4,
        },
        {
          day: 'Friday',
          [generateKey(activity5)]: activity5 ? activityname5 : subjectId5,
          isEvent: activity5,
        },
      ],
      startTime,
      endTime,
      eventName,
    };

    if (type === 'event') {
      delete data.periods;
    } else {
      delete data.eventName;
    }

    try {
      if (!data.startTime || data.startTime === '') {
        toast.error('Start Time is invalid or missing');
        return;
      }
      if (!data.endTime || data.endTime === '') {
        toast.error('End time is invalid or missing');
        return;
      }
      if (data.periods && type === 'period') {
        for (const period of data.periods) {
          // Check if subject is a positive integer
          if (period.subject === '' && !period.isEvent) {
            toast.error('one or more subject in periods is invalid or missing');
            return;
          }
          if (period.eventName === '' && period.isEvent) {
            toast.error(
              'one or more activity in periods is invalid or missing'
            );
            return;
          }
        }
      }
      // If isEvent is true, check for eventName
      if (type === 'event' && !data.eventName) {
        toast.error('Event Name is invalid or missing');
        return;
      }
      setloading(true);
      let response;
      if (itemToEdit) {
        data.id = itemToEdit?.id;
        delete data.sessionId;
        delete data.classId;
        delete data.term;
        response = await handleEditAcademicTimeTable.mutateAsync(data);
      } else {
        response = await handleCreateAcademicTimeTable.mutateAsync(data);
      }

      if (response) {
        if (itemToEdit) {
          toast.success('Timetable updated successfully');
          setisEditOpen(false);
        } else {
          toast.success('Timetable created successfully');
          modalActivityHandler();
        }
        // location.reload()
        setloading(false);
        resetState();
      }
    } catch (error) {
      setloading(false);
      toast.error(getErrMsg(error));
    }
  };

  function getEachDaySubject(data: any, day: string) {
    let subjectName;
    let isEvent;

    data.periods.forEach((element: any) => {
      if (element.day.toLowerCase() === day) {
        if (element.subject) {
          subjectName = element.subject.name;
          isEvent = false;
        } else {
          subjectName = element.eventName;
          isEvent = true;
        }
      }
    });

    return { subjectName, isEvent };
  }

  async function deleteTimetable() {
    const data = { id: itemToDelete };

    try {
      const response = await handleDeleteAcademicTimeTable.mutateAsync(data);
      if (response) {
        toast.success('Timetable deleted successfully');
        toggleModal();
      }
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  }

  return (
    <section>
      {isOpenActivity && (
        <AddActivityName
          onClickHandler={() => {
            modalActivityHandler();
            // resetState();
          }}
          setEndTime={setEndTime}
          setStartTime={setStartTime}
          setSubjectId1={setSubjectId1}
          setSubjectId2={setSubjectId2}
          setSubjectId3={setSubjectId3}
          setSubjectId4={setSubjectId4}
          setSubjectId5={setSubjectId5}
          seteventname={seteventname}
          setType={setType}
          type={type}
          loading={loading}
          SubmitHandler={SubmitHandler}
          setactivity1={setactivity1}
          activity1={activity1}
          setactivity2={setactivity2}
          activity2={activity2}
          setactivity3={setactivity3}
          activity3={activity3}
          setactivity4={setactivity4}
          activity4={activity4}
          setactivity5={setactivity5}
          activity5={activity5}
          setactivityname1={setactivityname1}
          activityname1={activityname1}
          setactivityname2={setactivityname2}
          activityname2={activityname2}
          setactivityname3={setactivityname3}
          activityname3={activityname3}
          setactivityname4={setactivityname4}
          activityname4={activityname4}
          setactivityname5={setactivityname5}
          activityname5={activityname5}
        />
      )}
      {isEditOpen && (
        <EditTimeTable
          onClickHandler={() => {
            setisEditOpen(false);
            resetState();
          }}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          subjectId1={subjectId1}
          subjectId2={subjectId2}
          subjectId3={subjectId3}
          subjectId4={subjectId4}
          subjectId5={subjectId5}
          setSubjectId1={setSubjectId1}
          setSubjectId2={setSubjectId2}
          setSubjectId3={setSubjectId3}
          setSubjectId4={setSubjectId4}
          setSubjectId5={setSubjectId5}
          seteventname={seteventname}
          eventname={eventName}
          setType={setType}
          type={type}
          loading={loading}
          SubmitHandler={SubmitHandler}
          setactivity1={setactivity1}
          activity1={activity1}
          setactivity2={setactivity2}
          activity2={activity2}
          setactivity3={setactivity3}
          activity3={activity3}
          setactivity4={setactivity4}
          activity4={activity4}
          setactivity5={setactivity5}
          activity5={activity5}
          setactivityname1={setactivityname1}
          activityname1={activityname1}
          setactivityname2={setactivityname2}
          activityname2={activityname2}
          setactivityname3={setactivityname3}
          activityname3={activityname3}
          setactivityname4={setactivityname4}
          activityname4={activityname4}
          setactivityname5={setactivityname5}
          activityname5={activityname5}
          itemToEdit={itemToEdit}
        />
      )}
      <ControlledModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={
          <DeleteModalContent
            title='Delete Row'
            body='Are you sure you want to delete this row on the list?'
            toggleModal={toggleModal}
            handleDelete={deleteTimetable}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />

      <div className='mt-8 bg-[#F5F5F6] p-2 rounded-md'>
        <div className='flex w-full mr-10 mb-4'>
          <div className='w-[150px] font-medium rounded-l p-3  border bg-white text-gray-500'>
            Date
          </div>
          <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
            <div className='p-3 bg-[#FB6340]'>Monday</div>
            <div className='p-3 bg-[#8E059A]'>Tuesday</div>
            <div className='p-3 bg-[#AA5C09]'>Wednesday</div>
            <div className='p-3 bg-[#099F8D]'>Thursday</div>
            <div className='p-3 bg-[#612503]'>Friday</div>
          </div>
          <div className='w-[40px] pl-4 flex flex-col space-y-2 text-[8px] '></div>
        </div>
        {!isLoading ? (
          <div>
            <div>
              {((isClassTimeTable ? data : examSchedule) ?? []).map(
                (item: any, id: number) => (
                  <div key={id}>
                    {item.type === 'event' ? (
                      <div className='flex w-full mt-2 items-center'>
                        <div className='w-[150px] bg-white font-medium text-[10px] pl-3 py-5  border'>
                          {timeConverter(item.startTime)} -
                          {timeConverter(item.endTime)}
                        </div>
                        <div className='w-full border p-5 text-center'>
                          <p> {item.eventName} </p>
                        </div>
                        <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                          <button
                            onClick={() => {
                              setisEditOpen(true);
                              setitemToEdit(item);
                            }}
                            className='text-green-600'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setitemToDelete(item.id);
                              toggleModal();
                            }}
                            className='text-red-600'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex w-full mt-2 items-center'>
                        <div className='w-[150px] bg-white  font-medium pl-3 py-5  border'>
                          {timeConverter(item.startTime)} -
                          {timeConverter(item.endTime)}
                        </div>

                        <div className='w-full grid grid-cols-5 text-gray-200  border font-medium text-center'>
                          <div
                            className={`${
                              getEachDaySubject(item, 'monday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFF2F0] text-[#FB6340]'
                            }  px-3 py-5 truncate `}
                          >
                            {getEachDaySubject(item, 'monday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'tuesday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FDE8FF] text-[#ED1CFF]'
                            }  px-3 py-5 truncate `}
                          >
                            {getEachDaySubject(item, 'tuesday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'wednesday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFF3E2] text-[#FF9F1C]'
                            }  px-3 py-5 truncate `}
                          >
                            {getEachDaySubject(item, 'wednesday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'thursday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#F4FFE6] text-[#60AC00]'
                            }  px-3 py-5 truncate `}
                          >
                            {getEachDaySubject(item, 'thursday').subjectName}
                          </div>
                          <div
                            className={`${
                              getEachDaySubject(item, 'friday').isEvent
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFEB] text-[#CDCD04]'
                            }  px-3 py-5 truncate`}
                          >
                            {getEachDaySubject(item, 'friday').subjectName}
                          </div>
                        </div>
                        <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '>
                          <button
                            onClick={() => {
                              setisEditOpen(true);
                              setitemToEdit(item);
                            }}
                            className='text-green-600'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setitemToDelete(item.id);
                              toggleModal();
                            }}
                            className='text-red-600'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className='flex w-full mt-2 items-center'>
              <div className='w-full py-5 flex justify-end px-4  border text-center'>
                <button
                  onClick={() => {
                    modalActivityHandler();
                    setitemToEdit(null);
                  }}
                  className='w-full text-center'
                >
                  <p>Click to add event or period </p>
                </button>
              </div>
              <div className='w-[40px] pl-4 flex flex-col justify-center space-y-2 text-[8px] '></div>
            </div>
          </div>
        ) : (
          <div className='text-center text-xs mt-5'>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default TimeTable;
