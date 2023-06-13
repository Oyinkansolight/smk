'use client';

import AccordionAlt from '@/components/accordions/AccordionAlt';
import Button from '@/components/buttons/Button';
import { FiTrendingUp } from 'react-icons/fi';
import ReactSelect from 'react-select';

const affective = [
  'Attentiveness',
  'Honesty',
  'Neatness',
  'Politeness',
  'Punctuality',
  'Confidence',
  'Attitude',
];

const psychomotor = [
  'Learning Skills',
  'Handwriting',
  'Spoken English',
  'Reading Skills',
  'Outdoor Games',
  'Vocational Skills',
];

export default function Page() {
  return (
    <div className='h-full layout flex flex-col gap-6'>
      <div className='text-black font-bold py-8 text-2xl'>Grade Book</div>
      <div className='flex gap-4'>
        <div className='flex w-[313px] flex-col justify-center items-center bg-white rounded-lg'>
          <div className='h-20 rounded-full w-20 bg-slate-300' />
          <div className='text-lg font-bold'>
            <div>
              Name: <span className='text-[#746D69]'>Ahmed Ighosa</span>
            </div>
            <div>
              Sex: <span className='text-[#746D69]'>Male</span>
            </div>
            <div>
              Age: <span className='text-[#746D69]'>15</span>
            </div>
            <div>
              Class: <span className='text-[#746D69]'>SS1 Ferret</span>
            </div>
          </div>
        </div>
        <div className='flex-1' />
        <div className='grid grid-cols-2 gap-4'>
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
          <FlashCard
            title={
              <div>
                1/<span className='text-[#C8C8C8]'>50</span>
              </div>
            }
            subtitle='Position in class'
          />
        </div>
      </div>
      <div className='rounded-lg bg-white p-6'>
        <div className='mb-5 font-bold text-xl'>Cognitive Domain</div>
        <div className='bg-[#EFF7F6] p-6'>
          <table className='w-full'>
            <tr className='text-[#746D69] text-lg'>
              <th>Subjects</th>
              <th>Assignment 1</th>
              <th>Assignment 2</th>
              <th>Examination</th>
              <th>Total</th>
              <th>Position</th>
              <th>Grade</th>
              <th>Remark</th>
            </tr>
            {Array(10)
              .fill(0)
              .map((v, i) => (
                <tr className='text-center font-bold text-[#262626]' key={i}>
                  <td className='h-10'>Geography</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>8th</td>
                  <td>E</td>
                  <td>Fail</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
      <div className='p-8 flex flex-col gap-5 bg-white rounded-lg'>
        <AccordionAlt
          titleClassName='bg-[#EFF7F6]'
          title={<div>Affective Domain</div>}
          length={500}
        >
          <div className='flex justify-center mt-4'>
            <div className='flex-1 flex flex-col gap-6 max-w-3xl'>
              <div className='grid grid-cols-2 font-bold'>
                <div>Behavior</div>
                <div>Rating</div>
              </div>
              {affective.map((v, i) => (
                <div key={i} className='grid grid-cols-2 items-center'>
                  <div>{v}</div>
                  <ReactSelect className='min-w-[20rem]' />
                </div>
              ))}
            </div>
          </div>
        </AccordionAlt>
        <AccordionAlt
          titleClassName='bg-[#EFF7F6]'
          title={<div>Psychomotor Domain</div>}
          length={420}
        >
          <div className='flex justify-center mt-4'>
            <div className='flex-1 flex flex-col gap-6 max-w-3xl'>
              <div className='grid grid-cols-2 font-bold'>
                <div>Skills</div>
                <div>Rating</div>
              </div>
              {psychomotor.map((v, i) => (
                <div key={i} className='grid grid-cols-2 items-center'>
                  <div>{v}</div>
                  <ReactSelect className='min-w-[20rem]' />
                </div>
              ))}
            </div>
          </div>
        </AccordionAlt>
        <AccordionAlt
          titleClassName='bg-[#EFF7F6]'
          title={<div>Comments/Observation</div>}
          length={340}
        >
          <div className='flex flex-col items-center gap-5 py-5'>
            <textarea className='h-72 rounded-lg border w-full max-w-3xl' />
          </div>
        </AccordionAlt>
        <div className='flex justify-end w-full mx-auto max-w-3xl'>
          <Button variant='secondary'>Submit</Button>
        </div>
      </div>
    </div>
  );
}

function FlashCard({
  title,
  subtitle,
}: {
  title: JSX.Element;
  subtitle: string;
}) {
  return (
    <div className='flex justify-between items-start p-4 rounded-lg bg-white h-[117px] w-[312px]'>
      <div className=''>
        <div className='text-4xl font-bold'>{title}</div>
        <div className=' font-bold text-[#746D69] text-lg mt-2'>{subtitle}</div>
      </div>
      <div className='rounded-full bg-[#F3F4FB] p-4'>
        <FiTrendingUp className='h-6 w-6' />
      </div>
    </div>
  );
}
