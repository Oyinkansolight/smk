'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { useCreateSubject } from '@/server/institution';
import { Label } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface AddSubjectViewProps {
  closeModal: () => void;
}

export default function AddSubjectView({ closeModal }: AddSubjectViewProps) {
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const { mutateAsync } = useCreateSubject();
  const [classes1, setClasses] = useState(new Set());
  const [classes2, setClasses1] = useState(new Set());
  const [classes3, setClasses2] = useState(new Set());
  const [classes4, setClasses3] = useState(new Set());

  const d1: Label[] = [
    { id: 0, value: 'Daycare' },
    { id: 1, value: 'ECCDE 1' },
    { id: 2, value: 'ECCDE 2' },
  ];

  const d2: Label[] = [
    { id: 3, value: 'Primary 1' },
    { id: 4, value: 'Primary 2' },
    { id: 5, value: 'Primary 3' },
    { id: 6, value: 'Primary 4' },
    { id: 7, value: 'Primary 5' },
    { id: 8, value: 'Primary 6' },
  ];

  const d3: Label[] = [
    { id: 9, value: 'JSS 1' },
    { id: 10, value: 'JSS 2' },
    { id: 11, value: 'JSS 3' },
    { id: 12, value: 'SSC 4' },
    { id: 13, value: 'SSC 5' },
    { id: 14, value: 'SSC 6' },
  ];

  const d4: Label[] = [{ id: 'ex', value: 'Example' }];

  const onSubmit = async (data: any) => {
    const ids: any[] = [];
    classes1.forEach((v) => ids.push(d1[v as number].id));
    classes2.forEach((v) => ids.push(d2[v as number].id));
    classes3.forEach((v) => ids.push(d3[v as number].id));
    classes4.forEach((v) => ids.push(d4[v as number].id));
    const response = await mutateAsync({
      classId: ids,
      name: data.subject,
      description: data.description,
    });

    if (response) {
      toast.success('Subject added successfully');
      closeModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-screen items-center justify-center'
    >
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white p-10'>
        <div className='py-2 text-4xl font-bold'>Add New Subject</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-10 w-full'>
          <div className='w-full'>
            <div className='w-full max-w-xs'>
              <BaseInput
                register={register}
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
              register={register}
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
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d1.length; i++) {
                  s.add(i);
                }
                setClasses(s);
              }}
              className='flex cursor-pointer items-center gap-2'
            >
              {Array.from(classes1.entries()).length === d1.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div>Select All</div>
            </div>
            {d1?.map((v, i) => (
              <div
                onClick={() => {
                  if (classes1.has(i)) {
                    const s = new Set(classes1);
                    s.delete(i);
                    setClasses(s);
                  } else {
                    const s = new Set(classes1);
                    s.add(i);
                    setClasses(s);
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
            <div>Primary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d2.length; i++) {
                  s.add(i);
                }
                setClasses1(s);
              }}
              className='flex cursor-pointer items-center gap-2'
            >
              {Array.from(classes2.entries()).length === d2.length ? (
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
                  if (classes2.has(i)) {
                    const s = new Set(classes2);
                    s.delete(i);
                    setClasses1(s);
                  } else {
                    const s = new Set(classes2);
                    s.add(i);
                    setClasses1(s);
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
            <div>Secondary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d3.length; i++) {
                  s.add(i);
                }
                setClasses2(s);
              }}
              className='flex cursor-pointer items-center gap-2'
            >
              {Array.from(classes3.entries()).length === d3.length ? (
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
                  if (classes3.has(i)) {
                    const s = new Set(classes3);
                    s.delete(i);
                    setClasses2(s);
                  } else {
                    const s = new Set(classes3);
                    s.add(i);
                    setClasses2(s);
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

          <div className='w-full text-start font-bold'>
            <div>Tertiary School</div>
          </div>
          <div className='grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d4.length; i++) {
                  s.add(i);
                }
                setClasses3(s);
              }}
              className='flex cursor-pointer items-center gap-2'
            >
              {Array.from(classes4.entries()).length === d4.length ? (
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
                  if (classes4.has(i)) {
                    const s = new Set(classes4);
                    s.delete(i);
                    setClasses3(s);
                  } else {
                    const s = new Set(classes4);
                    s.add(i);
                    setClasses3(s);
                  }
                }}
                key={i}
                className='flex cursor-pointer items-center gap-2'
              >
                {classes4.has(i) ? (
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
        <Button type='submit' className='px-20 text-xs mt-8'>
          Add Subject
        </Button>
      </div>
    </form>
  );
}
