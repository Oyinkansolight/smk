/* eslint-disable @typescript-eslint/no-explicit-any */
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import TaskTimer from '@/components/counter/TaskTimer';
import { extractMinutesFromString } from '@/lib/helper';
import { BsPlay } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { IoChevronBack } from 'react-icons/io5';

export default function AssignmentQuestionPracticeView({
  setCurrentView,
  activity,
  startActivity,
  setStartActivity,
  answers,
  setAnswers,
  editor,
  handleSubmitTask,
  loadingSubmission,
}) {
  return (
    <div>
      <div>
        <div className='my-4 px-4 flex justify-between items-center'>
          <button
            className='bg-gray-200 rounded-md text-lg font-medium px-3 py-2 flex items-center space-x-2'
            onClick={() => {
              setCurrentView(0);
            }}
          >
            <IoChevronBack size={20} />
            <span>Back</span>
          </button>
          {!startActivity && (
            <button
              className='bg-green-500 rounded-md text-lg text-white font-medium px-3 py-2 flex items-center space-x-2'
              onClick={() => {
                setStartActivity(!startActivity);
              }}
            >
              <BsPlay size={20} />
              <span>Start</span>
            </button>
          )}
          {startActivity && (
            <TaskTimer
              timeLimit={
                Number(
                  extractMinutesFromString(
                    activity?.activity?.timeLimit ?? '30 Mins'
                  )
                ) * 60000
              }
            />
          )}
          {/* MULTIPLE_CHOICE */}
        </div>
        {startActivity && (
          <div>
            {activity?.questionsV2?.map((item, idx) => (
              <div key={idx}>
                <AssignmentQuestionView
                  question={item.question}
                  options={item.options}
                  correctOption={item.correctOption}
                  answers={answers}
                  setAnswers={setAnswers}
                  qId={item.id}
                  format={activity.format}
                  editor={editor}
                />
              </div>
            ))}
            <button
              onClick={() => {
                handleSubmitTask();
              }}
              className='my-5 w-max mx-auto flex items-center rounded border border-secondary px-6 py-3 text-center text-xs font-medium text-secondary '
            >
              {loadingSubmission ? (
                <ImSpinner2 className='animate-spin' />
              ) : (
                ' Submit Activity'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
