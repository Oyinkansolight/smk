import clsxm from '@/lib/clsxm'
import Link from 'next/link'
import React, { useState } from 'react'

import PrimaryIcon from '~/svg/BlackCircleStar.svg'
import SecondaryIcon from '~/svg/BlueCircleStar.svg'

interface LinkCardProps {
  href: string
  title: string
  description: string
  variant?: 'primary' | 'secondary'
}

const LinkCard = ({ href, title, description, variant = 'primary' }: LinkCardProps) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Link
      href={href}
      onClick={() => setClicked(true)}
      className={clsxm(
        variant === 'primary' && 'bg-[#F8F8FF]',
        variant === 'secondary' && 'bg-[#F4F8FC]',
        clicked && variant === 'primary' && 'border-[0.25px] border-b-2 border-[#5A67D8]',
        clicked && variant === 'secondary' && 'border-[0.25px] border-b-2 border-[#006F93]',
        'w-full md:max-w-[318px] h-[180px] rounded-lg shadow-md p-4 overflow-hidden'
      )}>
      <div className='flex flex-col gap-4'>
        <div>
          {variant === 'primary' && <PrimaryIcon className="w-[58px] h-[58px]" />}
          {variant === 'secondary' && <SecondaryIcon className="w-[58px] h-[58px]" />}
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-base md:text-xl font-bold'>{title}</div>


          <div className='text-sm font-medium text-[#7F7F7F] line-clamp-2'>{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default LinkCard