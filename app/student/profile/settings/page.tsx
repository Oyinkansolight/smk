'use client';

import StudentBioDetailsAlt from '@/components/views/student.tsx/StudentBioDetailsAlt';
import { getURL } from '@/firebase/init';
import { useGetStudentById } from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SingleStudentDashboard = () => {
  const [url, setUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  );
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(true);
  const p = useSearchParams();

  const {
    data: student,
    // error: studentError,
    isLoading: isStudentLoading,
  } = useGetStudentById({
    id: p?.get('id'),
  });

  const getFileURL = async (path) => {
    let result = '';
    await getURL(path).then((v) => {
      result = v;
      setUrl(v);
    });
    return result;
  };

  useEffect(() => {
    getFileURL(student?.profileImg);
  }, [student]);

  return (
    <div className='flex'>
      <>
        {/* <div
          className={clsxm(
            'flex justify-end gap-5',
            isEditingBioDetails && 'opacity-50'
          )}
        >
          <Button
            disabled={isEditingBioDetails}
            onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
            variant='secondary'
          >
            Edit Account Details
          </Button>
        </div> */}
        <div className='bg-white px-8 w-full'>
          <StudentBioDetailsAlt
            isEditing={isEditingBioDetails}
            setIsEditing={setIsEditingBioDetails}
            initStudent={student}
          />
        </div>
      </>
    </div>
  );
};

export default SingleStudentDashboard;
