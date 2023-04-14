import clsxm from '@/lib/clsxm';
import React from 'react';

interface BasicCardProps {
  children: React.ReactNode;
  className?: string;
}

const BasicCard = ({ children, className }: BasicCardProps) => {
  return (
    <section
      className={clsxm(
        className && className,
        'overflow-hidden rounded-[30px] bg-white p-6 shadow-sm'
      )}
    >
      {children}
    </section>
  );
};

export default BasicCard;
