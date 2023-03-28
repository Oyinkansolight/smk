'use client';

import { CountCard } from '@/components/cards';

const Page = () => {
    return (
        <div className='flex flex-col px-4 pt-6'>
            <div className='flex flex-wrap gap-[27px]'>
                <CountCard
                    count={12566}
                    title='Total Students'
                    variant='primary'
                />
                <CountCard count={66} title='Total Staff' variant='secondary' />
                <CountCard count={12} title='Total Grades' variant='tertiary' />
            </div>
        </div>
    );
};

export default Page;
