/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import SurveyQuestionBuilder from './SurveyQuestionBuilder';

const SurveyBuilder = () => {
  const [query, setQuery] = useState('');
  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
    include: 'false',
  });
  const [questionBlock, setQuestionBlock] = useState<
    {
      isRequired: boolean;
      question: string;
      description: string;
      label: string;
      type: string;
      options: string[] | null;
    }[]
  >([]);

  const addQuestionBlock = () => {
    setQuestionBlock([
      ...questionBlock,
      {
        isRequired: false,
        question: '',
        description: '',
        label: '',
        type: '',
        options: null,
      },
    ]);
  };

  const removeQuestionBlock = (id: number) => {
    const updatedItems = questionBlock.filter((_, i) => i !== id);
    setQuestionBlock(updatedItems);
    toast.success('Record deleted');
  };
  const handleQuestionBlockChangeBasic = (
    label: string,
    labelValue: any,
    description: string,
    descriptionValue: any,

    id: number
  ) => {
    const updatedItems = questionBlock.map((item, i) => {
      if (i === id) {
        return {
          ...item,
          [label]: labelValue,
          [description]: descriptionValue,
        }; // Update the label property
      }
      return item;
    });
    setQuestionBlock(updatedItems);
  };

  const handleQuestionBlockChangeSelection = (
    type: string,
    typeValue: any,
    options: string[] | null,
    id: number
  ) => {
    const updatedItems = questionBlock.map((item, i) => {
      if (i === id) {
        return {
          ...item,
          [type]: typeValue,
          options,
        }; // Update the label property
      }
      return item;
    });
    setQuestionBlock(updatedItems);
  };
  const handleQuestionBlockChangeValidation = (
    isRequired: boolean,
    id: number
  ) => {
    const updatedItems = questionBlock.map((item, i) => {
      if (i === id) {
        return {
          ...item,
          isRequired,
        }; // Update the label property
      }
      return item;
    });
    setQuestionBlock(updatedItems);
  };

  return (
    <>
      <div className='flex flex-col gap-6 max-w-[700px] mx-auto'>
        <div className='mt-2 flex flex-col gap-2 mx-auto text-center justify-center'>
          <div className='h2'>Survey Builder</div>
        </div>

        <SurveyQuestionBuilder
          removeQuestionBlock={removeQuestionBlock}
          addQuestionBlock={addQuestionBlock}
          questionBlock={questionBlock}
          handleQuestionBlockChangeBasic={handleQuestionBlockChangeBasic}
          handleQuestionBlockChangeValidation={
            handleQuestionBlockChangeValidation
          }
          handleQuestionBlockChangeSelection={
            handleQuestionBlockChangeSelection
          }
        />
      </div>
    </>
  );
};

export default SurveyBuilder;
