import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/admin');
  }, [router]);

  return (
    <div>Loading...</div>
    // <Layout>
    //   <Seo templateTitle='Student Auth' />

    //   <main>
    //     <section className='authBackground relative flex h-screen max-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FA]'>
    //       <Image
    //         width={154}
    //         height={53}
    //         className='absolute left-[60px] top-[60px] z-20'
    //         src='/images/edo_logo.png'
    //         alt=''
    //       />

    //       <div className='container flex flex-col items-center gap-8 px-4 md:px-0'>
    //         <div className='h1'>Welcome</div>

    //         <div className='container m-auto'>
    //           <BasicCard className='mx-auto max-w-[550px] p-6 md:p-10'>
    //             <form className='mx-auto flex w-full flex-col gap-6 md:max-w-lg'>
    //               <div className='h2'>Sign in</div>
    //               <BaseInput
    //                 placeholder='Enter username here'
    //                 label='Username'
    //                 name='username'
    //               />

    //               <BaseInput
    //                 placeholder='Enter password here'
    //                 label='Password'
    //                 name='password'
    //               />

    //               <Button
    //                 variant='secondary'
    //                 className='h-[54px] justify-center'
    //               >
    //                 Sign In
    //               </Button>

    //               <div className='-m-2 mb-4 flex flex-wrap justify-between'>
    //                 <div className='w-auto p-2'>
    //                   <div className='flex items-center'>
    //                     <Checkbox type='warning' />
    //                     <label
    //                       className='ml-2 text-sm font-medium text-gray-900'
    //                       htmlFor='default-checkbox'
    //                     >
    //                       Remember Me
    //                     </label>
    //                   </div>
    //                 </div>
    //                 <div className='w-auto p-2'>
    //                   <a
    //                     className='text-sm font-medium hover:text-primary'
    //                     href='#'
    //                   >
    //                     Forgot Password?
    //                   </a>
    //                 </div>
    //               </div>

    //               <div className='flex flex-wrap gap-1 whitespace-nowrap'>
    //                 <div>Don’t have an account?</div>
    //                 <PrimaryLink variant='secondary' href='/auth/student'>
    //                   Sign Up
    //                 </PrimaryLink>
    //               </div>
    //             </form>
    //           </BasicCard>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </Layout>
  );
}
