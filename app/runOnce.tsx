'use client';

import { useUpdateDeviceToken } from '@/server/auth';
import { useEffect } from 'react';

export default function RunOnce() {
  const handleUseUpdateDeviceToken = useUpdateDeviceToken();
  useEffect(() => {
    handleUseUpdateDeviceToken.mutateAsync();
  }, []);
  return <div></div>;
}
