'use client';

import SearchInput from '@/components/input/SearchInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';

const roles = [
  {
    role: 'Super Administrator',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    permissions: [
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
    ],
  },
  {
    role: 'Head Quarter Staff (MOE)',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    permissions: [
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
    ],
  },
  {
    role: 'SUBEB Staff',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    permissions: [
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
    ],
  },
  {
    role: 'SSEB Staff',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    permissions: [
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
    ],
  },
  {
    role: 'BTVET',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
    permissions: [
      {
        label: 'CREATE_INSTITUTION',
        description: 'You can create and add new institution as an admin',
      },
      {
        label: 'VIEW_INSTITUTION',
        description: 'You can view details of institution as an admin',
      },
      {
        label: 'EDIT_INSTITUTION',
        description: 'You can edit details of institution as an admin',
      },
      {
        label: 'DELETE_INSTITUTION',
        description: 'You can delete institution as an admin',
      },
    ],
  },
];

export default function Page() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  return (
    <div className='h-full px-12'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer flex items-center my-4'
      >
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <div className='text-3xl font-bold py-8'>Manage Roles</div>
      {/* <div className='flex h-full'>
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
      </div> */}

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3 w-full'>
          <div className='space-y-2 border-b mb-2 w-full'>
            <h2 className='text-[#8898AA] font-semibold text-lg'>All Roles</h2>
            <div className='flex justify-end text-[#016938]  text-xs'>
              <Link href='/super-admin/account/add-custom-roles'>
                + Add Custom Role
              </Link>
            </div>
          </div>
          <div className='mb-3'>
            <SearchInput />
          </div>
          {roles.map((v, idx) => (
            <div key={idx} className='border-b-2 py-2'>
              <div
                onClick={() => {
                  setSelectedRole(v);
                }}
                className='text-base font-normal cursor-pointer text-[#333]'
              >
                {v.role}
              </div>
            </div>
          ))}
        </div>
        <div className='col-span-9 bg-white w-full'>
          <div className='flex justify-end p-2 w-full border-b'>
            <button className='border border-[#016938] text-[#016938] rounded px-4 py-2'>
              Manage
            </button>
          </div>
          <div className='py-4'>
            <div className='text-center'>
              <h1 className='text-base font-medium'>{selectedRole.role}</h1>
              <p className='text-[#929292]'>{selectedRole.description}</p>
            </div>
          </div>
          <div className='rounded border'>
            {selectedRole.permissions.map((items, idx) => (
              <div key={idx}>
                <div className='p-4 border-b'>
                  <div className=''>
                    <h1 className='text-base text-[#1D1B20] font-medium uppercase'>
                      {items.label}
                    </h1>
                    <p className='text-[#7F7F7F]'>{items.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
