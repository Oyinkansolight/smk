'use client';

import Button from '@/components/buttons/Button';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import { USER_ROLES } from '@/constant/roles';
import ROUTES from '@/constant/routes';
import { getErrMsg } from '@/server';
import { SignInParams, useSignIn } from '@/server/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AdminAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { mutateAsync } = useSignIn();
  const onSubmit = async (data: SignInParams) => {
    setLoading(true);

    try {
      const response = await mutateAsync(data);

      if (response) {
        toast.success(response.data.data.message);
        toast.info('Redirecting to dashboard...');
        setLoading(false);

        if (response.data.data.data.type === USER_ROLES.GOVERNMENT_ADMIN) {
          router.push(ROUTES.SUPER_ADMIN);
        } else if (
          response.data.data.data.type === USER_ROLES.INSTITUTION_ADMIN
        ) {
          router.push(ROUTES.ADMIN);
        } else if (response.data.data.data.type === USER_ROLES.TEACHER) {
          router.push(ROUTES.TEACHER);
        } else if (response.data.data.data.type === USER_ROLES.STUDENT) {
          router.push(ROUTES.STUDENT);
        } else {
          toast.error('Invalid user role');
        }

        const name = response.data.data.data.firstName + ' ' + response.data.data.data.lastName;
        const role = response.data.data.data.type;
        const userDetails = { name, role };
        localStorage.setItem('user', JSON.stringify(userDetails));
      }
    } catch (error) {
      toast.error(getErrMsg(error as Error));
      setLoading(false);
    }
  };
  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <section className='relative overflow-hidden bg-white'>
            <div className='relative z-10 -m-8 flex flex-wrap'>
              <div className='hidden p-8 lg:block lg:w-1/2'>
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
              <div className='w-full p-8 mt-20 lg:mt-0 lg:w-1/2'>
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

                    <Button
                      isLoading={loading}
                      type='submit'
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
                        <Link
                          className='text-sm font-medium hover:text-primary'
                          href='/auth/admin/'
                        >
                          Forgot Password?
                        </Link>
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
