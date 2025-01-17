import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import { getErrMsg } from '@/server';
import { useCreateCategory } from '@/server/institution/grade';
import { GradeCategory } from '@/types/institute';
import React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function EditGradeCategory({
  termId,
  state,
  sessionId,
  categories,
  institutionType,
}: {
  termId?: string;
  sessionId: string;
  institutionType?: string;
  categories?: GradeCategory[];
  state?: 'add' | 'edit' | 'view';
}) {
  const [items, setItems] = useState<GradeCategory[]>(categories ?? []);

  const { mutateAsync: createCategory } = useCreateCategory();

  const [isEditing, setIsEditing] = useState(
    state === 'edit' || state === 'add'
  );
  const { handleSubmit, setValue, control } = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (!sessionId || !termId) {
      toast.error('No current session for the chosen institute type');
      return;
    }
    try {
      await createCategory({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gradeCategory: (data.category as any[]).map((v, i) => ({
          categoryName: v,
          type: v,
          percentageScore: Number.parseInt(data.percentage[i]),
        })),
        institutionType,
        sessionId: sessionId,
        termId: termId,
      });
      toast.success('Grade categories created successfully');
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };

  const handleAddNewCategory = () => {
    setItems([...items, { categoryName: '', percentageScore: 0 }]);
  };

  const handleRemoveCategoryByIndex = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
  };

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setValue(`category.${i}`, it.categoryName);
      setValue(`percentage.${i}`, it.percentageScore, { shouldDirty: true });
    }
  }, [items, setValue]);

  return !isEditing ? (
    <div>
      <div className='bg-[#F4F9FF] font-bold p-4'>
        <div className='text-xl my-4'>Institution Type</div>
        <div className='text-center border-y py-5'>{institutionType}</div>
      </div>
      <div className='h-4' />
      <div className='flex flex-col gap-4 '>
        {items.map((v, i) => (
          <div key={i} className='flex p-4 border items-start rounded'>
            <div className='flex-1 '>
              <div className='text-[#A5A5A5]'>Category Name</div>
              <div>{v.categoryName}</div>
            </div>
            <div className='flex-1'>
              <div className='text-[#A5A5A5]'>Percentage</div>
              <div>{v.percentageScore}%</div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center mt-4'>
        <Button
          className='px-28'
          onClick={() => setIsEditing(true)}
          variant='outline'
        >
          Edit
        </Button>
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center'>
        <div className='font-bold text-3xl capitalize'>
          {state} Grade Category
        </div>
        <div>Kindly select the appropriate options below:</div>
      </div>
      <div className='w-full'>
        {items.map((v, i) => (
          <React.Fragment key={i}>
            <div className='flex items-end gap-3'>
              <Controller
                name={`category.${i}`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Category Name'
                      placeholder=''
                      formValue={field.value}
                      setFormValue={field.onChange}
                      containerClassName='w-full'
                      inputClassName='max-h-[10px]'
                    />
                  );
                }}
              />
              <Controller
                name={`percentage.${i}`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Enter percentage score'
                      placeholder=''
                      formValue={field.value}
                      setFormValue={field.onChange}
                      containerClassName='w-full'
                      inputClassName='max-h-[10px]'
                    />
                  );
                }}
              />
              <div className='bg-[#FFF8F8] text-red-500 p-4 rounded-full'>
                <BsTrashFill onClick={() => handleRemoveCategoryByIndex(i)} />
              </div>
            </div>

            <div className='my-6 h-[0.1px] bg-[#C3CAD9] w-10/12 mx-auto' />
          </React.Fragment>
        ))}
      </div>
      <div className='h-4' />
      <div className='flex'>
        <Button
          className='!text-[10px] !font-bold'
          variant='outline'
          onClick={handleAddNewCategory}
        >
          Add New Grade Category
        </Button>
      </div>
      <div className='flex w-full justify-center mt-10'>
        <Button
          type='submit'
          className='w-full max-w-[248px] !h-10 font-semibold !text-xs justify-center'
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
