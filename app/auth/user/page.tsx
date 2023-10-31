'use client';

import Button from '@/components/buttons/Button';
import { BasicCard } from '@/components/cards';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import GenericLoader from '@/components/layout/Loader';
import PrimaryLink from '@/components/links/PrimaryLink';
import { APP_LOGOS } from '@/constant/assets';
import { USER_ROLES } from '@/constant/roles';
import ROUTES from '@/constant/routes';
import {
  getStorageValueWithExpiry,
  setStorageValueWithExpiry,
} from '@/lib/helper';
import { getErrMsg } from '@/server';
import { SignInParams, useSignIn } from '@/server/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function StudentAuth() {
  const queryString = useSearchParams();
  const actionName = queryString?.get('action');

  const isGenericApp = Cookies.get('isGenericApp');
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [checkUserLogin, setCheckUserLogin] = React.useState(false);

  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  React.useEffect(() => {
    setCheckUserLogin(true);
    const validSession = getStorageValueWithExpiry('local', 'TOKEN_KEY');
    const userPath = getStorageValueWithExpiry('local', 'dashboard');
    if (validSession && userPath) {
      router.push(userPath);
    } else {
      setCheckUserLogin(false);
    }
    if (actionName === 'logout' && typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }
  }, [router]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const setUserDashboard = (path: string) => {
    setStorageValueWithExpiry(
      'local',
      'dashboard',
      path,
      1000 * 60 * 60 * 24 * 7
    );
  };

  const { mutateAsync } = useSignIn();
  const onSubmit = async (data: SignInParams) => {
    setLoading(true);
    localStorage.clear();
    sessionStorage.clear();

    if (isChecked) {
      data.rememberMe = true;
    }
   
    try {
      const response = await mutateAsync(data);

      if (response) {
        if (response.data.data.data.type === USER_ROLES.INSTITUTION_ADMIN) {
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
        } else if (
          response.data.data.data.type === USER_ROLES.GOVERNMENT_ADMIN ||
          response.data.data.data.type === 'DEFAULT'
        ) {
          router.push(ROUTES.SUPER_ADMIN);
          if (isChecked) setUserDashboard(ROUTES.SUPER_ADMIN);
        }

        toast.success(response.data.data.message);
        toast.info('Redirecting to dashboard...');
        setLoading(false);

        let currentStudentInfo;
        const name =
          response.data.data.data.firstName +
          ' ' +
          response.data.data.data.lastName;
        const id = response.data.data.data.id;
        const role = response.data.data.data.type;
        const email = response.data.data.data.email;
        if (role === 'STUDENT') {
          currentStudentInfo = response.data.data.data.student;
        }

        const userDetails = {
          name,
          role,
          email,
          id,
          currentStudentInfo,
        };
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(userDetails));
        }
      }
    } catch (error) {
      toast.error(getErrMsg(error as Error));
      setLoading(false);
    }
  };

  if (typeof window === 'undefined' || checkUserLogin) {
    return <GenericLoader />;
  }

  return (
    <Layout>
      <main>
        <section className='authBackground relative flex h-screen max-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FA]'>
          {isGenericApp === 'N' && (
            <Image
              width={154}
              height={53}
              alt={APP_LOGOS.APP_LOGO.alt}
              src={APP_LOGOS.APP_LOGO.asset}
              className='absolute left-[60px] top-[60px] z-20'
            />
          )}

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
                    type='submit'
                    isLoading={loading}
                    variant='secondary'
                    className='h-[54px] justify-center'
                  >
                    Sign In
                  </Button>

                  <div className='-m-2 mb-4 flex flex-wrap justify-between'>
                    <div className='w-auto p-2'>
                      <div className='flex items-center'>
                        <Checkbox
                          type='warning'
                          isChecked={isChecked}
                          onClick={toggleCheckbox}
                        />
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
                        href='/auth/user/forgotpassword/'
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-1 whitespace-nowrap'>
                    <div>Don’t have an account?</div>
                    <PrimaryLink variant='secondary' href={ROUTES.USER_AUTH}>
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
