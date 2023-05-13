'use client';

import CircularCheckboxPrimary from '@/components/input/CircularCheckboxPrimary';
import AddNewRoleSuperAdminModal from '@/components/modals/add-new-role-super-admin-modal';
import AccountSettingsSideBar from '@/components/views/account-settings/AccountSettingsSideBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdArrowBackIos } from 'react-icons/md';

const roles = [
  {
    role: 'Super Administrator/Governor',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'HCE',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Board Secretaries',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'Directors',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'EMIS Head',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
  {
    role: 'LGA Secretary',
    description:
      'This role grant users the permissions to manage everything on the dashboard.',
  },
];

const permissions = ['Add Roles', 'Manage Permissions', 'Add School'];

const possibleValues = ['Can View', 'Can Edit', 'Can Do Both'];

export default function Page() {
  const [selectedRole, setSelectedRole] = useState(0);
  const [perms, setPerms] = useState<Record<string, boolean[]>>({
    [permissions[0]]: [false, false],
    [permissions[1]]: [false, false],
    [permissions[2]]: [false, false],
  });
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
            items={roles.map((v) => v.role)}
            selected={selectedRole}
            onClick={(idx) => setSelectedRole(idx)}
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
                  {possibleValues.map((value, j) =>
                    j === 2 ? (
                      <div className='flex items-center gap-1' key={j}>
                        <div>{value}</div>
                        <CircularCheckboxPrimary
                          checked={perms[permissions[i]].every((v) => v)}
                          onClick={() => {
                            const p = { ...perms };
                            p[permissions[i]] = Array(
                              p[permissions[i]].length
                            ).fill(true);
                            setPerms(p);
                          }}
                        />
                      </div>
                    ) : (
                      <div className='flex items-center gap-1' key={j}>
                        <div>{value}</div>
                        <CircularCheckboxPrimary
                          checked={perms[permissions[i]][j]}
                          onClick={() => {
                            const v = { ...perms };
                            v[permissions[i]][j] = !(
                              v[permissions[i]][j] ?? false
                            );
                            setPerms(v);
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
