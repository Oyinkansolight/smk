'use client';

import { getURL } from '@/firebase/init';
import { useGetProfile } from '@/server/auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IRole {
  id: string;
  action: string;
  target: string;
  negate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export default function YourRoles() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  const [permissions, setPermissions] = useState<IRole[]>([]);
  const { data } = useGetProfile();

  const [url, setUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  );
  useEffect(() => {
    const getFileURL = async (path) => {
      let result = '';
      await getURL(path).then((v) => {
        result = v;
        setUrl(v);
      });
      return result;
    };
    getFileURL(data?.userInfo?.profileImg);
  }, [data?.userInfo?.profileImg]);

  return (
    <div className='h-full px-12 py-10'>
      <div className='rounded-md bg-white'>
        <div className='w-full px-4 py-5 border-b '>
          <h2 className='text-[#6B7A99] text-lg font-bold'>
            Admin Role Settings
          </h2>
        </div>

        <div className='grid grid-cols-12 px-4 gap-4 py-6'>
          <div className='col-span-3'>
            <div className='bg-[#F6F9FC] px-2 rounded-md'>
              <div className='w-full py-1 border-b '>
                <h2 className='text-[#A5A5A5] text-sm'>User</h2>
              </div>
              <div className='content py-4'>
                <div className='flex space-x-3 items-center'>
                  <Image
                    width={64}
                    height={64}
                    alt='Profile Picture'
                    className='rounded-full'
                    src={url}
                  />
                  <p>{`${data?.userInfo?.firstName ?? 'N/A'} ${
                    data?.userInfo?.lastName ?? ''
                  }`}</p>
                </div>
                <h2 className='text-[#A5A5A5] text-sm mt-8'>Roles</h2>

                <div className='border-y py-2 space-y-4'>
                  {data &&
                    data.userInfo?.role?.map((role, key) => (
                      <div
                        key={key}
                        className='bg-gray-200 rounded p-2 flex items-center justify-between'
                      >
                        <p className='capitalize'> {role.name} </p>
                        <button
                          onClick={() => {
                            setPermissions(
                              role.permissions as unknown as IRole[]
                            );
                          }}
                          className='text-[10px] text-[#016938]'
                        >
                          View Permission
                        </button>
                      </div>
                    ))}
                  {data && data.userInfo?.role?.length === 0 && (
                    <div className='bg-gray-200 rounded p-2 flex items-center justify-center'>
                      No role available for this user
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-9'>
            <div className='border'>
              <div className='border-b p-3 text-center'>
                <h2 className='font-bold text-base'>Super Admin Permissions</h2>
              </div>
              <div className='flex justify-end py-4 px-3'>
                {/* <button>Filter by type</button> */}
              </div>
              <div className='grid grid-cols-12 gap-4 px-3 py-3 text-sm font-semibold text-[#8898AA] bg-[#F6F9FC]'>
                <div className='col-span-3'>Action</div>
                {/* <div className='col-span-3'>Type</div> */}
                <div className='col-span-6'>Target</div>
              </div>
              {permissions.map((item: IRole, idx: number) => (
                <div
                  key={idx}
                  className='grid grid-cols-12 gap-4 text-[#8898AA] px-3 mt-4 items-center mb-5'
                >
                  <div className='col-span-3 uppercase font-bold'>
                    <p> {item.action} </p>
                  </div>

                  <div className='col-span-6 capitalize'>
                    <p> {item.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
