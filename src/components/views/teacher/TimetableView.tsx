import TimetableListItem from '@/components/views/teacher/TimetableListItem';

export default function TimetableView() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const subjects = [
    {
      name: 'Mathematics',
      textColor: 'text-white',
      subjectColor: 'bg-[#6A2B56]',
      time: '9:00 am - 10:00 am',
    },
    {
      name: 'English',
      subjectColor: 'bg-[#FFF7D6]',
      textColor: 'text-black',
      time: '9:00 am - 10:00 am',
    },
    {
      name: 'Science',
      textColor: 'text-black',
      subjectColor: 'bg-[#FFEFEA]',
      time: '9:00 am - 10:00 am',
    },
    undefined,
  ];
  return (
    <div className='flex bg-blue-500 rounded-2xl'>
      <div className='grid-cols-1 px-8 grid gap-2'>
        <div className='h-20' />
        {Array(8)
          .fill(0)
          .map((v, i) => (
            <div
              key={i}
              className='flex font-bold text-white items-center justify-center h-36 w-full'
            >
              <div>9:00 AM</div>
            </div>
          ))}
      </div>
      <div className='flex-1 bg-white rounded-2xl px-6'>
        <div className='flex flex-col items-center'>
          <div className='h-12' />
          <div className='grid grid-cols-5 gap-2'>
            {days.map((d, i) => (
              <div
                key={i}
                className='flex items-center justify-center w-36 h-full font-bold text-lg'
              >
                <div>{d}</div>
              </div>
            ))}
          </div>
          <div className='h-1 w-full bg-[#E7E7E5] my-6' />
          <div className='grid grid-cols-5 gap-2'>
            <div className='col-span-5 h-32 rounded-md border p-3'>
              <div className='h-full w-full text-4xl flex font-bold items-center justify-center bg-[#C0EAD3]'>
                <div>Assembly</div>
              </div>
            </div>
            {Array(15)
              .fill(0)
              .map((v, i) => (
                <TimetableListItem
                  key={i}
                  subject={
                    subjects[Math.floor(Math.random() * subjects.length - 1)]
                  }
                />
              ))}
            <div className='col-span-5 h-32 rounded-md border p-3'>
              <div className='h-full w-full flex text-4xl font-bold items-center justify-center bg-[#C0D1EA]'>
                <div>Break</div>
              </div>
            </div>
            {Array(15)
              .fill(0)
              .map((v, i) => (
                <TimetableListItem
                  key={i}
                  subject={
                    subjects[Math.floor(Math.random() * subjects.length - 1)]
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
