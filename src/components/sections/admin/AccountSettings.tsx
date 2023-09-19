import AddAdminModal from "@/components/modals/add-admin-modal";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const mockData = [
  {
    logo: 1,
    name: 'Avril Price School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 2,
    name: 'Scaling Heights School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 3,
    name: 'Black Dash School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 4,
    name: 'Reaction Primary ',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 5,
    name: 'Victory International  School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
];

export default function AccountSettings() {
  const [eccede] = useState(mockData);
  const router = useRouter();

  return (
    <>
      <div className='flex justify-end my-4 gap-x-4'>
        <Button
          onClick={() =>
            router.push('/admin/account-settings/manage-access-roles')
          }
          variant='outline'
          className='bg-white border-secondary border text-secondary'
        >
          Manage Roles
        </Button>
        <AddAdminModal>
          <Button variant='secondary'>Add Admin</Button>
        </AddAdminModal>
      </div>
      <div className='table-add-student bg-white mt-5 pb-4 pt-1'>
        <div className='text-3xl font-bold'>Admin Access Roles</div>
        <div className='table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400  py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-2'>Name</div>
          <div className='col-span-2'>Username</div>
          <div className='col-span-2'>Role</div>
          <div className='col-span-2'>Status</div>
          <div className='col-span-2'></div>
        </div>
        {eccede.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'
            key={idx}
          >
            <div className='col-span-2'>#{idx + 1} </div>
            <div className='col-span-2 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              <h2 className='text-sm font-medium'>{item.name}</h2>
            </div>
            <div className='col-span-2'>{item.numberOfStudent}</div>
            <div className='col-span-2'>Pending</div>
            <div className='col-span-2'>
              <TableOption />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function TableOption() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative cursor-pointer'>
      <SlOptionsVertical onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className='absolute z-50 bg-white rounded-lg shadow-md font-bold p-4 flex flex-col gap-y-3'>
          <div>Delete Account</div>
          <div>Edit Permission</div>
        </div>
      )}
    </div>
  );
};