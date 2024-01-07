'use client';

import Button from '@/components/buttons/Button';
import SuccessModal from '@/components/modal/Success';
import {
  useCreateSurveySubmission,
  useGetSingleSurveyQuestion,
} from '@/server/government/communication';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useGeoLocation } from 'use-geo-location';

const SurveyQuestion = () => {
  const [SurveyQuestions, setSurveyQuestions] = useState<any>([]);
  const surveyId = '8478579e-5085-497a-be63-e9852c96b6c8';
  const { data: surveys, isLoading: surveysLoading } =
    useGetSingleSurveyQuestion(surveyId);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { latitude, longitude } = useGeoLocation();
  const [surveyAnswers, setSurveyAnswers] = useState<any>([]);

  useEffect(() => {
    if (surveys && !surveysLoading) {
      const groupedArray = surveys.reduce((acc, obj) => {
        const group = obj.group;
        if (!acc[group]) {
          acc[group] = { name: group, questions: [] };
        }
        acc[group].questions.push(obj);
        return acc;
      }, {});

      const resultArray = Object.values(groupedArray);

      console.log(resultArray);
      setSurveyQuestions(resultArray);
    }
  }, [surveys, surveysLoading]);

  const handleSurveyAnswer = (qId: string, qAns, answerType) => {
    // const previousAnswer = [...surveyAnswers];
    let isExist = false;

    surveyAnswers.map((v) => {
      if (v.questionId === qId) isExist = true;
    });
    if (!isExist) {
      const newAnswer = {
        questionId: qId,
        [answerType]: qAns,
      };
      setSurveyAnswers([...surveyAnswers, newAnswer]);
    } else {
      const updatedAnswers = surveyAnswers.filter((v) => v.questionId !== qId);
      const newAnswer = {
        questionId: qId,
        [answerType]: qAns,
      };
      setSurveyAnswers([...updatedAnswers, newAnswer]);
    }
  };

  const handleCheckBoxAnswer = (qId, option) => {
    console.log(option);
  };

  const { mutateAsync } = useCreateSurveySubmission();
  const handleCreateSurveySubmission = async () => {
    if (surveyAnswers.length === 0) {
      toast.error('Form not field yet');
      return;
    }
    const payload = {
      surveyId,
      answers: surveyAnswers,
    };
    setLoading(true);
    try {
      const response = await mutateAsync(payload);
      if (response) {
        toast.success('Survey Submitted Successfully');
        setLoading(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className='-ml-2 py-6'>
      {isModalOpen && (
        <SuccessModal
          title='Survey Submitted Successfully'
          description='Survey Record Submitted Successfully'
          link='/super-admin'
          textLink='Return Home'
          homeLink='/super-admin'
        />
      )}
      <div className='py-4 px-4'>
        <h1 className='text-center text-xl'>
          Directorate of Educational Quality and Accountability-School
          Resumption Monitoring Checklist for Evaluators
        </h1>
      </div>

      {surveysLoading ? (
        <div className='flex justify-center items-center'>
          <RotatingLines
            width='100'
            visible={true}
            strokeWidth='5'
            strokeColor='#4fa94d'
            animationDuration='0.75'
          />
        </div>
      ) : (
        <div className='space-y-4 max-w-[700px] mx-auto'>
          {SurveyQuestions.map((item: any, idx: number) => (
            <div key={idx}>
              <div className='bg-green-500 text-white p-2 rounded-md mb-3'>
                <h2 className='text-lg font-medium uppercase'> {item?.name}</h2>
              </div>
              {item.questions.map((q, qid) => (
                <div key={qid} className='rounded bg-white p-2 mb-3'>
                  <div className='flex space-x-2 items-start text-lg '>
                    <div>{qid + 1}.</div>
                    <div className='mb-1'>
                      {q.question}{' '}
                      {`${q.description ? `(${q.description})` : ''}`}
                    </div>
                  </div>
                  <div className='w-full text-lg '>
                    <div
                      className={`${
                        q.type == 'RADIO' &&
                        ' border-2 rounded-md bg-gray-100 w-full flex-1'
                      }`}
                    >
                      {q.type == 'RADIO' && (
                        <select
                          name=''
                          id=''
                          className='outline-none border-none w-full bg-transparent !ring-0 text-sm'
                          onChange={(e) => {
                            handleSurveyAnswer(
                              q.id,
                              e.target.value,
                              'radioAnswer'
                            );
                          }}
                        >
                          <option value=''>--Choose Option--</option>
                          {q.options.map((op, OpId) => (
                            <option value={op} key={OpId}>
                              {op}{' '}
                            </option>
                          ))}
                        </select>
                      )}
                      {q.type == 'TEXT' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='text'
                            className='w-full  outline-none border-none text-sm !ring-0'
                            placeholder='Enter details here'
                            onChange={(e) => {
                              handleSurveyAnswer(
                                q.id,
                                e.target.value,
                                'textAnswer'
                              );
                            }}
                          />
                        </div>
                      )}
                      {q.type == 'DATE' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='date'
                            className='w-full border-none outline-none text-sm !ring-0'
                            placeholder='Enter details here'
                            onChange={(e) => {
                              handleSurveyAnswer(
                                q.id,
                                e.target.value,
                                'dateAnswer'
                              );
                            }}
                          />
                        </div>
                      )}
                      {q.type == 'IMAGE' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='file'
                            className='w-full border-none outline-none text-sm !ring-0'
                            placeholder='Enter details here'
                            onChange={(e) => {
                              handleSurveyAnswer(
                                q.id,
                                e.target.value,
                                'radioAnswer'
                              );
                            }}
                          />
                        </div>
                      )}
                      {q.type == 'NUMERIC' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='number'
                            className='w-full  outline-none border-none text-sm !ring-0'
                            placeholder='Enter details here'
                            onChange={(e) => {
                              handleSurveyAnswer(
                                q.id,
                                e.target.value,
                                'textAnswer'
                              );
                            }}
                          />
                        </div>
                      )}
                      {q.type == 'CHECKBOX' && (
                        <div>
                          {q.options.map((op, OpId) => (
                            <div
                              className='flex space-x-2 items-center'
                              key={OpId}
                            >
                              <input
                                type='checkbox'
                                className='text-sm '
                                placeholder='Enter details here'
                              />
                              <label htmlFor='' className='text-sm'>
                                {op}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                      {q.type == 'GEOLOCATION' && (
                        <div>
                          <div className='flex space-x-2 items-center py-2'>
                            <div>Lat: {latitude}</div>
                            <div>Long: {longitude}</div>
                            <Button
                              variant='secondary'
                              onClickHandler={() => {
                                toast.success('Geolocation Saved');
                                handleSurveyAnswer(
                                  q.id,
                                  {
                                    latitude,
                                    longitude,
                                  },
                                  'geolocationAnswer'
                                );
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className='w-full flex justify-end'>
            <Button
              variant='secondary'
              onClickHandler={() => {
                console.log(surveyAnswers);
                handleCreateSurveySubmission();
              }}
              className='w-[200px] flex justify-center'
            >
              {loading ? <ImSpinner /> : 'Submit'}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SurveyQuestion;
