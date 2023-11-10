'use client';

import Button from '@/components/buttons/Button';
import { BasicCard } from '@/components/cards';
import { BaseInput, Checkbox } from '@/components/input';
import Layout from '@/components/layout/Layout';
import GenericLoader from '@/components/layout/Loader';
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
import { HiOutlineEnvelope } from 'react-icons/hi2';
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
        <section className='relative flex h-screen max-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FA]'>
          <Image
            width={228}
            height={224}
            alt={APP_LOGOS.APP_LOGO.alt}
            src='/images/topleft.png'
            className='absolute left-0 top-0 z-1'
          />
          <Image
            width={228}
            height={224}
            alt={APP_LOGOS.APP_LOGO.alt}
            src='/images/topright.png'
            className='absolute top-0 right-0 z-1'
          />
          <Image
            width={228}
            height={224}
            alt={APP_LOGOS.APP_LOGO.alt}
            src='/images/downleft.png'
            className='absolute left-0 bottom-0 z-1'
          />
          <Image
            width={228}
            height={224}
            alt={APP_LOGOS.APP_LOGO.alt}
            src='/images/downright.png'
            className='absolute right-0 bottom-0 z-1'
          />

          {isGenericApp === 'N' && (
            <div className='absolute top-0 inset-x-0 bg-white py-3 flex justify-center items-center z-10'>
              <Image
                width={154}
                height={53}
                alt={APP_LOGOS.APP_LOGO.alt}
                src={APP_LOGOS.APP_LOGO.asset}
                className=''
              />
            </div>
          )}

          <div className='container flex justify-between items-center gap-8 px-4 md:px-0 z-20'>
            <div className='container m-auto'>
              <BasicCard className='mx-auto max-w-[470px] p-6 md:p-10'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='mx-auto flex w-full flex-col gap-5 md:max-w-lg'
                >
                  <div className='h2'>Log in</div>
                  <span className='text-xs text-black/60'>
                    Enter your credentials to access your account
                  </span>
                  <BaseInput
                    name='Username'
                    type='email'
                    register={register}
                    placeholder='Email'
                    icon={
                      <HiOutlineEnvelope className='text-black/60' size={22} />
                    }
                  />

                  <BaseInput
                    name='password'
                    type='password'
                    register={register}
                    placeholder='Password'
                  />

                  <Button
                    type='submit'
                    isLoading={loading}
                    variant='base'
                    className='h-[54px] rounded-full justify-center'
                  >
                    Log into Account
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
                        className='text-sm font-medium text-[#5754F7] hover:text-primary'
                        href='/auth/user/forgotpassword/'
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  {/* <div className='flex flex-wrap gap-1 whitespace-nowrap'>
                    <div>Don’t have an account?</div>
                    <PrimaryLink variant='secondary' href={ROUTES.USER_AUTH}>
                      Sign Up
                    </PrimaryLink>
                  </div> */}
                </form>
              </BasicCard>
            </div>
            <div className='md:flex hidden  flex-col items-center justify-center container m-auto'>
              <div className='bg-white rounded-3xl p-4'>
                <Image
                  width={410}
                  height={410}
                  alt={APP_LOGOS.APP_LOGO.alt}
                  src='/images/Bookmarks-cuate.png'
                  className=''
                />
              </div>
              <div className='mt-3 flex justify-center items-center flex-col max-w-[250px]'>
                <h2 className='text-2xl mb-2'>Easy Access</h2>
                <span className='text-xs text-black/60'>
                  You can easily access all the information about the
                  educational system of the state
                </span>
                <div className='flex space-x-2 mt-3'>
                  <div className='bg-white h-1 w-4 rounded-[7px]' />
                  <div className='bg-[#F0AF3D] h-1 w-8 rounded-[7px]' />
                  <div className='bg-white h-1 w-4 rounded-[7px]' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
