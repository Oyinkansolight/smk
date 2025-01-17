'use client';

import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Toggle from 'react-toggle';
import { SAMPLE_ASSETS } from '@/constant/assets';
import { getURL } from '@/firebase/init';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { useMediaQuery } from 'react-responsive';
import { handleFlutterPDFReader } from '@/lib/helper';

export default function Page() {
  const [addToGradeList, setAddToGradeList] = useState(false);
  const [url, setUrl] = useState('');

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    const getFileURL = async () => {
      const path = SAMPLE_ASSETS.SAMPLE_PDFS.ASSIGNMENT;

      await getURL(path).then((v) => setUrl(v));
    };
    getFileURL();
  }, [url]);

  return (
    <div className='h-full layout pl-0 lg:pl-20'>
      <div className='text-3xl text-[#D4D5D7]'>
        {'Assignments > Submissions > Grade'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Grade</div>
      </div>
      <div className='font-bold pb-4 flex items-center gap-4'>
        <div className='h-10 w-10 rounded-full bg-gray-200' />
        <div>Ighosa Ahmed</div>
      </div>
      <div className='flex lg:flex-row flex-col gap-4'>
        <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden'>
          <div className='flex justify-center'>
            {url.length > 0 && (
              isDesktopOrLaptop ? <CustomPDFReader url={url} /> : handleFlutterPDFReader(url)
            )}
          </div>
        </div>
        <div className=' rounded-lg bg-white p-2'>
          <div className='font-bold text-xl'>Grade Assessment</div>
          <div className='flex flex-col gap-4 mt-6'>
            <div>Add to grade list</div>

            <label>
              <div className='flex flex-row items-center gap-[5px]'>
                <Toggle
                  icons={false}
                  className='custom-toggle'
                  defaultChecked={addToGradeList}
                  onChange={(v) =>
                    setAddToGradeList(v.currentTarget.checked ?? false)
                  }
                />
                <span>{addToGradeList ? <div>Yes</div> : <div>No</div>}</span>
              </div>
            </label>
            <EditStudentGrade />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditStudentGrade() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className='font-bold'>
      <div className='grid py-4 grid-cols-2'>
        <div>Questions</div>
        <div>Score</div>
      </div>
      <div className='flex flex-col gap-2'>
        {Array(7)
          .fill(0)
          .map((v, i) => (
            <div
              className='grid grid-cols-2 items-center bg-[#EFF7F6] p-3 rounded-lg'
              key={i}
            >
              <div>Question {i + 1}</div>
              <EditableFormSelect isEditing={isEditing} />
            </div>
          ))}
      </div>
      <div className='flex items-center justify-center py-4'>
        {isEditing ? (
          <Button
            variant='secondary'
            className='bg-[#1A8FE3] text-xs w-36 justify-center'
            onClick={() => setIsEditing(!isEditing)}
          >
            Submit
          </Button>
        ) : (
          <Button
            className='bg-black hover:bg-gray-900 text-xs w-36 justify-center'
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

function EditableFormSelect({ isEditing }: { isEditing: boolean }) {
  const [value, setValue] = useState<{ label: number } | null>(null);
  const className = 'min-w-[10rem] h-10';
  const getBorderColor = () => {
    if (value && value.label > 3) return 'border-green-500';
    if (value && value.label < 3) return 'border-red-500';
    return '';
  };
  return isEditing ? (
    <ReactSelect
      className={className}
      onChange={(v) => setValue(v)}
      value={value}
      options={Array(6)
        .fill(0)
        .map((v, i) => ({ label: i }))}
    />
  ) : (
    <div className={clsxm(className, 'py-px ')}>
      <div
        className={clsxm(
          'w-full h-full flex items-center border bg-white rounded-lg px-3',
          getBorderColor()
        )}
      >
        <div>{value?.label as number}</div>
      </div>
    </div>
  );
}
