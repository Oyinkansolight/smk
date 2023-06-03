import Button from '@/components/buttons/Button';

export default function NewStudentClock() {
  const t = ['HRS', 'MIN', 'SEC'];
  return (
    <div className='flex py-5 px-5 gap-5 flex-col text-center items-center rounded-lg border border-blue-500'>
      <div className='text-xl'>
        You are <span className='text-red-500 font-bold'>Within</span> your
        clock in area
      </div>
      <div className='flex gap-4'>
        {t.map((v, i) => (
          <div key={i}>
            <div className='p-4 bg-[#FFFCF6] text-[#C0C0C0] text-2xl font-black'>
              00
            </div>
            <div>{v}</div>
          </div>
        ))}
      </div>
      <Button variant='secondary'>Clock In</Button>
      <div className='text-blue-500 font-bold cursor-pointer'>
        View Attendance Sheet
      </div>
    </div>
  );
}
