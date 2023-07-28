'use client';

import Button from '@/components/buttons/Button';
import MultiChoiceQuestion from '@/components/input/MultiChoiceQuestion';
import InputReactForm from '@/components/input/formReactInput';
import TextTabBar from '@/components/layout/TextTabBar';
import { uploadDocument } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { getFromSessionStorage } from '@/lib/helper';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetAllClassArms } from '@/server/institution/class-arm';
import {
  CreateClassActivityParams,
  Question,
  useCreateClassActivity,
  useCreateLessonNote,
} from '@/server/institution/lesson-note';
import { Institution } from '@/types/classes-and-subjects';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Controller, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import { useSessionStorage } from 'usehooks-ts';



import BookSVG from '../../../../public/svg/book.svg';
import ComputerUploadSVG from '../../../../public/svg/computer_upload.svg';
import TakePictureSVG from '../../../../public/svg/take_picture.svg';


const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((draft) => draft.Editor),
  {
    loading: () => <p>Loading...</p>,
  }
);

export const ACTIVITY_TYPES = [
  'ASSIGNMENT',
  'CLASS_WORK',
  'QUIZ',
  'LESSON_NOTE',
] as const;

export const activityTypes = [
  { key: 'ASSIGNMENT', value: 'Assignment' },
  { key: 'CLASS_WORK', value: 'Class Work' },
  { key: 'QUIZ', value: 'Pop Quiz' },
  { key: 'LESSON_NOTE', value: 'Lesson Note' },
];

const activityFormats = [
  { key: 'MULTIPLE_CHOICE', value: 'Multiple Choice' },
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
  const { register, watch, handleSubmit, getValues, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const format = watch('format')?.label;
  const type = watch('typeOfActivity')?.label;
  const [subjectiveType, setSubjectiveType] = useState(0);
  const [, setBody] = useState('[NO_BODY]');
  const create = useCreateClassActivity();
  const { mutateAsync: createLessonNote } = useCreateLessonNote();
  const [questions, setQuestions] = useState<Question[]>([{}]);
  const [addToGradeList, setAddToGradeList] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const { data: profile } = useGetProfile();
  const institutionString = getFromSessionStorage('institution');
  const [createActivityParams] = useSessionStorage(
    'create_activity_params',
    {} as CreateClassActivityParams
  );
  const institution = institutionString
    ? (JSON.parse(institutionString) as Institution)
    : undefined;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { data: arms } = useGetAllClassArms({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classId: createActivityParams.classes,
    institutionId: institution?.id,
    sessionId: profile?.currentSession?.id,
  });

  const handleAddToGradeList = () => {
    setAddToGradeList(!addToGradeList);
  };

  const handleSetOnline = () => {
    setIsOnline(!isOnline);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const form = data.format.value;
      let path: string | null = null;
      if (
        data['lesson-note-file-upload'] &&
        data['lesson-note-file-upload'][0]
      ) {
        const f = data['lesson-note-file-upload'][0] as File;
        path = await uploadDocument(
          `/teacher-lesson-note/${f.name}`,
          await f.arrayBuffer()
        );
      }

      if (type === activityTypes[3].value) {
        const res = await createLessonNote({
          uploadUrl: path ?? '',
          sessionId: createActivityParams.sessionId,
          termId: createActivityParams.termId,
          periodId: createActivityParams.periodId,
          subjectId: createActivityParams.subject,
          teacherId: profile?.userInfo?.staff?.id,
          title: 'Title',
          classArmId: createActivityParams.classes,
        });
        toast.success(res.data.data.message);
      } else {
        const res = await create.mutateAsync({
          ...data,
          ...createActivityParams,
          timeLimit: data.timeLimit.value,
          typeOfActivity: data.typeOfActivity.value,
          mode: isOnline ? 'ONLINE' : 'OFFLINE',
          format: form,
          questions,
        });
        toast.success(res.data.data.message);
      }
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl font-bold my-4'>Add Lesson Task</div>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className='font-bold text-xs pb-1'>Type of Activity</div>
            <Controller
              name='typeOfActivity'
              control={control}
              render={({ field }) => {
                return (
                  <ReactSelect
                    {...field}
                    options={activityTypes.map((v) => ({
                      value: v.key,
                      label: v.value,
                    }))}
                  />
                );
              }}
            />
          </div>
          <div>
            <div className='font-bold text-xs pb-1'>Format</div>
            <Controller
              name='format'
              control={control}
              render={({ field }) => {
                return (
                  <ReactSelect
                    {...field}
                    options={activityFormats.map((v) => ({
                      value: v.key,
                      label: v.value,
                    }))}
                  />
                );
              }}
            />
          </div>
          <InputReactForm
            register={register}
            name='dueDate'
            label='Due Date'
            placeholder='Due date'
            type='date'
            className='rounded-lg h-10 !p-0'
          />
          <div>
            <div className='font-bold text-xs pb-1'>Time Limit</div>
            <Controller
              name='timeLimit'
              control={control}
              render={({ field }) => {
                return (
                  <ReactSelect
                    {...field}
                    options={['30 Mins', '45 Mins', '1 Hour', '2 Hours'].map(
                      (v) => ({
                        value: v,
                        label: v,
                      })
                    )}
                  />
                );
              }}
            />
          </div>

          <div className='flex flex-row items-center gap-8 text-xs font-semibold'>
            <div className='flex flex-col gap-4 mt-6'>
              <div>Add to grade list</div>

              <label>
                <div className='flex flex-row items-center gap-[5px]'>
                  <Toggle
                    icons={false}
                    className='custom-toggle'
                    defaultChecked={addToGradeList}
                    onChange={handleAddToGradeList}
                  />

                  <span className='text-[14px] font-normal'>
                    {addToGradeList ? <div>Yes</div> : <div>No</div>}
                  </span>
                </div>
              </label>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <div>Online</div>

              <label>
                <div className='flex flex-row items-center gap-[5px]'>
                  <Toggle
                    icons={false}
                    className='custom-toggle'
                    defaultChecked={isOnline}
                    onChange={handleSetOnline}
                  />

                  <span className='text-[14px] font-normal'>
                    {addToGradeList ? <div>Yes</div> : <div>No</div>}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        {format === 'Multiple Choice' && (
          <>
            {questions.map((v, i) => (
              <div key={i} className='flex gap-4'>
                <div className='flex-1'>
                  <MultiChoiceQuestion
                    value={questions[i]}
                    onChange={(v) => {
                      const newQ = [...questions];
                      newQ[i] = v;
                      setQuestions(newQ);
                    }}
                  />
                </div>
                <div
                  onClick={() => {
                    if (questions.length < 2) return;
                    const newQ = [...questions];
                    newQ.splice(i, 1);
                    setQuestions(newQ);
                  }}
                  className='cursor-pointer flex items-center w-14 h-14 rounded justify-center bg-red-100'
                >
                  <MdDelete className='text-red-500 h-5 w-5' />
                </div>
              </div>
            ))}
            <div>
              <Button
                variant='secondary'
                onClick={() => {
                  const newQ = [...questions];
                  newQ.push({});
                  setQuestions(newQ);
                }}
              >
                Add Question
              </Button>
            </div>
          </>
        )}
        {format === 'Subjective' && type !== activityTypes[3].value && (
          <div>
            <EditorComponent onChange={setBody} />
          </div>
        )}
        {format === 'Subjective' && type === activityTypes[3].value && (
          <div>
            <TextTabBar
              tabs={[
                <div className='flex items-center gap-2' key={0}>
                  <BookSVG
                    className={clsxm(
                      subjectiveType === 0 ? 'fill-[#1A8FE3]' : 'fill-[#D4D5D7]'
                    )}
                  />
                  <div>Input Lesson Note </div>
                </div>,
                <div className='flex items-center gap-2' key={1}>
                  <ComputerUploadSVG
                    className={clsxm(
                      subjectiveType === 1
                        ? 'fill-[#1A8FE3] stroke-[#1A8FE3]'
                        : 'fill-[#D4D5D7] stroke-[#D4D5D7]'
                    )}
                    style={{}}
                  />
                  <div>Upload From Computer </div>
                </div>,
                <div className='flex items-center gap-2' key={2}>
                  <TakePictureSVG
                    className={clsxm(
                      subjectiveType === 2 ? 'fill-[#1A8FE3]' : 'fill-[#D4D5D7]'
                    )}
                  />
                  <div>Take a Picture to Upload</div>
                </div>,
              ]}
              onChange={setSubjectiveType}
              selectedIdx={subjectiveType}
              activeClassName='text-[#1A8FE3]'
            />
            {subjectiveType === 0 && <EditorComponent onChange={setBody} />}
            {subjectiveType === 1 && (
              <div className='border rounded-2xl h-80 flex flex-col items-center justify-center'>
                {(getValues('lesson-note-file-upload') ?? [])[0]?.name ? (
                  <div>
                    {(getValues('lesson-note-file-upload') as FileList)[0].name}{' '}
                    Selected
                  </div>
                ) : (
                  <>
                    <label
                      className='flex justify-center w-full max-w-[160px] items-center text-white rounded-lg h-10 bg-[#1A8FE3]'
                      htmlFor='lesson-note-file-upload'
                    >
                      <div>Browse</div>
                    </label>
                    <input
                      type='file'
                      id='lesson-note-file-upload'
                      className='hidden'
                      {...register('lesson-note-file-upload')}
                    />
                    <div>Or drag a file here.</div>
                  </>
                )}
              </div>
            )}
            {subjectiveType === 2 && (
              <div className='border rounded-2xl h-80 flex gap-2 flex-col items-center justify-center'>
                <Image
                  src='/images/webcam.png'
                  alt='webcam'
                  height={50}
                  width={50}
                />
                <Button
                  variant='secondary'
                  className='flex justify-center w-full max-w-[160px] h-10 bg-[#1A8FE3]'
                  type='button'
                >
                  Take Photo
                </Button>
              </div>
            )}
          </div>
        )}
        <div className='flex flex-row justify-end'>
          <Button
            variant='secondary'
            className='flex justify-center w-full max-w-[160px] h-10 bg-[#1A8FE3]'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}