import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return <div className='max-h-[100vh] bg-[#F5F5F5]'>{children}</div>;
}
