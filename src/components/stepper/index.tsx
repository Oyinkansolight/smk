import VerticalStepper from '@/components/stepper/Vertical';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import React from 'react';
import Checksuccess from '~/svg/checksuccess.svg';

interface propType {
  variant?: string;
  section: string;
  data: {
    stage: number;
    stageName: string;
  }[];
  currentStage: number;
}

function Index({ currentStage, variant, data, section }: propType) {
  return (
    <div>
      <div className='my-4 flex space-x-6 '>
        {data.map((item, idx) => (
          <div className='flex items-center space-x-4' key={idx}>
            <div
              className={clsxm(
                [
                  currentStage >= item.stage
                    ? `bg-[${variant}] p-2 text-white`
                    : `border border-[${variant}] p-2 text-[${variant}]`,
                ],
                'grid h-7 w-7 place-content-center rounded-full border'
              )}
            >
              {currentStage > item.stage ? (
                <Checksuccess className='h-3 w-3 text-green-500' />
              ) : (
                item.stage
              )}
            </div>
            <h1 className='text-xs font-semibold md:block hidden'>
              {' '}
              {item.stageName}{' '}
            </h1>
            {data.length - 1 !== idx && (
              <span>
                {section === 'admin' ? (
                  <Image
                    src='/svg/back.svg'
                    width={10}
                    height={10}
                    alt='back'
                    className='ml-4 h-4 w-4 rotate-180 transform'
                  />
                ) : (
                  <Image
                    src='/svg/rightarrow.svg'
                    width={10}
                    height={10}
                    alt='back'
                    className='ml-4 h-4 w-4 '
                  />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { VerticalStepper };
export default Index;
