'use client';

import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import { BasicCard } from '@/components/cards';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';

import { SignInParams, useSignIn } from '@/server/auth';

export default function StudentAuth() {
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const signIn = useSignIn();
  const onSubmit = async (data: SignInParams) => {
    try {
      await signIn.mutateAsync(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <Layout>
      <main>
        <section className='authBackground relative flex h-screen max-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FA]'>
          <Image
            width={154}
            height={53}
            className='absolute left-[60px] top-[60px] z-20'
            src='/images/edo_logo.png'
            alt=''
          />

          <div className='container flex flex-col items-center gap-8 px-4 md:px-0'>
            <div className='h1'>Welcome</div>

            <div className='container m-auto'>
              <BasicCard className='mx-auto max-w-[550px] p-6 md:p-10'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='mx-auto flex w-full flex-col gap-6 md:max-w-lg'
                >
                  <div className='h2'>Sign in</div>
                  <BaseInput
                    placeholder='Enter username here'
                    label='Username'
                    name='username'
                    register={register}
                  />

                  <BaseInput
                    placeholder='Enter password here'
                    label='Password'
                    name='password'
                    register={register}
                  />

                  <Button
                    type='submit'
                    variant='secondary'
                    className='h-[54px] justify-center'
                  >
                    Sign In
                  </Button>

                  <div className='-m-2 mb-4 flex flex-wrap justify-between'>
                    <div className='w-auto p-2'>
                      <div className='flex items-center'>
                        <Checkbox type='warning' />
                        <label
                          className='ml-2 text-sm font-medium text-gray-900'
                          htmlFor='default-checkbox'
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className='w-auto p-2'>
                      <a
                        className='text-sm font-medium hover:text-primary'
                        href='#'
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-1 whitespace-nowrap'>
                    <div>Don’t have an account?</div>
                    <PrimaryLink variant='secondary' href='/auth/student'>
                      Sign Up
                    </PrimaryLink>
                  </div>
                </form>
              </BasicCard>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
