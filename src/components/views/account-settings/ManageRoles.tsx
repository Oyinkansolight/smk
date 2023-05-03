import AddNewRoleModal from '@/components/modals/add-new-role-modal';
import AccountSettingsSideBar from '@/components/views/account-settings/AccountSettingsSideBar';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdArrowBackIos } from 'react-icons/md';

const roles = [
  {
    role: 'Super Admin',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Head of Department',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Secretary',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Clerk',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Teacher',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
];

const permissions = ['Add Admin', 'Manage Permissions', 'Add School'];

export default function ManageRoles({ onClose }: { onClose: () => void }) {
  const [selectedRole, setSelectedRole] = useState(0);

  return (
    <div className='h-full px-12'>
      <div className='cursor-pointer flex items-center' onClick={onClose}>
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Dashboard</div>
      </div>
      <div className='text-3xl font-bold py-8'>Manage Access Roles</div>
      <div className='flex h-full'>
        <div>
          <AccountSettingsSideBar
            items={roles.map((v) => v.role)}
            selected={selectedRole}
            onClick={(idx) => setSelectedRole(idx)}
          />
          <div className='h-8' />
          <AddNewRoleModal>
            <div className='text-[#007AFF] cursor-pointer flex items-center'>
              <IoMdAdd className='text-blue-500 h-5 w-5' />
              <div>Add New Role</div>
            </div>
          </AddNewRoleModal>
        </div>
        <div className='flex-1 px-8 pr-72 bg-[#FAFAFA]'>
          <div className='font-bold text-2xl'>{roles[selectedRole].role}</div>
          <div>{roles[selectedRole].description}</div>
          <div className='h-px bg-black my-4' />
          <div className='text-xl uppercase'>Permissions</div>
          <div className='h-8' />
          <div className='border-t-2'>
            {permissions.map((v, i) => (
              <div
                className=' py-2 text-lg flex justify-between border-b-2'
                key={i}
              >
                <div className='font-semibold  capitalize'>{v}</div>
                <div className='flex items-center gap-2'>
                  <div>Activated</div>
                  <label className='toggle-switch'>
                    <input type='checkbox' />
                    <div className='toggle-switch-background'>
                      <div className='toggle-switch-handle'></div>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
