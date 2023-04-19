'use client';

import Button from '@/components/buttons/Button';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import ROUTES from '@/constant/routes';
import { SignInParams, useSignIn } from '@/server/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AdminAuth() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const signIn = useSignIn();
  const onSubmit = async (data: SignInParams) => {
    try {
      const response = await signIn.mutateAsync(data);

      if (response) {
        toast.success('Login successful');

        //2 Second delay before redirecting to dashboard
        setTimeout(() => {
          toast.info('Redirecting to dashboard...');
        }, 2000);

        router.push(ROUTES.SUPER_ADMIN)
      }

    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <section className='relative overflow-hidden bg-white'>
            <div className='relative z-10 -m-8 flex flex-wrap'>
              <div className='hidden p-8 md:block md:w-1/2'>
                <Image
                  width={154}
                  height={53}
                  className='absolute left-[60px] top-[60px] z-20'
                  src='/images/edo_logo.png'
                  alt=''
                />
                <div className='container mx-auto'>
                  <Image
                    width={726}
                    height={1024}
                    className='h-screen max-h-[100vh] w-full'
                    style={{ objectFit: 'fill' }}
                    src='/images/admin_layout_bg.png'
                    alt=''
                  />
                </div>
              </div>
              <div className='w-full p-8 md:w-1/2'>
                <div className='bg-blueGray-100 flex h-full flex-col items-center justify-center p-4 py-16'>
                  <Image
                    width={146}
                    height={146}
                    src='/images/subeb.png'
                    alt=''
                  />

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mx-auto flex w-full flex-col gap-6 md:max-w-lg'
                  >
                    <BaseInput
                      name='email'
                      type='email'
                      label='Username'
                      register={register}
                      placeholder='Enter username here'
                    />

                    <BaseInput
                      label='Password'
                      name='password'
                      type='password'
                      register={register}
                      placeholder='Enter password here'
                    />

                    <Button type='submit' className='h-[54px] justify-center'>
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
                  </form>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
