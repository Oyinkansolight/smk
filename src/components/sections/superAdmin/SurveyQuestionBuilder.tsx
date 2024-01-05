/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  addQuestionBlock: () => void;
  removeQuestionBlock: (id: number) => void;
  handleQuestionBlockChangeBasic: (
    label: string,
    labelValue: any,
    description: string,
    descriptionValue: any,

    id: number
  ) => void;
  handleQuestionBlockChangeValidation: (
    isRequired: boolean,
    id: number
  ) => void;
  handleQuestionBlockChangeSelection: (
    type: string,
    typeValue: any,
    options: string[] | null,
    id: number
  ) => void;
  questionBlock: any[];
};

const Education = ({
  addQuestionBlock,
  questionBlock,
  removeQuestionBlock,
  handleQuestionBlockChangeBasic,
  handleQuestionBlockChangeSelection,
  handleQuestionBlockChangeValidation,
}: Iprops) => {
  const [settings, setSettings] = useState('basic');
  const [selectionType, setSelectionType] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const addOption = () => {
    setOptions([...options, '']);
  };
  const removeOption = (id: number) => {
    const updatedItems = options.filter((_, i) => i !== id);
    setOptions(updatedItems);
    toast.success('Record deleted');
  };
  const handleOptionChange = (value: any, id: number) => {
    const updatedItems = options.map((item, i) => {
      if (i === id) {
        item = value; // Update the item property
        return item;
      }
      return item;
    });
    setOptions(updatedItems);
  };
  return (
    <section className=''>
      {questionBlock.map((v: any, i: number) => (
        <div key={i} className='my-10 relative  items-center rounded-md'>
          <div className='flex  items-center'>
            <button
              className={`${
                settings === 'basic'
                  ? 'bg-gray-400  text-white'
                  : 'bg-white  text-black'
              } py-2 px-4 rounded-t`}
              onClick={() => {
                setSettings('basic');
              }}
            >
              Basic
            </button>
            <button
              onClick={() => {
                setSettings('selection');
              }}
              className={`${
                settings === 'selection'
                  ? 'bg-gray-400  text-white'
                  : 'bg-white  text-black'
              } py-2 px-4`}
            >
              Selection
            </button>
            <button
              onClick={() => {
                setSettings('validation');
              }}
              className={`${
                settings === 'validation'
                  ? 'bg-gray-400  text-white'
                  : 'bg-white  text-black'
              } py-2 px-4 rounded-t`}
            >
              Validation
            </button>
          </div>
          <div className='p-4 bg-white '>
            {settings === 'basic' && (
              <div>
                <div className='w-full'>
                  <label htmlFor='' className='text-xs font-bold'>
                    Title or label
                  </label>
                  <div className='mt-1 w-full border p-2 rounded'>
                    <input
                      type='text'
                      className='w-full border-none outline-none'
                      placeholder='Enter details here'
                      onChange={(e) => {
                        handleQuestionBlockChangeBasic(
                          'label',
                          e.target.value,
                          'description',
                          questionBlock[i].description,
                          i
                        );
                      }}
                    />
                  </div>
                </div>
                <div className='mt-4'>
                  <label htmlFor='' className='text-xs font-bold'>
                    Description
                  </label>
                  <div className='mt-1 w-full border p-2 rounded'>
                    <input
                      type='text'
                      className='w-full border-none outline-none'
                      placeholder='Enter details here'
                      onChange={(e) => {
                        handleQuestionBlockChangeBasic(
                          'label',
                          questionBlock[i].label,
                          'description',
                          e.target.value,
                          i
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {settings === 'selection' && (
              <div className='space-y-3'>
                <label htmlFor='' className='text-xs font-bold'>
                  Choose a type of selection option{' '}
                </label>
                <div className='border rounded bg-transparent px-2 py-1'>
                  <select
                    name='selection'
                    id=''
                    className='outline-none border-none w-full !focus:border-none'
                    onChange={(e) => {
                      setSelectionType(e.target.value);
                    }}
                  >
                    <option value='dropdown'>
                      Single Selection(single answer)
                    </option>
                    <option value='checkbox'>
                      Multiple Selection(multiple answers)
                    </option>
                  </select>
                </div>
                {options?.map((v: string, idx: number) => (
                  <div key={idx}>
                    <div className=' flex justify-between items-center space-x-2 w-full'>
                      <input
                        type='text'
                        className='w-full border-none outline-none'
                        placeholder='Enter your option'
                        onChange={(e) => {
                          handleOptionChange(e.target.value, idx);
                        }}
                      />
                      <button className='bg-gray-500 font-bold  rounded-full h-6 w-6 grid place-content-center  p-2'>
                        <GrClose
                          onClick={() => removeOption(idx)}
                          className='text-white'
                        />
                      </button>
                    </div>
                  </div>
                ))}

                <div className='flex justify-between items-center'>
                  {options.length > 0 && (
                    <Button
                      variant='primary'
                      onClickHandler={() => {
                        handleQuestionBlockChangeSelection(
                          'type',
                          selectionType,
                          options,
                          i
                        );
                        if (options.length > 0) {
                          toast.success('Option(s) Saved');
                        }
                      }}
                    >
                      <BiSave /> Save
                    </Button>
                  )}
                  <Button variant='secondary' onClickHandler={addOption}>
                    {options.length === 0 ? 'Add option' : '+ Add Another'}
                  </Button>
                </div>
              </div>
            )}
            {settings === 'validation' && (
              <div>
                <label htmlFor='' className='text-xs font-bold'>
                  Is this question is a required field to be answered?
                </label>
                <div className='border rounded bg-transparent py-1 px-2 mt-2'>
                  <select
                    name='selection'
                    id=''
                    className='outline-none border-none w-full !focus:border-none'
                    onChange={(e) => {
                      handleQuestionBlockChangeValidation(
                        e.target.value === 'Yes' ? true : false,
                        i
                      );
                    }}
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className='absolute -top-1 -right-2 pt-4'>
            <button
              type='button'
              onClick={() => {
                removeQuestionBlock(i);
              }}
              className='bg-red-500 rounded-full h-8 w-8 grid place-content-center  p-2'
            >
              <RiDeleteBin6Line size={16} className='text-white' />{' '}
            </button>
          </div>
        </div>
      ))}
      <div className='w-full flex justify-center items-center'>
        <button
          type='button'
          onClick={() => {
            addQuestionBlock();
            console.log(questionBlock);
          }}
          className='mt-4 bg-blue-500 rounded-full h-10 w-10 grid place-content-center  p-2'
        >
          <BsPlus size={28} className='text-white font-bold' />
        </button>
      </div>
    </section>
  );
};

export default Education;
