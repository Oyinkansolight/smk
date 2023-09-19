/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import CustomRichTextEditor from '@/components/input/TextEditor/CustomRichTextEditor';
import useCustomEditor from '@/hooks/useEditor';
import React, { useState } from 'react';

const EditorComponent = () => {
  const editor = useCustomEditor();

  return (
    <div className='pb-20'>
      <CustomRichTextEditor editor={editor} />
    </div>
  );
};

const LessonNote = () => {
  const [topic, setTopic] = useState<string | number>('');
  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Set Up Lesson Note</h2>
      <p>Kindly enter the details of the school below:</p>

      <div className='my-10  gap-6 w-1/2'>
        <FormInput
          label='Topic'
          setFormValue={setTopic}
          formValue={topic}
          placeholder='Name'
        />
      </div>

      <EditorComponent />
    </section>
  );
};

export default LessonNote;
