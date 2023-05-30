'use client';

import Button from '@/components/buttons/Button';
import MultiChoiceQuestion from '@/components/input/MultiChoiceQuestion';
import InputReactForm from '@/components/input/formReactInput';
import ReactFormSelect from '@/components/input/formSelectReactForm';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { Question, useCreateClassActivity } from '@/server/institution/lesson-note';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



const activityTypes = [
  { key: 'ASSIGNMENT', value: 'Assignment' },
  { key: 'CLASS_WORK', value: 'Class Work' },
  { key: 'POP_QUIZ', value: 'Pop Quiz' },
];

const activityFormats = [
  { key: 'MULTIPLECHOICE', value: 'Multiple Choice' },
  { key: 'SUBJECTIVE', value: 'Subjective' },
];

const EditorComponent = ({
  onChange,
}: {
  onChange?: (value: string) => void;
}) => {
  const [body] = useState('');

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(stateFromHTML(body))
  );

  const [convertedContent, setConvertedContent] = useState<string>('');
  logger(convertedContent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (state: any) => {
    setEditorState(state);
    const h = convertToHTML((state as EditorState).getCurrentContent());
    setConvertedContent(h);
    if (onChange) onChange(h);
  };

  // function handleSubmit(): void {
  //   logger(convertedContent);
  // }

  return (
    <div className='pb-20'>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        editorStyle={{ border: '1px solid', width: 'full', height: '20rem' }}
        toolbar={{
          fontFamily: { options: [''] },
        }}
      />
    </div>
  );
};

export default function CreateClassActivityView() {
  const { register, watch, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const format = watch('format');
  const [body, setBody] = useState('[NO_BODY]');
  const create = useCreateClassActivity();
  const [questions, setQuestions] = useState<Question[]>([{}, {}, {}]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const type = activityTypes.find(
        (v) => v.value === data.typeOfActivity
      )?.key;
      const form = activityFormats.find((v) => v.value === data.format)?.key;
      const res = await create.mutateAsync({
        ...data,
        typeOfActivity: type,
        format: form,
        questions,
        classes: 1,
        lessonNote: 1,
        subject: 1,
      });
      toast.success(res.data.data.message);
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl font-bold my-4'>Create Class Activity</div>
        <div className='grid grid-cols-2 gap-2'>
          <ReactFormSelect
            register={register}
            name='typeOfActivity'
            label='Type of Activity'
            options={activityTypes.map((v) => v.value)}
          />
          <ReactFormSelect
            register={register}
            name='format'
            label='Format'
            options={activityFormats.map((v) => v.value)}
          />
          <InputReactForm
            register={register}
            name='dueDate'
            label='Due Date'
            placeholder='Due date'
            type='date'
          />
          <ReactFormSelect
            register={register}
            name='timeLimit'
            label='Time Limit'
            options={['30 Mins', '1 Hour', '2 Hours']}
          />
        </div>
        {format === 'Multiple Choice' && (
          <>
            {questions.map((v, i) => (
              <MultiChoiceQuestion
                key={i}
                value={questions[i]}
                onChange={(v) => {
                  const newQ = [...questions];
                  newQ[i] = v;
                  setQuestions(newQ);
                }}
              />
            ))}
          </>
        )}
        {format === 'Subjective' && (
          <>
            <div className='font-bold'>Type Your Question Here</div>
            <EditorComponent onChange={setBody} />
          </>
        )}
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
}