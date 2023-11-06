/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';
import ControlledModal from '@/components/modal/ControlledModal';
import DeleteControlledModal from '@/components/modal/DeleteModalContent';
import {
  useRemoveStaffSubject,
} from '@/server/institution';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SubjectList({
  studentSubjectsList,
  managedClassArm,
  teacher,
}: {
  // subjectCount?: number
  studentSubjectsList?: any[];
  managedClassArm?: any;
  teacher?: string;
}) {
  const [itemId] = useState('');
  const [currentView] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [, setSubjectId] = useState<string | number>(0);

  const removeSubject = useRemoveStaffSubject();

  const handleDeleteSubject = async () => {
    const response = await removeSubject.mutateAsync({
      id: itemId,
    });

    if (response) {
      toast.success('Subject un-assigned successfully');
      toggleDeleteModal();
    } else {
      toast.error('An error occured');
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <>
      <ControlledModal
        isOpen={showDeleteModal}
        toggleModal={toggleDeleteModal}
        content={
          <DeleteControlledModal
            title={`Un-assign ${subjectName}`}
            body={`Are you sure you want to un-assign ${subjectName} from ${teacher}?`}
            toggleModal={toggleDeleteModal}
            handleDelete={handleDeleteSubject}
          />
        }
        className='max-w-[777px] w-full h-[267px]'
      />

      <div>
        {currentView === 0 && (
          <div className='bg-white border-2 rounded-md'>
            <div className='mx-8 font-bold text-2xl text-[#6B7A99] my-4 border-b'>
              Subjects
            </div>

            <div className='p-8'>
              <div className='flex flex-wrap gap-4 px-4 pb-4'>
                {studentSubjectsList &&
                  studentSubjectsList.length > 0 &&
                  studentSubjectsList.map((v, i) => (
                    <div
                      key={v?.id ?? i}
                      className='border flex flex-col items-center justify-center gap-5 rounded-md w-full aspect-square min-w-[200px] lg:max-w-[200px] max-h-[200px] relative group'
                    >
                      <div className='flex items-center justify-center h-28 w-28 font-black rounded-full border border-[#DADEE6] bg-[#E2EEFF33] text-[#DADEE6] text-5xl'>
                        <div>{v?.name?.substring(0, 1)}</div>
                      </div>
                      <div
                        className='font-medium text-center text-sm cursor-pointer'
                        onClick={() => {
                          // setCurrentView(1);
                          setSubjectId(v?.id);
                          // setClassId(v?.subject?.class?.class?.id);
                          setSubjectName(v?.name);
                        }}
                      >
                        {v ? `${v?.name} ` : 'Subject Name'}
                      </div>
                    </div>
                  ))}
              </div>

              {!studentSubjectsList ||
                (studentSubjectsList.length === 0 && (
                  <EmptyView
                    label='No subject has been assigned to this user'
                    useStandardHeight
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
