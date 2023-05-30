import BaseAccordion from '@/components/accordions/BaseAccordion';
import TextAreaWithOnChange from '@/components/input/TextAreaWithOnChange';
import Input from '@/components/input/formInput';
import { Option, Question } from '@/server/institution/lesson-note';

export default function MultiChoiceQuestion({
  value,
  onChange,
}: {
  value: Question;
  onChange: (value: Question) => void;
}) {
  const options: (keyof Option)[] = ['a', 'b', 'c', 'd'];
  return (
    <BaseAccordion
      title='Question 3'
      length={250}
      className='bg-[#EFF7F6] rounded-lg'
    >
      <div>
        <TextAreaWithOnChange
          value={value.question}
          onChange={(v) => {
            onChange({ options: value.options, question: v });
          }}
          label=''
          name='question'
          placeholder='Input question here'
        />
        <div className='h-4' />
        <div className='grid grid-cols-2 gap-5'>
          {Array(4)
            .fill(0)
            .map((v, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                label=''
                formValue={((value.options ?? [])[i] ?? [])[options[i]]}
                setFormValue={(v) => {
                  const newOpt: Option[] = [
                    ...(value.options ?? [
                      { a: '' },
                      { b: '' },
                      { c: '' },
                      { d: '' },
                    ]),
                  ];
                  newOpt[i][options[i]] = v as string;
                  onChange({ question: value.question, options: newOpt });
                }}
              />
            ))}
        </div>
      </div>
    </BaseAccordion>
  );
}
