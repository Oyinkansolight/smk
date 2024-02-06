'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import MultiChoiceQuestion from '@/components/input/MultiChoiceQuestion';
import CustomRichTextEditor from '@/components/input/TextEditor/CustomRichTextEditor';
import InputReactForm from '@/components/input/formReactInput';
import TextTabBar from '@/components/layout/TextTabBar';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import useCustomEditor from '@/hooks/useEditor';
import clsxm from '@/lib/clsxm';
import { getCurrentDate } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  CreateClassActivityParams,
  CreateLessonNoteTypes,
  Question,
  useCreateClassActivity,
  useCreateLessonNote,
} from '@/server/institution/lesson-note';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import { useSessionStorage } from 'usehooks-ts';
import BookSVG from '~/svg/book.svg';
import ComputerUploadSVG from '~/svg/computer_upload.svg';
import TakePictureSVG from '~/svg/take_picture.svg';

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

interface CreateClassActivityViewProps {
  closeModal: () => void;
}

export default function CreateClassActivityView({
  closeModal,
}: CreateClassActivityViewProps) {
  const params = useSearchParams();
  const classArmId = params?.get('classArmId');
  const editor = useCustomEditor();
  const { register, watch, handleSubmit, getValues, setValue, control } =
    useForm({
      mode: 'all',
      reValidateMode: 'onChange',
    });
  const format = watch('format')?.label;
  const type = watch('typeOfActivity')?.label;
  const [subjectiveType, setSubjectiveType] = useState(0);
  const [fileType, setFileType] = useState<
    'pdf' | 'video' | 'picture' | 'video_url'
  >('picture');
  const create = useCreateClassActivity();
  const { mutateAsync: createLessonNote } = useCreateLessonNote();
  const [questions, setQuestions] = useState<Question[]>([{}]);
  const [addToGradeList, setAddToGradeList] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const { data: profile } = useGetProfile();

  const [createActivityParams] = useSessionStorage(
    'create_activity_params',
    {} as CreateClassActivityParams
  );

  console.log(getValues('lesson-note-file-upload'));

  const handleAddToGradeList = () => {
    setAddToGradeList(!addToGradeList);
  };

  const handleSetOnline = () => {
    setIsOnline(!isOnline);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (
      type !== activityTypes[3]?.value &&
      data?.format?.value === activityFormats[0].key
    ) {
      questions.forEach((v) => {
        if (!v.question) {
          toast.error('Please fill all questions');
          return;
        }

        if (!v.options) {
          toast.error('Please fill all options');
          return;
        }

        if (v.options.length < 4) {
          toast.error('Please add at least 4 options');
          return;
        } else if (v.options.length === 4) {
          v.options.map((option) => {
            if (!option || option === '') {
              toast.error('Please fill all options');
              return;
            }
          });
        }
      });
    }

    if (
      type !== activityTypes[3].value &&
      data.format.value === activityFormats[1].key
    ) {
      if (editor?.getHTML() === '' || editor?.getHTML() === '<p></p>') {
        toast.error('Please fill all questions');
        return;
      }
    }

    let questionsV2;

    if (
      type !== activityTypes[3].value &&
      data.format.value === activityFormats[0].key
    ) {
      questionsV2 = questions.map((v) => ({
        question: v.question,
        options: v.options,
        correctOption: v?.correctOption ?? v?.options?.[0],
      }));
    }

    if (
      type !== activityTypes[3].value &&
      data.format.value === activityFormats[1].key
    ) {
      questionsV2 = [
        {
          question: editor?.getHTML() ?? '',
        },
      ];
    }

    try {
      let form;
      let path: string | null = null;

      if (data?.format?.value) {
        form = data.format.value;
      }

      if (
        data['lesson-note-file-upload'] &&
        data['lesson-note-file-upload'][0]
      ) {
        const environment = isLocal ? 'staging' : 'production';
        const f = data['lesson-note-file-upload'][0] as File;
        path = await uploadDocument(
          `/teacher-lesson-note/${f.name}`,
          await f.arrayBuffer(),
          environment
        );
      }
      console.log(type);

      if (type === activityTypes[3].value) {
        const payload: CreateLessonNoteTypes = {
          uploadUrl: path ? path : getValues('videoUrl') ?? '',
          fileType,
          sessionId: createActivityParams?.sessionId,
          termId: createActivityParams?.termId,
          periodId: createActivityParams?.periodId,
          subjectId: createActivityParams?.subject,
          teacherId: profile?.userInfo?.staff?.id,
          title: data?.lessonTitle,
          classArmId: classArmId,
          instructionalTeachingActivity:
            editor?.getHTML() !== '<p></p>' ? editor?.getHTML() : '',
        };

        if (!path && getValues('videoUrl') === '') delete payload.uploadUrl;
        if (!payload.uploadUrl) delete payload.fileType;
        if (!payload?.instructionalTeachingActivity)
          delete payload.instructionalTeachingActivity;
        console.log(payload);

        const res = await createLessonNote(payload);
        toast.success(res.data.data.message);
        closeModal();
      } else if (
        type === activityTypes[1].value ||
        type === activityTypes[2].value
      ) {
        //* Due date should not be required for class work or pop quiz
        delete data.dueDate;

        const res = await create.mutateAsync({
          ...data,
          ...createActivityParams,
          timeLimit: data?.timeLimit?.value,
          typeOfActivity: data?.typeOfActivity?.value,
          mode: isOnline ? 'ONLINE' : 'OFFLINE',
          format: form,
          questionsV2,
          addToGradeList,
        });
        toast.success(res.data.data.message);
        closeModal();
      } else {
        // const res = await create.mutateAsync({
        //   ...data,
        //   ...createActivityParams,
        //   timeLimit: data?.timeLimit?.value,
        //   typeOfActivity: data?.typeOfActivity?.value,
        //   mode: isOnline ? 'ONLINE' : 'OFFLINE',
        //   format: form,
        //   questionsV2,
        //   addToGradeList,
        // });
        // toast.success(res.data.data.message);
        closeModal();
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

          {type === activityTypes[3].value && (
            <div className='col-span-2 mt-2'>
              <BaseInput
                required
                name='lessonTitle'
                label='Title'
                register={register}
                placeholder='Lesson Note Title'
              />
            </div>
          )}

          {type !== activityTypes[3].value && (
            <div>
              <div className='font-bold text-xs pb-1'>Format</div>
              <Controller
                name='format'
                control={control}
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field}
                      required
                      options={activityFormats.map((v) => ({
                        value: v.key,
                        label: v.value,
                      }))}
                    />
                  );
                }}
              />
            </div>
          )}
          {type === activityTypes[0].value && (
            <InputReactForm
              isRequired
              register={register}
              name='dueDate'
              label='Due Date'
              placeholder='Due date'
              type='date'
              min={getCurrentDate()}
              className='rounded-lg h-10 !p-0'
            />
          )}
          {(type === activityTypes[1].value ||
            type === activityTypes[2].value) && (
            <div>
              <div className='font-bold text-xs pb-1'>Time Limit</div>
              <Controller
                name='timeLimit'
                control={control}
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field}
                      required
                      options={['15 Mins', '30 Mins', '45 Mins', '1 Hour'].map(
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
          )}
        </div>
        {type !== activityTypes[3].value && (
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
                    {isOnline ? <div>Yes</div> : <div>No</div>}
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
        {type !== activityTypes[3].value && format === 'Multiple Choice' && (
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
                  className={clsxm(
                    questions.length === 1 ? 'hidden' : '',
                    i === 0 ? 'invisible' : 'flex',
                    'cursor-pointer items-center w-14 h-14 rounded justify-center bg-red-100'
                  )}
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
            <CustomRichTextEditor editor={editor} />
            {/* <EditorComponent onChange={setBody} /> */}
          </div>
        )}
        {type === activityTypes[3].value && (
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
                <div
                  className='flex items-center gap-2'
                  key={1}
                  onClick={() => {
                    setFileType('pdf');
                  }}
                >
                  <ComputerUploadSVG
                    className={clsxm(
                      subjectiveType === 1
                        ? 'fill-[#1A8FE3] stroke-[#1A8FE3]'
                        : 'fill-[#D4D5D7] stroke-[#D4D5D7]'
                    )}
                    style={{}}
                  />
                  <div>Upload PDF From Computer </div>
                </div>,
                <div className='flex items-center gap-2' key={2}>
                  <TakePictureSVG
                    className={clsxm(
                      subjectiveType === 2 ? 'fill-[#1A8FE3]' : 'fill-[#D4D5D7]'
                    )}
                  />
                  <div> Upload Media </div>
                </div>,
              ]}
              onChange={setSubjectiveType}
              selectedIdx={subjectiveType}
              activeClassName='text-[#1A8FE3]'
            />
            {subjectiveType === 0 && <CustomRichTextEditor editor={editor} />}
            {subjectiveType === 1 && (
              <div className='border rounded-2xl h-40 flex flex-col items-center justify-center'>
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
                      accept='pdf'
                      {...register('lesson-note-file-upload')}
                    />
                    <div>Or drag a file here.</div>
                  </>
                )}
              </div>
            )}
            {subjectiveType === 2 && (
              <div className='border rounded-2xl h-40 '>
                <div className='grid grid-cols-3  border-b divide-x'>
                  <div
                    onClick={() => {
                      setFileType('picture');
                    }}
                    className={clsxm(
                      fileType === 'picture'
                        ? 'bg-[#222] text-[#fff] rounded-tl-md'
                        : 'text-black',
                      'flex items-center p-2 justify-center'
                    )}
                  >
                    <div>Picture File</div>
                  </div>
                  <div
                    className={clsxm(
                      fileType === 'video'
                        ? 'bg-[#222] text-[#fff]'
                        : 'text-black',
                      'flex items-center p-2 justify-center'
                    )}
                    onClick={() => {
                      setFileType('video');
                    }}
                  >
                    <div>Video File </div>
                  </div>
                  <div
                    className={clsxm(
                      fileType === 'video_url'
                        ? 'bg-[#222] text-[#fff] rounded-tr-md'
                        : 'text-black',
                      'flex items-center p-2 justify-center'
                    )}
                    onClick={() => {
                      setFileType('video_url');
                    }}
                  >
                    <div> Video Url </div>
                  </div>
                </div>
                {fileType !== 'video_url' ? (
                  <div className='flex flex-col justify-center items-center py-4'>
                    {(getValues('lesson-note-file-upload') ?? [])[0]?.name ? (
                      <div>
                        <div className='flex items-center space-x-3'>
                          <div>
                            {getValues('lesson-note-file-upload') &&
                              (
                                getValues('lesson-note-file-upload') as FileList
                              )[0].name}
                          </div>
                          <button
                            type='button'
                            className='text-red-500'
                            onClick={() => {
                              setValue('lesson-note-file-upload', null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
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
                          accept={
                            fileType === 'picture' ? 'image/*' : 'video/*'
                          }
                          {...register('lesson-note-file-upload')}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <div className='flex justify-center items-center p-6'>
                    <BaseInput
                      required
                      name='videoUrl'
                      label='Video URL'
                      register={register}
                      placeholder='http://youtube.com/v=tr13dcsfg'
                    />
                  </div>
                )}
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
