import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import request from '@/server';
import { ClassActivity1, SubmittedActivity } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';


export interface CreateAssignmentParams {
  title?: string;
  body?: string;
  dueDate?: string;
  classes?: number;
  subject?: number;
  lessonNote?: number;
}

export function useCreateAssignment() {
  const mutation = useMutation({
    mutationKey: 'create_assignment',
    mutationFn: (params: CreateAssignmentParams) =>
      request.post('/v1/institutions/lessons/create-assignment', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export interface CreateQuizParams {
  title?: string;
  body?: string;
  duration?: string;
  classes?: number;
  subject?: number;
  lessonNote?: number;
}

export function useCreateQuiz() {
  const mutation = useMutation({
    mutationKey: 'create_quiz',
    mutationFn: (params: CreateQuizParams) =>
      request.post('/v1/institutions/lessons/create-quiz', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export interface CreateClassworkParams {
  title?: string;
  body?: string;
  duration?: string;
  classes?: number;
  subject?: number;
  lessonNote?: number;
}

export function useCreateClasswork() {
  const mutation = useMutation({
    mutationKey: 'create_classwork',
    mutationFn: (params: CreateClassworkParams) =>
      request.post('/v1/institutions/lessons/create-classwork', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export interface CreateClassActivityParams {
  typeOfActivity?: string;
  mode?: 'OFFLINE' | 'ONLINE';
  sessionId?: string;
  termId?: string;
  periodId?: string;
  format?: string;
  timeLimit?: string;
  questions?: Question[];
  dueDate?: string;
  classes?: number;
  subject?: number;
  lessonNote?: number;
}

export interface Question {
  question?: string;
  options?: Option[];
}

export interface Option {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
}

export function useCreateClassActivity() {
  const mutation = useMutation({
    mutationKey: 'create_activity',
    mutationFn: (params: CreateClassActivityParams) =>
      request.post('/v1/institutions/lessons/create-class-activty', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export interface CreateLessonNoteParams {
  title?: string;
  instructionalTeachingActivity?: string;
  uploadUrl?: string;
  classId?: number | string | null;
  subjectId?: number | string | null;
  sessionId?: number | string | null;
  termId?: number | string | null;
  weekId?: number | string | null;
  periodId?: number | string | null;
  teacherId?: number | string | null;
  classArmId?: number | string | null;
}

export function useCreateLessonNote() {
  const mutation = useMutation({
    mutationKey: 'create_lesson_note',
    mutationFn: (params: CreateLessonNoteParams) =>
      request.post('/v1/institutions/lessons/create-lesson-note', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export interface GetClassActivity {
  typeOfActivity?: (typeof ACTIVITY_TYPES)[number];
  classArmId?: string | number | null;
  termId?: string | number | null;
  sessionId?: string | number | null;
}

export function useGetClassActivity(params: GetClassActivity) {
  const query = useQuery({
    queryKey: 'get_class_activity',
    queryFn: async () =>
      params.classArmId &&
      params.sessionId &&
      params.termId &&
      params.typeOfActivity
        ? ((
            await request.get(
              `/v1/institutions/lessons/get-class-class-activty`,
              {
                params,
              }
            )
          ).data.data.data as PaginatedData<ClassActivity1>)
        : undefined,
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [
    params.classArmId,
    params.sessionId,
    params.termId,
    params.typeOfActivity,
    refetch,
  ]);
  return query;
}

export interface GetStudentSubmittedActivity {
  type?: (typeof ACTIVITY_TYPES)[number];
  classArmId?: string | number | null;
  studentId?: string | number | null;
  subjectId?: string | number | null;
}

export function useGetStudentSubmittedActivity(
  params: GetStudentSubmittedActivity
) {
  const query = useQuery({
    queryKey: 'get_student_submitted_activity',
    queryFn: async () =>
      params.classArmId && params.subjectId && params.studentId && params.type
        ? ((
            await request.get(
              `/v1/institutions/lessons/get-submittted-class-activties-by-subject`,
              {
                params,
              }
            )
          ).data.data.data as SubmittedActivity[])
        : undefined,
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [
    params.classArmId,
    params.subjectId,
    params.studentId,
    params.type,
    refetch,
  ]);
  return query;
}