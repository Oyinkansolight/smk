import clsxm from '@/lib/clsxm';
import Image from 'next/image';

type timeLineType = {
  image: string;
  title: string;
  details: string;
};

interface CalendarStepperProps {
  timeLine: timeLineType[];
}

const CalendarStepper = ({ timeLine }: CalendarStepperProps) => {
  return (
    <div className='mx-auto'>
      <div className='row-gap-2 grid grid-cols-2 gap-2'>
        <div>
          {timeLine.map((item, index) => (
            <div key={index} className='flex items-center whitespace-nowrap'>
              <div className='mr-4 flex flex-col items-center'>
                <div>
                  <div className='flex h-[48px] w-[48px] items-center justify-center'>
                    <Image alt='' width={40} height={40} src={item.image} />
                  </div>
                </div>
                {index < timeLine.length - 1 && (
                  <div className='my-2 h-[14px] w-[1.5px] bg-gray-300' />
                )}
              </div>
              <div
                className={clsxm(
                  index === 0 ? 'pt-0' : 'pt-1',
                  index < timeLine.length - 2 && 'pb-4',
                  index === timeLine.length - 2 && '-mt-4'
                )}
              >
                <p className='my-2 whitespace-nowrap font-semibold text-[#1C1C1C]'>
                  {item.title}
                </p>
                <p className='text-xs text-opacity-40'>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarStepper;
