'use client';

import Button from '@/components/buttons/Button';
import { BasicCard } from '@/components/cards';
import { BaseInput } from '@/components/input';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import { APP_LOGOS } from '@/constant/assets';
import { getErrMsg } from '@/server';
import { SignInParams, useForgotPassword } from '@/server/auth';
import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const { register, handleSubmit } = useForm<SignInParams, unknown>({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { mutateAsync } = useForgotPassword();
  const onSubmit = async (data: SignInParams) => {
    setLoading(true);

    try {
      const response = await mutateAsync(data);

      toast.success(response.data.data.message);
      setIsSent(true);
      setLoading(false);
    } catch (error) {
      toast.error(getErrMsg(error as Error));
      setLoading(false);
    }
  };
  return (
    <Layout>
      <main>
        <section className='authBackground relative flex h-screen max-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FA]'>
          <Image
            width={154}
            height={53}
            alt={APP_LOGOS.APP_LOGO.alt}
            src={APP_LOGOS.APP_LOGO.asset}
            className='absolute left-[60px] top-[60px] z-20'
          />

          <div className='container flex flex-col items-center gap-8 px-4 md:px-0'>
            <div className='h1'>Welcome</div>

            <div className='container m-auto'>
              <BasicCard className='mx-auto max-w-[550px] p-6 md:p-10'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='mx-auto flex w-full flex-col gap-6 md:max-w-lg'
                >
                  <div className='h2 text-center'>Forgot Your Password?</div>
                  <div className='mt-3 text-center text-sm'>
                    Kindly enter the details below and a reset password link
                    will sent to you.
                  </div>
                  {!isSent ? (
                    <div className='flex flex-col space-y-4'>
                      <BaseInput
                        name='email'
                        type='email'
                        label='Enter Email'
                        register={register}
                        placeholder='Enter username here'
                      />

                      <Button
                        type='submit'
                        isLoading={loading}
                        variant='secondary'
                        className='h-[54px] justify-center'
                      >
                        Retrieve Password
                      </Button>
                    </div>
                  ) : (
                    <div className='rounded-md bg-green-200 border border-green-500 p-3 w-full text-center text-green-500'>
                      The password reset link sent successfully.
                    </div>
                  )}

                  <div className='flex flex-wrap gap-1 whitespace-nowrap justify-center'>
                    <div>I remember my password</div>
                    <PrimaryLink variant='secondary' href='/auth/user'>
                      Sign In instead
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
