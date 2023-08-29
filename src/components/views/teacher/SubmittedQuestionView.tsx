import { SubmittedQuestion } from '@/server/institution/lesson-note';

export default function SubmittedQuestionView({
  index,
  question,
}: {
  index: number;
  question: SubmittedQuestion;
}) {
  return (
    <div>
      <div className='flex font-bold gap-3'>
        <div>{index + 1}.</div>
        <div>{question.question}</div>
      </div>
      <div className='grid grid-cols-2'>
        {(question?.options ?? question.options ?? [])
          ?.filter((q) => !q.answer)
          .map((v, i) => (
            <div key={i} className='flex gap-4'>
              <div>{Object.keys(v)[0]}.</div>
              <div>{v[Object.keys(v)[0]]}</div>
            </div>
          ))}
      </div>
      <div>
        <div className='font-bold'>Answer</div>
        <div>
          {
            (question?.options ?? question.options ?? [])?.filter(
              (q) => q.answer
            )[0].answer
          }
        </div>
      </div>
    </div>
  );
}
