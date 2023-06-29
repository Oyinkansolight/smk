import clsxm from '@/lib/clsxm';
import ReactSelect from 'react-select';

export default function ChartWrapper({
  children,
  className,
  title,
}: {
  children: JSX.Element;
  className?: string;
  title: string;
}) {
  return (
    <div className={clsxm('rounded-lg shadow-md overflow-hidden', className)}>
      <div className='px-12 py-6'>
        <div className='flex justify-between'>
          <div className='text-[#4D5E80] text-xl font-bold'>{title}</div>
          <ReactSelect
            value={{ value: 0, label: 'Filter Period' }}
            options={[{ value: 0, label: 'Filter Period' }]}
          />
        </div>
        <div className='flex justify-start gap-4'>
          <Pill>Primary 1</Pill>
          <Pill>Benin LGA</Pill>
          <Pill>Avril Price Institution</Pill>
        </div>
      </div>
      <div className='bg-white pb-5'>{children}</div>
    </div>
  );
}

function Pill({ children }: { children: string | JSX.Element }) {
  return (
    <div className='py-1 px-2 rounded border bg-[#FFFCF5]'>{children}</div>
  );
}
