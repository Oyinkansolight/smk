import Button, { ButtonVariant } from '@/components/buttons/Button';
import Link from 'next/link';
import ReactSelect from 'react-select';

export default function DataGenerator({
  variant,
}: {
  variant?: (typeof ButtonVariant)[number];
}) {
  return (
    <div className='flex flex-col gap-8 p-[30px]'>
      <div className='flex justify-between'>
        <div className='text-xl font-bold'>Data Generator</div>
        <Link href='#' className='text-[#3361FF] '>
          View Advanced Report
        </Link>
      </div>
      <div className='text-[#6B7A99]'>
        Select the variables that would feed the stat section below.
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <ReactSelect
            value={{ value: 'all_classes', label: 'All Classes' }}
            options={[{ value: 'all_classes', label: 'All Classes' }]}
          />
        </div>
        <div>
          <ReactSelect
            value={{ value: 'all_classes', label: 'All Class Arm' }}
            options={[{ value: 'all_classes', label: 'All Class Arm' }]}
          />
        </div>
        <div>
          <ReactSelect
            value={{ value: 'all_classes', label: 'Ally' }}
            options={[{ value: 'all_classes', label: 'Ally' }]}
          />
        </div>
        <Button className='justify-center' variant={variant}>
          Apply
        </Button>
      </div>
    </div>
  );
}
