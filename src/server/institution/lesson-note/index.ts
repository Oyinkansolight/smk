import request from '@/server';
import { useMutation } from 'react-query';


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