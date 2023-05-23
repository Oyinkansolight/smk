'use client';

import BaseAccordion from '@/components/accordions/BaseAccordion';
import TextArea from '@/components/input/TextArea';
import Input from '@/components/input/formInput';
import ReactFormSelect from '@/components/input/formSelectReactForm';
import logger from '@/lib/logger';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';


const EditorComponent = () => {
  const [body] = useState('');

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(stateFromHTML(body))
  );

  const [convertedContent, setConvertedContent] = useState<string>('');
  logger(convertedContent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
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
  const { register, watch } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const format = watch('format');
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-bold my-4'>Create Class Activity</div>
      <div className='grid grid-cols-2 gap-2'>
        <ReactFormSelect
          register={register}
          name='type'
          label='Type of Activity'
          options={[]}
        />
        <ReactFormSelect
          register={register}
          name='format'
          label='Format'
          options={['Multiple Choice', 'Subjective']}
        />
        <ReactFormSelect
          register={register}
          name='dueDate'
          label='Due Date'
          options={[]}
        />
        <ReactFormSelect
          register={register}
          name='timeLimit'
          label='Time Limit'
          options={[]}
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
          <EditorComponent />
        </>
      )}
    </div>
  );
}