/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { useCreateSubject, useUpdateSubject } from '@/server/institution';
import { useGetAllClasses } from '@/server/institution/class';
import { Label } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface AddSubjectViewProps {
  closeModal: () => void;
  subject: any;
}

export default function EditSubjectView({ closeModal, subject }: AddSubjectViewProps) {
  // const [processing, setProcessing] = useState(true);
  const institutionTypes: string[] = [];

  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      subject: subject?.name,
    },
  });

  const { mutateAsync } = useUpdateSubject();
  const [classes1, setClasses] = useState(new Set());
  const [classes2, setClasses1] = useState(new Set());
  const [classes3, setClasses2] = useState(new Set());
  const [classes4, setClasses3] = useState(new Set());

  const [d1, setD1] = useState<Label[]>([]);

  const [d2, setD2] = useState<Label[]>([]);

  const [d3, setD3] = useState<Label[]>([]);

  const [d4, setD4] = useState<Label[]>([]);

  const { data: classes } = useGetAllClasses();

  useEffect(() => {
    const m1: Label[] = [];
    const m2: Label[] = [];
    const m3: Label[] = [];
    const m4: Label[] = [];

    if (classes) {
      for (let i = 0; i < classes.length; i++) {
        const cl = classes[i];
        if (cl.institutionType?.toLocaleLowerCase()?.includes?.('eccde')) {
          m1.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('primary')
        ) {
          m2.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('secondary')
        ) {
          m3.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('tertiary')
        ) {
          m4.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        }
      }

      setD1(m1);
      setD2(m2);
      setD3(m3);
      setD4(m4);
    }
  }, [classes]);

  useEffect(() => {
    const s = new Set(classes1);
    const s1 = new Set(classes2);
    const s2 = new Set(classes3);
    const s3 = new Set(classes4);

    for (let i = 0; i < subject?.classes?.length; i++) {
      const cl = subject?.classes[i]?.class;

      if (cl.institutionType?.toLocaleLowerCase()?.includes?.('eccde')) {
        s.add(cl.id);
      } else if (
        cl.institutionType?.toLocaleLowerCase()?.includes?.('primary')
      ) {
        s1.add(cl.id);
      } else if (
        cl.institutionType?.toLocaleLowerCase()?.includes?.('secondary')
      ) {
        s2.add(cl.id);
      } else if (
        cl.institutionType?.toLocaleLowerCase()?.includes?.('tertiary')
      ) {
        s3.add(cl.id);
      }
    }

    setClasses(s);
    setClasses1(s1);
    setClasses2(s2);
    setClasses3(s3);

    // setTimeout(() => {
    //   setProcessing(false);
    // }, 5000);
  }, [subject?.classes]);

  const onSubmit = async (data: any) => {
    const ids: any[] = [];
    classes1.forEach((v) => ids.push(d1[v as number].id));
    classes2.forEach((v) => ids.push(d2[v as number].id));
    classes3.forEach((v) => ids.push(d3[v as number].id));
    classes4.forEach((v) => ids.push(d4[v as number].id));

    if (classes1.size > 0) {
      institutionTypes.push('ECCDE');
    }
    if (classes2.size > 0) {
      institutionTypes.push('PRIMARY');
    }
    if (classes3.size > 0) {
      institutionTypes.push('SECONDARY');
    }
    if (classes4.size > 0) {
      institutionTypes.push('TERTIARY');
    }

    const payload: any = {
      id: subject?.id,
    };

    if (ids.length !== 0) payload['classId'] = ids;
    if (data.subject) payload['name'] = data.subject;
    if (institutionTypes.length !== 0)
      payload['institutionTypes'] = institutionTypes;

    const response = await mutateAsync(payload);

    if (response) {
      toast.success('Subject updated successfully');
      closeModal();
    } else {
      toast.error('An error occurred');
    }
  };

  // if (processing) {
  //   return (
  //     <div className='flex mx-auto items-center justify-center'>
  //       <GenericLoader />
  //     </div>
  //   )
  // }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-screen items-center justify-center'
    >
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white p-10'>
        <div className='py-2 text-4xl font-bold'>Edit Subject</div>
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

          {/* <div className='w-full'>
            <BaseInput
              register={register}
              label={<span>Enter Description</span>}
              name='description'
            />
          </div> */}
        </div>

        <div className='h-2' />
        <div className='w-full text-start text-xs'>
          <div>Select classes applicable</div>
        </div>

        <div className='flex flex-col gap-5 mt-7 w-full'>
          <div className='w-full text-start font-bold'>
            <div>ECCDE School</div>
          </div>
          <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d1.length; i++) {
                  s.add(i);
                }
                setClasses(s);
              }}
              className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
            >
              {Array.from(classes1.entries()).length === d1.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div
                  style={{ height: '20px', width: '20px' }}
                  className='h-5 w-5 rounded-full border-2'
                >
                  <div>.</div>
                </div>
              )}
              <div className='col-span-2'>Select All</div>
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
                className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
              >
                {classes1.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div className='col-span-2'>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Primary School</div>
          </div>
          <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d2.length; i++) {
                  s.add(i);
                }
                setClasses1(s);
              }}
              className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
            >
              {Array.from(classes2.entries()).length === d2.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div className='col-span-2'>Select All</div>
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
                className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
              >
                {classes2.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div className='col-span-2'>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Secondary School</div>
          </div>
          <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d3.length; i++) {
                  s.add(i);
                }
                setClasses2(s);
              }}
              className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
            >
              {Array.from(classes3.entries()).length === d3.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div className='col-span-2'>Select All</div>
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
                className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
              >
                {classes3.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div className='col-span-2'>{v.value}</div>
              </div>
            ))}
          </div>

          <div className='w-full text-start font-bold'>
            <div>Tertiary School</div>
          </div>
          <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
            <div
              onClick={() => {
                const s = new Set(classes1);
                for (let i = 0; i < d4.length; i++) {
                  s.add(i);
                }
                setClasses3(s);
              }}
              className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
            >
              {Array.from(classes4.entries()).length === d4.length ? (
                <AiFillCheckCircle
                  className={clsxm('h-5 w-5 text-fun-green-500')}
                />
              ) : (
                <div className='h-5 w-5 rounded-full border-2' />
              )}
              <div className='col-span-2'>Select All</div>
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
                className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
              >
                {classes4.has(i) ? (
                  <AiFillCheckCircle
                    className={clsxm('h-5 w-5 text-fun-green-500')}
                  />
                ) : (
                  <div className='h-5 w-5 rounded-full border-2' />
                )}
                <div className='col-span-2'>{v.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='font-bold text-[#E5A500] mt-8'>Note</div>
        <div className='text-xs mt-2'>
          You would be required to add curriculum and lesson note for this
          subject in the subject settings
        </div>
        <Button type='submit' className='px-20 text-xs mt-8'>
          Edit Subject
        </Button>
      </div>
    </form>
  );
}
