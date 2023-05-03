'use client';

import ManageRoles from '@/components/views/account-settings/ManageRoles';
import logger from '@/lib/logger';

const Page = () => {
  return (
    <ManageRoles
      onClose={() => {
        logger('');
      }}
    />
  );
};

export default Page;
