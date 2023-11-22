'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';
import { BsArrowUp } from 'react-icons/bs';

export default function Page() {
  const router = useRouter();
  const Names = [
    'Ighosa Ahmed',
    'David Keyan',
    'Victoria Alle',
    'Sharon Orobosa',
  ];
  return (
    <div className='h-full layout'>
      <div
        onClick={() => router.back()}
        className='flex items-center space-x-4 pt-4 cursor-pointer w-10'>
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Back</h3>
      </div>

      <div className='text-black font-bold py-8 text-2xl'>Grade Book</div>
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='grid grid-cols-8 py-8 text-[#746D69]  text-xs md:text-base'>
        <div />
        <div className='col-span-3 px-4'>Student</div>
        <div>Group</div>
        <div>Homework</div>
        <div>Attendance</div>
        <div>Standing</div>
      </div>
      <div className='flex flex-col gap-4'>
        {Names.map((name, i) => (
          <StudentGradeListItem key={i} id={i + 1} name={name} />
        ))}
      </div>
    </div>
  );
}

function StudentGradeListItem({ id, name }: { id: number; name: string }) {
  return (
    <Link href='/teacher/grades/grade-book-student'>
      <div className='grid text-black grid-cols-8 items-center text-xs md:text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
          <div>{name}</div>
        </div>
        <div className='text-black'>Group Name</div>
        <div>24/24</div>
        <div className='text-black'>16/19</div>
        <div className='text-black flex items-center'>
          <div>
            {id} {id === 1 ? 'st' : id === 2 ? 'nd' : id === 3 ? 'rd' : 'th'}
          </div>
          <BsArrowUp className='h-5 w-5 text-green-500' />
        </div>
      </div>
    </Link>
  );
}
