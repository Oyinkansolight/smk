'use client';

import { useGetSingleSurveyQuestion } from '@/server/government/communication';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const SurveyQuestion = () => {
  const [SurveyQuestions, setSurveyQuestions] = useState<any>([]);
  const { data: surveys, isLoading: surveysLoading } =
    useGetSingleSurveyQuestion('e24dbfe2-4cdc-4e66-a2f2-f78720d3594a');

  console.log(surveys);
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

      console.log(resultArray.reverse());
      setSurveyQuestions(resultArray);
    }
  }, [surveys, surveysLoading]);

  // const [allnotification, setallnotification] = useState();

  return (
    <section className='-ml-2 py-6'>
      <div className='py-4 px-4 border-b flex justify-between items-center'>
        <h1>
          Directorate of Educational Quality and Accountability-School
          Resumption Monitoring Checklist for Evaluators
        </h1>
        <h1 className='text-2xl font-bold'>Fill A Survey</h1>
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
        <div className='space-y-4 max-w-[700px]'>
          {SurveyQuestions.map((item: any, idx: number) => (
            <div key={idx}>
              <div className='bg-green-500 text-white p-2 rounded-md mb-3'>
                <h2 className='text-lg font-medium '> {item?.name}</h2>
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
                          />
                        </div>
                      )}
                      {q.type == 'DATE' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='date'
                            className='w-full border-none outline-none text-sm !ring-0'
                            placeholder='Enter details here'
                          />
                        </div>
                      )}
                      {q.type == 'NUMERIC' && (
                        <div className='border-b border-dashed w-full'>
                          <input
                            type='number'
                            className='w-full  outline-none border-none text-sm !ring-0'
                            placeholder='Enter details here'
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
                                {op}{' '}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SurveyQuestion;
