/* eslint-disable @typescript-eslint/no-explicit-any */
import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import request from '@/server';
import { useGetAcademicSessions } from '@/server/dashboard';
import { useState } from 'react';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { RiUserFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

interface StudentTeacherProfileCardProps {
  image?: string;
  name: string;
  setschoolType?: (v: number) => void;
  settermId: (v: string) => void;
  setsessionterms: (v: []) => void;
  sessionterms: any[];
  setacademicyear?: (v: { session: string; id: string }) => void;
}

export default function SubjectProfileCard({
  image,
  name,
  setschoolType,
  setsessionterms,
  setacademicyear,
  sessionterms,
  settermId,
}: StudentTeacherProfileCardProps) {
  const [currentGrid, setCurrentGrid] = useState(0);

  const handleToggleGrid = (index: number) => {
    setCurrentGrid(index);
    setschoolType && setschoolType(index);
  };
  const { data } = useGetAcademicSessions();

  function Fetchterms(id: number) {
    request
      .get(`/v1/government/terms/session-terms?sessionId=${id}`, {
        withCredentials: true,
      })
      .then((v) => {
        const data = v.data.data.data;
        setsessionterms(data.data || []);
      });
  }
  return (
    <div className='hidden md:flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      {image ? (
        <BigAvatar src={image} />
      ) : (
        <div className='flex h-20 w-20 rounded-full bg-[#B4A69733] uppercase font-extrabold text-5xl justify-center items-center text-gray-300 ring-1 ring-offset-8 ring-gray-300'>
          {name[0]}
        </div>
      )}
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>{name}</div>

      <div className='w-[250px]'>
        <select
          name=''
          id=''
          className='bg-[#EFFFF6] text-base rounded-md w-full'
          onChange={(e) => {
            setacademicyear && setacademicyear(JSON.parse(e.target.value));
            Fetchterms(JSON.parse(e.target.value).id);
          }}
        >
          <option> - Select Academic Year - </option>

          {(data?.data ?? []).map((v: any, id: number) => (
            <option key={id} value={JSON.stringify(v)}>
              {v.session}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-2 w-[250px]'>
        <select
          name=''
          id=''
          className='bg-[#EFFFF6] text-base rounded-md w-full'
          onChange={(e) => {
            settermId && settermId(JSON.parse(e.target.value).id);
          }}
        >
          <option> - Select Term- </option>

          {(sessionterms ?? []).map((v: any, id: number) => (
            <option key={id} value={JSON.stringify(v)}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className='text-[#C3CAD9] text-center font-bold mt-4 mb-8'>
        Select School
      </div>

      <GridTabBar
        variant='secondary'
        selected={currentGrid}
        onSelect={handleToggleGrid}
        items={[
          {
            icon: <BiListCheck className='h-7 w-7' />,
            label: 'ECCDE',
          },
          {
            icon: <RiUserFill className='h-5 w-5' />,
            label: 'Primary',
          },
          {
            icon: <HiUsers className='h-5 w-5' />,
            label: 'Secondary',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Tertiary',
          },
        ]}
      />
    </div>
  );
}
