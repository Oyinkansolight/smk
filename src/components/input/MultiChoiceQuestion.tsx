import BaseAccordion from '@/components/accordions/BaseAccordion';
import TextAreaWithOnChange from '@/components/input/TextAreaWithOnChange';
import Input from '@/components/input/formInput';
import { Question } from '@/server/institution/lesson-note';
import _ from 'lodash';
import ReactSelect from 'react-select';

export default function MultiChoiceQuestion({
  value,
  onChange,
}: {
  value: Question;
  onChange: (value: Question) => void;
}) {
  const isEmpty = _.isEmpty(value.options?.filter((item) => item.length > 0));

  return (
    <BaseAccordion
      title='Question'
      length={300}
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
                formValue={
                  ((value.options ?? [])[i] ?? [])[(value?.options ?? [])[i]]
                }
                setFormValue={(v) => {
                  const newOpt: string[] = [
                    ...(value.options ?? ['', '', '', '']),
                  ];
                  newOpt[i] = v as string;
                  onChange({ ...value, options: newOpt });
                }}
              />
            ))}
        </div>
        {value.options && !isEmpty && (
          <div className='flex items-center justify-between pt-4'>
            <div className='font-bold text-[#746D69]'>Select An Answer</div>
            <ReactSelect
              className='min-w-[20rem]'
              value={{
                value: value.correctOption ?? 0,
                label: (value.options ?? [])[value.correctOption ?? 0],
              }}
              onChange={(opt) => {
                const index = value.options?.findIndex((v) => v === opt?.label);

                if (index === null || index === undefined || index === -1)
                  return;

                onChange({ ...value, correctOption: index });
              }}
              options={value.options
                .filter((item) => item.length > 0)
                .map((v, idx) => ({ label: v, value: idx }))}
            />
          </div>
        )}
      </div>
    </BaseAccordion>
  );
}
