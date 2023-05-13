import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Badge from '~/svg/badge_1.svg';

const generalDetails = [
  { title: 'School Name', value: 'Avril Price School' },
  { title: 'Email Address', value: 'school@mail.com' },
  { title: 'Official Phone Number', value: '093939383839' },
];
const locationDetails = [
  { title: 'School Name', value: 'Avril Price School' },
  { title: 'School Name', value: 'Avril Price School' },
  { title: 'School Name', value: 'Avril Price School' },
];
export default function GeneralSettingsView() {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  return (
    <div>
      <div
        className={clsxm(
          'flex my-4 justify-end gap-x-4',
          isEdit && 'opacity-30'
        )}
      >
        <Button
          disabled={isEdit}
          variant='secondary'
          className='bg-white border-secondary border text-secondary'
          onClick={() => router.push('/admin/account-settings/edit-history')}
        >
          View Change History
        </Button>
        <Button
          variant='secondary'
          disabled={isEdit}
          onClick={() => setIsEdit(true)}
        >
          Edit Account Details
        </Button>
      </div>
      <div className='bg-white px-6'>
        <div className='text-[#6B7A99] flex justify-between font-bold py-4 text-lg'>
          <div>Account Details</div>
          {isEdit && (
            <Button variant='secondary' onClick={() => setIsEdit(false)}>
              Update Details
            </Button>
          )}
        </div>
        <div className='h-[2px] bg-gray-200' />
        <div className='h-8' />
        <div className='flex'>
          <div>
            <div className='py-12 px-16 rounded-md bg-[#F4F9FF]'>
              <Badge className='h-20 w-20' />
            </div>
          </div>
          {isEdit ? (
            <div className='flex-1 px-32 flex flex-col gap-y-8'>
              <div className='font-bold text-xl'>General Details</div>
              {generalDetails.map((v, i) => (
                <div key={i}>
                  <div>
                    <BaseInput
                      label={
                        <div>
                          {v.title}
                          <span className='text-[#E5A500]'>*</span>
                        </div>
                      }
                      name={v.title}
                    />
                  </div>
                </div>
              ))}
              <div className='font-bold text-xl'>Location Details</div>
              {locationDetails.map((v, i) => (
                <div key={i}>
                  <div>
                    <BaseInput
                      label={
                        <div>
                          {v.title}
                          <span className='text-[#E5A500]'>*</span>
                        </div>
                      }
                      name={v.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex-1 px-32 flex flex-col gap-y-8'>
              <div className='font-bold text-xl'>General Details</div>
              {generalDetails.map((v, i) => (
                <DisplayItemLabel title={v.title} subtitle={v.value} key={i} />
              ))}
              <div className='font-bold text-xl'>Location Details</div>
              {locationDetails.map((v, i) => (
                <DisplayItemLabel title={v.title} subtitle={v.value} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DisplayItemLabel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className='border-[2px]  border-[#F5F6F7] rounded-md'>
      <div className='p-4'>{title}</div>
      <div className='h-[2px] bg-[#F5F6F7]' />
      <div className='h-16 px-4 text-[#6B7A99] flex items-center'>
        <div>{subtitle}</div>
      </div>
    </div>
  );
}
