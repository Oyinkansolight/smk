import Image from 'next/image';

export default function StudentLessonNote() {
  return (
    <div>
      <div>Topic:</div>
      <div className='font-bold text-lg'>Algebra - Part 1</div>
      <div className='h-[2px] bg-gray-200 my-10' />
      <div className='flex flex-col items-center'>
        <Image
          src='/images/course_1.png'
          height={500}
          width={600}
          alt='course'
        />
        <Image
          src='/images/course_2.png'
          height={500}
          width={600}
          alt='course'
        />
        <Image
          src='/images/course_3.png'
          height={500}
          width={600}
          alt='course'
        />
        <Image
          src='/images/course_4.png'
          height={500}
          width={600}
          alt='course'
        />
      </div>
    </div>
  );
}
