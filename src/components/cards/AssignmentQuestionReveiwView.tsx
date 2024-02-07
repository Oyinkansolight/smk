/* eslint-disable @typescript-eslint/no-explicit-any */
import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import { IoChevronBack } from 'react-icons/io5';

export default function AssignmentQuestionReviewView({
  setCurrentView,
  activity,
  answers,
  setAnswers,
  editor,
}: {
  setCurrentView: (v: number) => void;
  activity: any;
  answers: any;
  setAnswers: any;
  editor: any;
}) {
  return (
    <div>
      <div className='my-4 px-4 flex justify-start items-center'>
        <button
          className='bg-gray-200 rounded-md text-lg font-medium px-3 py-2 flex items-center space-x-2'
          onClick={() => {
            setCurrentView(0);
          }}
        >
          <IoChevronBack size={20} />
          <span>Back</span>
        </button>
      </div>
      {activity?.activity?.questionsV2?.map((item, idx) => (
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
            showAssessment
            studentAnswer={activity?.answers[idx]?.answerOption}
          />
        </div>
      ))}
    </div>
  );
}
