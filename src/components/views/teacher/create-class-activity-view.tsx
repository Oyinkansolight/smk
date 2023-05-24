'use client';

import BaseAccordion from '@/components/accordions/BaseAccordion';
import Button from '@/components/buttons/Button';
import TextArea from '@/components/input/TextArea';
import Input from '@/components/input/formInput';
import InputReactForm from '@/components/input/formReactInput';
import ReactFormSelect from '@/components/input/formSelectReactForm';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import {
  useCreateAssignment,
  useCreateClasswork,
  useCreateQuiz,
} from '@/server/institution/lesson-note';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
  const [body, setBody] = useState('');
  const createQuiz = useCreateQuiz();
  const createAssignment = useCreateAssignment();
  const createClasswork = useCreateClasswork();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const type = data.type;
      if (type === 'Assignment') {
        await createAssignment.mutateAsync({
          body,
          subject: 1,
          title: '',
          lessonNote: 1,
          classes: 1,
          dueDate: data.dueDate,
        });
      }
      if (type === 'Class Work') {
        await createClasswork.mutateAsync({
          body,
          subject: 1,
          title: '',
          lessonNote: 1,
          classes: 1,
        });
      }
      if (type === 'Pop Quiz') {
        await createQuiz.mutateAsync({
          body,
          subject: 1,
          title: '',
          lessonNote: 1,
          classes: 1,
        });
      }
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
            name='type'
            label='Type of Activity'
            options={['Assignment', 'Class Work', 'Pop Quiz']}
          />
          <ReactFormSelect
            register={register}
            name='format'
            label='Format'
            options={['Multiple Choice', 'Subjective']}
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
            <BaseAccordion
              title='Question 1'
              length={250}
              className='bg-[#EFF7F6] rounded-lg'
            >
              <div>
                <TextArea
                  label=''
                  name='question'
                  placeholder='Input question here'
                />
                <div className='h-4' />
                <div className='grid grid-cols-2 gap-5'>
                  {Array(4)
                    .fill(0)
                    .map((v, i) => (
                      <Input key={i} label='' placeholder={`Option ${i + 1}`} />
                    ))}
                </div>
              </div>
            </BaseAccordion>
            <BaseAccordion
              title='Question 2'
              length={250}
              className='bg-[#EFF7F6] rounded-lg'
            >
              <div>
                <TextArea
                  label=''
                  name='question'
                  placeholder='Input question here'
                />
                <div className='h-4' />
                <div className='grid grid-cols-2 gap-5'>
                  {Array(4)
                    .fill(0)
                    .map((v, i) => (
                      <Input key={i} label='' placeholder={`Option ${i + 1}`} />
                    ))}
                </div>
              </div>
            </BaseAccordion>
            <BaseAccordion
              title='Question 3'
              length={250}
              className='bg-[#EFF7F6] rounded-lg'
            >
              <div>
                <TextArea
                  label=''
                  name='question'
                  placeholder='Input question here'
                />
                <div className='h-4' />
                <div className='grid grid-cols-2 gap-5'>
                  {Array(4)
                    .fill(0)
                    .map((v, i) => (
                      <Input key={i} label='' placeholder={`Option ${i + 1}`} />
                    ))}
                </div>
              </div>
            </BaseAccordion>
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