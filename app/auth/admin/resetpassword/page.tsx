'use client';

import Button from '@/components/buttons/Button';
import { BasicCard } from '@/components/cards';
// import { BaseInput } from '@/components/input';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import { getErrMsg } from '@/server';
import { useResetPassword } from '@/server/auth';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const queryString = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [token, settoken] = React.useState<string | null>('');
  const [newPassword, setNewPassword] = React.useState('');
  const { handleSubmit } = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { mutateAsync } = useResetPassword();
  const onSubmit = async () => {
    setLoading(true);
    const data = {
      password: newPassword,
      token,
    };

    try {
      const response = await mutateAsync(data);

      toast.success('Password reset successful, Login');
      router.push('/auth/user');
    } catch (error) {
      toast.error(getErrMsg(error as Error));
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const gettoken = queryString && queryString.get('token');
    settoken(gettoken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                  <div className='h2 text-center'>Reset Your Password</div>
                  <div className='mt-3 text-center text-sm'>
                    Please enter your new password in order to re-activate your
                    account.
                  </div>

                  <div className='flex flex-col space-y-4'>
                    <input
                      type='text'
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      className='p-2 border bg-transparent outline-none rounded-md ring-gray-400'
                    />

                    <Button
                      type='submit'
                      isLoading={loading}
                      variant='secondary'
                      className='h-[54px] justify-center'
                    >
                      Set Password
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-1 whitespace-nowrap justify-center'>
                    <div>I remember my password</div>
                    <PrimaryLink variant='secondary' href='/auth/admin'>
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
