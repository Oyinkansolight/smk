import NewStudentAvatar from '@/components/avatars/NewStudentAvatar';
import { BasicSearch } from '@/components/search';
import { useGetProfile } from '@/server/auth';
import * as React from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import Badge from '~/svg/badge_1.svg';

export default function NewHeader() {
  const [isOpen, setisOpen] = React.useState(false);
  const { data, error, isLoading } = useGetProfile();

  return (
    <header className='sticky top-0 z-50 border-b-2 bg-[#F7F8FA]'>
      <div className='mx-auto flex gap-6 h-20 items-center px-4'>
        <CiMenuBurger />
        <Badge className='h-[46px] w-[46px]' />
        <BasicSearch />
        <div className='flex-1' />
        <NewStudentAvatar />
      </div>
    </header>
  );
}
