import Button from '@/components/buttons/Button';
import Input from '@/components/input/formInput';
import React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';

export default function EditGradeCategory({ isEdit }: { isEdit?: boolean }) {
  const [items, setItems] = useState<
    { category: string; percentage: number }[]
  >([
    {
      category: 'CA 1',
      percentage: 60,
    },
    {
      category: 'CA 2',
      percentage: 60,
    },
    {
      category: 'Examination',
      percentage: 60,
    },
  ]);
  const [isEditing, setIsEditing] = useState(isEdit ?? false);
  const { handleSubmit, setValue, control } = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const newI = [...items];
    for (let i = 0; i < items.length; i++) {
      newI[i] = {
        category: data[`category.${i}`],
        percentage: data[`percentage.${i}`],
      };
    }
    setItems(newI);
  };

  const handleAddNewCategory = () => {
    setItems([...items, { category: '', percentage: 0 }]);
  };

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setValue(`category.${i}`, it.category);
      setValue(`percentage.${i}`, it.percentage, { shouldDirty: true });
    }
  }, [items, setValue]);

  return !isEditing ? (
    <div>
      <div className='bg-[#F4F9FF] font-bold p-4'>
        <div className='text-xl my-4'>Institution Type</div>
        <div className='text-center border-y py-5'>Primary</div>
      </div>
      <div className='h-4' />
      <div className='flex flex-col gap-4 '>
        {items.map((v, i) => (
          <div key={i} className='flex p-4 border items-start rounded'>
            <div className='flex-1 '>
              <div className='text-[#A5A5A5]'>Category Name</div>
              <div>{v.category}</div>
            </div>
            <div className='flex-1'>
              <div className='text-[#A5A5A5]'>Percentage</div>
              <div>{v.category}%</div>
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
        <div className='font-bold text-3xl'>Edit Grade Category</div>
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
                      {...field}
                      containerClassName='w-full'
                      inputClassName="max-h-[10px]"
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
                      {...field}
                      containerClassName='w-full'
                      inputClassName="max-h-[10px]"
                    />
                  );
                }}
              />
              <div className='bg-[#FFF8F8] text-red-500 p-4 rounded-full'>
                <BsTrashFill />
              </div>
            </div>


            <div className='my-6 h-[0.1px] bg-[#C3CAD9] w-10/12 mx-auto' />
          </React.Fragment>
        ))}
      </div>
      <div className='h-4' />
      <div className='flex'>
        <Button className='!text-[10px] !font-bold' variant='outline' onClick={handleAddNewCategory}>
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
