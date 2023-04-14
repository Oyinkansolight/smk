'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { Label } from '@/types';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function AddSubjectView() {
  const [classes, setClasses] = useState(new Set());
  const [classes1, setClasses1] = useState(new Set());
  const [classes2, setClasses2] = useState(new Set());
  const [classes3, setClasses3] = useState(new Set());

  const d: Label[] = [
    { id: 'daycare', value: 'Daycare' },
    { id: 'eccde1', value: 'ECCDE 1' },
    { id: 'eccde2', value: 'ECCDE 2' },
  ];

  const d2: Label[] = [
    { id: 'primary1', value: 'Primary 1' },
    { id: 'primary2', value: 'Primary 2' },
    { id: 'primary3', value: 'Primary 3' },
    { id: 'primary4', value: 'Primary 4' },
    { id: 'primary5', value: 'Primary 5' },
    { id: 'primary6', value: 'Primary 6' },
  ];

  const d3: Label[] = [
    { id: 'jss1', value: 'JSS 1' },
    { id: 'jss2', value: 'JSS 2' },
    { id: 'jss3', value: 'JSS 3' },
    { id: 'ssc4', value: 'SSC 4' },
    { id: 'ssc5', value: 'SSC 5' },
    { id: 'ssc6', value: 'SSC 6' },
  ];

  const d4: Label[] = [{ id: 'ex', value: 'Example' }];

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white p-10'>
        <div className='py-2 text-4xl font-bold'>Add New Subject</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-10 w-full'>
          <div className='w-full'>
            <div className='w-full max-w-xs'>
              <BaseInput
                label={
                  <span>
                    Subject Name<span className='text-[#E5A500]'>*</span>
                  </span>
                }
                name='subject'
              />
            </div>
          </div>

          <div className='w-full'>
            <BaseInput
              label={
                <span>
                  Enter Description<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='description'
            />
          </div>
        </div>

        <div className='h-2' />
        <div className='w-full text-start text-xs'>
          <div>Select classes applicable</div>
        </div>

        <div className='flex flex-col gap-5 mt-7 w-full'>
          <div className='w-full text-start font-bold'>
            <div>ECCDE School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div className='flex cursor-pointer items-center gap-2'>
              {Array.from(classes.entries()).length === d.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div>Select All</div>
            </div>
            {d?.map((v, i) => (
              <div
                onClick={() => {
                  if (classes.has(i)) {
                    const s = new Set(classes);
                    s.delete(i);
                    setClasses(s);
                  } else {
                    const s = new Set(classes);
                    s.add(i);
                    setClasses(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-2'
              >
                {classes.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Primary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div className='flex cursor-pointer items-center gap-2'>
              {Array.from(classes1.entries()).length === d2.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div>Select All</div>
            </div>
            {d2?.map((v, i) => (
              <div
                onClick={() => {
                  if (classes1.has(i)) {
                    const s = new Set(classes1);
                    s.delete(i);
                    setClasses1(s);
                  } else {
                    const s = new Set(classes1);
                    s.add(i);
                    setClasses1(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-2'
              >
                {classes1.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Secondary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div className='flex cursor-pointer items-center gap-2'>
              {Array.from(classes2.entries()).length === d3.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div>Select All</div>
            </div>
            {d3?.map((v, i) => (
              <div
                onClick={() => {
                  if (classes2.has(i)) {
                    const s = new Set(classes2);
                    s.delete(i);
                    setClasses2(s);
                  } else {
                    const s = new Set(classes2);
                    s.add(i);
                    setClasses2(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-2'
              >
                {classes2.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Tertiary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div className='flex cursor-pointer items-center gap-2'>
              {Array.from(classes3.entries()).length === d4.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div>Select All</div>
            </div>
            {d4?.map((v, i) => (
              <div
                onClick={() => {
                  if (classes3.has(i)) {
                    const s = new Set(classes3);
                    s.delete(i);
                    setClasses3(s);
                  } else {
                    const s = new Set(classes3);
                    s.add(i);
                    setClasses3(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-2'
              >
                {classes3.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div>{v.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='h-8' />
        <div className='font-bold text-[#E5A500]'>Note</div>
        <div className='text-xs mt-2'>
          You would be required to add curriculum and lesson note for this
          subject in the subject settings
        </div>
        <Button className='px-20 text-xs mt-8'>Add Subject</Button>
      </div>
    </div>
  );
}
