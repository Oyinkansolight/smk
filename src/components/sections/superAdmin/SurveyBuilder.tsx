/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { useCreateSurvey } from '@/server/government/communication';
import React, { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

import SurveyQuestionBuilder from './SurveyQuestionBuilder';

const SurveyBuilder = ({ closeModal }: { closeModal?: () => void }) => {
  const [query, setQuery] = useState('');
  const [surveyName, setSurveyName] = useState('');
  const [loading, setLoading] = useState(false);
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
        isRequired: true,
        question: '',
        description: '',
        label: '',
        type: 'DROPDOWN',
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
          ['question']: labelValue,
          [description]: descriptionValue,
        }; // Update the label property
      }
      return item;
    });
    setQuestionBlock(updatedItems);
  };

  const handleQuestionBlockChangeSelection = (
    type: string,
    typeValue: string,
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

  const { mutateAsync } = useCreateSurvey();

  const handleCreateSurvey = async () => {
    const payload = {
      surveyName,
      questions: questionBlock,
    };
    setLoading(true);
    try {
      const response = await mutateAsync(payload);
      if (response) {
        toast.success('Survey Created Successfully');
        setLoading(false);
        closeModal && closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-6 bg-gray-100 p-2 rounded'>
        <div className='mt-2 flex justify-between'>
          <div className='h2'>Survey Builder</div>

          <Button
            variant='secondary'
            onClickHandler={() => {
              handleCreateSurvey();
              // console.log(questionBlock);
            }}
          >
            {loading ? <ImSpinner2 /> : 'Submit Form'}
          </Button>
        </div>

        <div className='my-1 w-full  p-2  text-left'>
          <label htmlFor='survey_name' className='text-sm font-bold text-left'>
            Survey Name
          </label>
          <input
            id='survey_name'
            type='text'
            className='w-full border-none outline-none'
            placeholder='Enter details here'
            onChange={(e) => {
              setSurveyName(e.target.value);
            }}
          />
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
