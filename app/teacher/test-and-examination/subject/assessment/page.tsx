'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import clsxm from '@/lib/clsxm';
import { useEffect, useState } from 'react';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';
import { RiBookReadLine } from 'react-icons/ri';
import { SAMPLE_ASSETS } from '@/constant/assets';
import { getURL } from '@/firebase/init';
import CustomPDFReader from '@/components/pdfReader/Reader';
import { handleFlutterPDFReader } from '@/lib/helper';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const [idx, setIdx] = useState(0);
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
      <div className='text-[#D4D5D7] text-xl mt-6'>
        {'Test & Examination > Mathematics'}
      </div>
      <div className='font-bold py-8 h2'>
        <div>Mathematics</div>
      </div>
      <TextTabBar
        activeClassName='text-blue-500'
        tabs={[
          <div className='flex items-center gap-2' key={0}>
            <RiBookReadLine className='h-6 w-6' />
            <div>Grade CA 1</div>
          </div>,
          <div className='flex items-center gap-2' key={1}>
            <RiBookReadLine className='h-6 w-6' />
            <div>View Question Sheet</div>
          </div>,
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      {idx === 0 && (
        <>
          <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
            <input className='rounded-full border p-3' placeholder='search' />
            <div className='flex-1' />
            <div className='flex items-center'>
              Filter By
              <BiChevronDown className='w-6 h-6' />
            </div>
            <BiSortUp className='h-6 w-6' />
          </div>
          <div className='flex justify-between p-8'>
            <div>Student Name</div>
            <div>Scores(40)</div>
          </div>
          <div className='p-4 gap-4 flex flex-col bg-white'>
            {Array(6)
              .fill(0)
              .map((v, i) => (
                <EditScore key={i} id={i + 1} />
              ))}
          </div>
          <PaginatedCounter pageCount={5} currentPage={0} />
        </>
      )}
      {idx === 1 && (
        <div className='flex-1 rounded-lg bg-white min-h-[50rem] overflow-hidden'>
          <div className='flex justify-center'>
            {url.length > 0 && (
              isDesktopOrLaptop ? <CustomPDFReader url={url} /> : handleFlutterPDFReader(url)
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EditScore({ id }: { id: number }) {
  const [score, setScore] = useState(35);
  const [isEditing, setIsEditing] = useState(true);
  return (
    <div className='flex gap-4'>
      <div className='border-[#D4D5D7] rounded-md px-10 gap-10 flex items-center border h-12 flex-1'>
        <div>{id}</div>
        <div className='flex items-center gap-2 text-black font-bold'>
          <div className='h-8 w-8 bg-gray-200 rounded-full' />
          <div>Matt Cleaner</div>
        </div>
      </div>
      {isEditing ? (
        <input
          type='number'
          value={score}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setScore(Number.parseInt(e.currentTarget.value));
            }
          }}
          className='rounded-md border-[#D4D5D7] flex items-center justify-center font-bold border h-12 w-[8rem] text-center'
        />
      ) : (
        <div className='rounded-md border-[#D4D5D7] flex items-center justify-center font-bold border h-12 w-[8rem] text-center'>
          <div>{score}</div>
        </div>
      )}
      <div
        onClick={() => setIsEditing(!isEditing)}
        className={clsxm(
          'rounded-md flex items-center cursor-pointer text-white font-bold justify-center bg-[#1A8FE3] min-w-[8rem]',
          !isEditing && 'bg-[#262626]'
        )}
      >
        <div>{isEditing ? 'Submit' : 'Edit'}</div>
      </div>
    </div>
  );
}
