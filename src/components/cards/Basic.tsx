import React from 'react';

import clsxm from '@/lib/clsxm';

interface BasicCardProps {
  children: React.ReactNode;
  className?: string;
}

const BasicCard = ({ children, className }: BasicCardProps) => {
  return (
    <section
      className={clsxm(
        className && className,
        'mx-auto overflow-hidden rounded-[30px] bg-white p-6'
      )}
    >
      {children}
    </section>
  );
};

export default BasicCard;
