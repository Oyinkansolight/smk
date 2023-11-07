'use client';

import Button from '@/components/buttons/Button';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import GenericLoader from '@/components/layout/Loader';
import { APP_LOGOS } from '@/constant/assets';
import { USER_ROLES } from '@/constant/roles';
import ROUTES from '@/constant/routes';
import { getStorageValueWithExpiry, setStorageValueWithExpiry } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { SignInParams, useSignIn } from '@/server/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AdminAuth() {
  const isGenericApp = Cookies.get('isGenericApp');
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkUserLogin, setCheckUserLogin] = useState(false);

  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  const setUserDashboard = (path: string) => {
    setStorageValueWithExpiry(
      'local',
      'dashboard',
      path,
      1000 * 60 * 60 * 24 * 7
    );
  }

  const { mutateAsync } = useSignIn();

  const onSubmit = async (data: SignInParams) => {
    setLoading(true);
    localStorage.clear()
    sessionStorage.clear();

    if (isChecked) {
      data.rememberMe = true;
    }

    try {
      const response = await mutateAsync(data);

      if (response) {
        if (
          response.data.data.data.type === USER_ROLES.GOVERNMENT_ADMIN ||
          response.data.data.data.type === 'DEFAULT'
        ) {
          router.push(ROUTES.SUPER_ADMIN);
          if (isChecked) setUserDashboard(ROUTES.SUPER_ADMIN);
        } else if (
          response.data.data.data.type === USER_ROLES.INSTITUTION_ADMIN
        ) {
          router.push(ROUTES.ADMIN);
          if (isChecked) setUserDashboard(ROUTES.ADMIN);
        } else if (response.data.data.data.type === USER_ROLES.TEACHER) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(
              'institution',
              JSON.stringify(response.data.data.data.staff.institution)
            );
          }
          router.push(ROUTES.TEACHER);
          if (isChecked) setUserDashboard(ROUTES.TEACHER);
        } else if (response.data.data.data.type === USER_ROLES.STUDENT) {
          router.push(ROUTES.STUDENT);
          if (isChecked) setUserDashboard(ROUTES.STUDENT);
        }

        toast.success(response.data.data.message);
        toast.info('Redirecting to dashboard...');
        setLoading(false);

        const name =
          response.data.data.data.firstName +
          ' ' +
          response.data.data.data.lastName;
        const id = response.data.data.data.id;
        const role = response.data.data.data.type;
        const email = response.data.data.data.email;
        const adminType = response.data.data.data.esgAdmin.type;

        const userDetails = {
          name,
          role,
          email,
          id,
        };
        Cookies.set('adminType', adminType);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(userDetails));
        }
      }
    } catch (error) {
      toast.error(getErrMsg(error as Error));
      setLoading(false);
    }
  };

  useEffect(() => {
    setCheckUserLogin(true);
    const validSession = getStorageValueWithExpiry('local', 'TOKEN_KEY');
    const userPath = getStorageValueWithExpiry('local', 'dashboard');
    if (validSession && userPath) {
      router.push(userPath);
    } else {
      setCheckUserLogin(false);
    }
  }, [router]);


  if (typeof window === 'undefined' || checkUserLogin) {
    return (
      <GenericLoader />
    )
  }

  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <section className='relative overflow-hidden bg-white'>
            <div className='relative z-10 -m-8 flex flex-wrap'>
              <div className='hidden p-8 lg:block lg:w-1/2'>
                {isGenericApp === 'N' && (
                  <Image
                    width={154}
                    height={53}
                    alt={APP_LOGOS.APP_LOGO.alt}
                    src={APP_LOGOS.APP_LOGO.asset}
                    className='absolute left-[60px] top-[60px] z-20'
                  />
                )}
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
                <div className='flex flex-col justify-center h-full py-6  lg:py-10 px-6'>
                  <div className='flex flex-col justify-center items-center text-center'>
                    <div className='h1 mb-4'>
                      {isGenericApp === 'Y' && 'Education Management Portal'}
                      {isGenericApp === 'N' &&
                        'Edo State Education Management Portal'}
                    </div>

                    <div className='h4 mb-4'>
                      Powered by{' '}
                      <span className='text-primary'>Teesas Education</span>
                    </div>
                  </div>
                  <div className='bg-blueGray-100 flex h-full flex-col items-center justify-center p-4'>
                    {isGenericApp === 'N' && (
                      <Image
                        width={146}
                        height={146}
                        src='/images/Seal_of_Edo_State.png'
                        alt=''
                      />
                    )}

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
                            <Checkbox type='warning' isChecked={isChecked} onClick={toggleCheckbox} />
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
                            href='/auth/admin/forgotpassword/'
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
