'use client';

import Button from '@/components/buttons/Button';
import PageCounter from '@/components/counter/PageCounter';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { Page as DocPage, Document, pdfjs } from 'react-pdf';
import ReactSelect from 'react-select';
import Toggle from 'react-toggle';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Page() {
  const [addToGradeList, setAddToGradeList] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [numberOfPages, setNumberOfPages] = useState(0);
  return (
    <div className='h-full layout'>
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
      <div className='flex gap-4'>
        <div className='flex-1 rounded-lg p-2 bg-white'>
          <div className='flex justify-center p-8'>
            <PageCounter
              page={currentPage}
              maxPage={numberOfPages}
              onChange={setCurrentPage}
            />
          </div>
          <Document
            file='/pdfs/EDO LANGUAGE SS2 3RD TERM WEEK 3.pdf'
            onLoadSuccess={(v) => {
              setNumberOfPages(v.numPages);
            }}
          >
            <DocPage pageNumber={currentPage} />
          </Document>
        </div>
        <div className='rounded-lg bg-white p-2'>
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
          <Button onClick={() => setIsEditing(!isEditing)}>Submit</Button>
        ) : (
          <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
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
