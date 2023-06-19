import Input from '@/components/input/formInput';
import { BiChevronLeft } from 'react-icons/bi';
import ReactSelect from 'react-select';

export default function StudentClassAttendanceReport({
  goBack,
}: {
  goBack: () => void;
}) {
  return (
    <div className='bg-white rounded border'>
      <div className='flex'>
        <div className='flex gap-3 items-center rounded bg-[#EDEFF2]'>
          <BiChevronLeft className='h-5 w-5 text-[#E5A500]' />
          <div>Go Back</div>
        </div>
        <div className='flex-1' />
        <ReactSelect options={[{ value: 'student', label: 'Student' }]} />
        <ReactSelect options={[{ value: 'class', label: 'All Class Arm' }]} />
        <Input type='date' label='' placeholder='' />
      </div>
    </div>
  );
}
