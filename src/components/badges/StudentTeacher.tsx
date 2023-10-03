import React from 'react';

interface StudentTeacherProps {
  title: string;
  text: string | number;
}

const StudentTeacherBadge = ({ title, text }: StudentTeacherProps) => {
  return (
    <div className='flex flex-col p-2 text-center justify-center items-center bg-[#F8FDFF] border-[0.25px] border-[#3361FF] overflow-hidden rounded-[5px] min-h-[42px] w-full min-w-[216px] max-w-[216px]'>
      <div className='text-[#200E32] text-[10px]'>{title}</div>
      <div className='text-[#42BBFF] font-bold'>{text}</div>
    </div>
  );
};

export default StudentTeacherBadge;
