import Button from '@/components/buttons/Button';
import React from 'react';

interface LogoutModalContentProps {
  handleLogout: () => void;
}

const LogoutModalContent = ({ handleLogout }: LogoutModalContentProps) => {
  return (
    <div className='relative w-full max-w-[450px]'>
      <div className='h3 font-semibold text-gray-900 -mt-6'>Logout</div>
      {/* Modal body */}
      <div className='space-y-6 mb-4'>
        <p className='text-base leading-relaxed text-gray-500'>
          Are you sure you want to logout?
        </p>
      </div>
      {/* Modal footer */}
      <div className='flex items-center justify-end pt-4 space-x-2 border-t border-gray-200'>
        <Button
          onClick={handleLogout}
          className='justify-center bg-red-400 min-w-[100px] hover:bg-red-500 hover:text-white'
        >
          Yes
        </Button>
        {/* <Button
          onClick={handleCancel}
          variant='outline'
          className='justify-center border-red-400 min-w-[100px] text-red-400 hover:bg-red-500 hover:text-white selection:bg-red-400'
        >
          No
        </Button> */}
      </div>
    </div>
  );
};

export default LogoutModalContent;
