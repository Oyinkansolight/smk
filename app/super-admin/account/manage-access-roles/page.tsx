'use client';

import Button from '@/components/buttons/Button';
import PermissionsEditor from '@/components/input/PermissionsEditor';
import AddNewRoleSuperAdminModal from '@/components/modals/add-new-role-super-admin-modal';
import AccountSettingsSideBar from '@/components/views/account-settings/AccountSettingsSideBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdArrowBackIos } from 'react-icons/md';

const roles = [
  {
    role: 'Super Administrator',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    children: [
      {
        role: 'His Excellency',
        description:
          'This role is for His Excellency & HCE / Executive Chairman / Board Secretary.',
      },
      {
        role: 'Honorable Commissioner of Education(HCE)',
        description: '',
      },
      {
        role: 'Executive Chairman',
        description: '',
      },
      {
        role: 'Board Secretary',
        description: '',
      },
    ],
  },
  {
    role: 'Head Quarter Staff (MOE)',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    children: [
      {
        role: 'Director',
        description:
          'This role is for the Ministry of Education Staffs such as, Directors, EMIS Heads, e.t.c',
      },
      {
        role: 'EMIS Head',
        description: 'This role is for the Head Quarter Staff (MOE).',
      },
      {
        role: `Chief Education Officers (CEO's)`,
        description: 'This role is for the EMIS Head.',
      },
      {
        role: 'Examination and Institution Support Services (ESSS)',
        description: 'Examination and Institution Support Services (ESSS)',
      },
    ],
  },
  {
    role: 'SUBEB Staff',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    children: [
      {
        role: 'Director',
        description:
          'This role is for the Ministry of Education Staffs such as, Directors, EMIS Heads, e.t.c',
      },
      {
        role: 'EMIS Head',
        description: 'This role is for the EMIS Head.',
      },
      {
        role: 'Education Secretary',
        description: 'Education Secretary.',
      },
      {
        role: `LGEA's`,
        description: `This role is for the LGEA's.`,
      },
      {
        role: `Institution Based Management Committee(SBMC)`,
        description:
          'This role is for the Institution Based Management Committee(SBMC).',
      },
    ],
  },
  {
    role: 'SSEB Staff',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    children: [
      {
        role: 'Director',
        description:
          'This role is for the Ministry of Education Staffs such as, Directors, EMIS Heads, e.t.c',
      },
      {
        role: 'EMIS Head',
        description: 'This role is for the EMIS Head.',
      },
      {
        role: `Institution Based Management Board(SMB)`,
        description:
          'This role is for the Institution Based Management Board(SMB).',
      },
    ],
  },
  {
    role: 'BTVET',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    children: [
      {
        role: 'Director',
        description:
          'This role is for the Ministry of Education Staffs such as, Directors, EMIS Heads, e.t.c',
      },
      {
        role: 'EMIS Head',
        description: 'This role is for the EMIS Head.',
      },
    ],
  },
];

export default function Page() {
  const [selectedRole, setSelectedRole] = useState({ item: 0, child: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  return (
    <div className='h-full px-12'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer flex items-center'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Dashboard</div>
      </div>
      <div className='text-3xl font-bold py-8'>Manage Access Roles</div>
      <div className='flex h-full'>
        <div>
          <AccountSettingsSideBar
            items={roles.map((v) => ({
              role: v.role,
              children: v.children.map((u) => u.role),
            }))}
            selected={selectedRole}
            onClick={(idx, c) => setSelectedRole({ item: idx, child: c })}
          />
          <div className='h-8' />
          <AddNewRoleSuperAdminModal>
            <div className='text-[#007AFF] cursor-pointer flex items-center'>
              <IoMdAdd className='text-blue-500 h-5 w-5' />
              <div>Add New Role</div>
            </div>
          </AddNewRoleSuperAdminModal>
        </div>
        <div className='flex-1 px-8 pr-72 bg-[#FAFAFA]'>
          <div className='flex'>
            <div>
              <div className='font-bold text-2xl'>
                {roles[selectedRole.item].role}
              </div>
              <div className='text-[#929292]'>
                {roles[selectedRole.item].description}
              </div>
            </div>
            <div className='flex-1' />
            <div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant='ghost'
                className='bg-white border-[#008146] border'
              >
                Edit
              </Button>
            </div>
          </div>
          <div className='h-px bg-[#D5D7D8] my-4' />
          <div className='text-center text-xl font-bold'>
            {roles[selectedRole.item].children[selectedRole.child].role}
          </div>
          <div className='h-px bg-[#D5D7D8] my-4' />
          <div className='text-xl uppercase'>Permissions</div>
          <div className='h-8' />
          <PermissionsEditor
            key={`${
              roles[selectedRole.item].children[selectedRole.child].role
            }`}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
}