import { BsCheck } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

type stepType = {
  title: string;
  details?: string;
};

interface VerticalStepperProps {
  steps: stepType[];
  currentStep: number;
  variant?: 'primary' | 'secondary';
}

const VerticalStepper = ({
  currentStep,
  steps,
  variant = 'secondary',
}: VerticalStepperProps) => {
  return (
    <div>
      {steps.map((item, index) => (
        <div key={index} className='flex items-center whitespace-nowrap'>
          <div className='mr-4 flex flex-col items-center'>
            <div>
              <div
                className={clsxm(
                  'rounded-full border-[0.9px] bg-[#E9ECEF] text-xs',
                  'flex h-[27px] w-[27px] items-center justify-center',
                  [
                    variant === 'primary' && [
                      'border-primary text-primary',
                      'hover:bg-primary-600 hover:text-white',
                      currentStep === index && 'bg-primary text-white',
                    ],
                    variant === 'secondary' && [
                      'border-secondary text-secondary',
                      'hover:bg-secondary-600 hover:text-white',
                      currentStep === index && 'bg-secondary text-white',
                    ],
                  ],
                  index < currentStep &&
                    'border-[#2DCE89] bg-[#2DCE89] text-white'
                )}
              >
                {index < currentStep ? (
                  <BsCheck className='h-5 w-5' />
                ) : (
                  index + 1
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className='my-2 h-[30px] w-[1.5px] bg-gray-300' />
            )}
          </div>
          <div
            className={clsxm(
              'self-start'
              // index < steps.length - 2 && 'pb-4',
              // index === steps.length - 2 && '-mt-4'
            )}
          >
            <p className='whitespace-nowrap font-semibold text-[#1C1C1C]'>
              {item.title}
            </p>

            {item.details && (
              <p className='text-xs text-opacity-40'>{item.details}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalStepper;
