/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from '@/components/NextImage';

export default function StudentTeacherProfileCard({
  // session,
  sessionterms,
  sessionname,
  setCurrentTermId,
}: {
  sessionname?: string | null;
  session?: string | null;
  schoolType?: string | null;
  sessionterms?: any;
  setCurrentTermId?: (v: number) => void;
}) {
  const termNumberToName = (num: string) => {
    if (num) {
      if (num === '1') {
        return 'First Term';
      } else if (num === '2') {
        return 'Second Term';
      } else if (num === '3') {
        return 'Third Term';
      }
    } else return 'Term';
  };
  return (
    <div className='flex flex-col items-center px-10 pt-5'>
      <NextImage
        src='/svg/calendar.svg'
        width={150}
        height={99}
        alt='calendar_mini'
      />
      <div className='font-bold text-lg text-center'>{sessionname}</div>
      <div className='h-20' />

      <div className='flex justify-end   text-gray-500 w-full'>
        <select
          name=''
          id=''
          onChange={(e) =>
            setCurrentTermId && setCurrentTermId(Number(e.target.value))
          }
          className='p-2 bg-[#FFF6E7] font-bold  border text-sm rounded w-full'
        >
          {sessionterms.map((v: any, i: number) => (
            <option key={i} value={v.id}>
              {termNumberToName(v.name)}
            </option>
          ))}
        </select>
      </div>
      <div className='h-20' />
    </div>
  );
}
