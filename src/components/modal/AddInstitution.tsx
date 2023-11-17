import LinkCard from '@/components/cards/LinkCard'
import React from 'react'

const AddInstitutionModal = () => {
  return (
    <div className='flex flex-col gap-12 justify-center max-w-[712px] md:px-8 md:py-6'>
      <div className='h2'>Select a registration type</div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-[14px]'>
        <LinkCard
          title='Send a link'
          href='/super-admin/add-school-with-link'
          description='You can send a link directly to the Institution so they can register there details.'
        />

        <LinkCard
          variant='secondary'
          title='Register Institution'
          href='/super-admin/add-school'
          description='Enter the details and register a Institution directly here.'
        />
      </div>
    </div>
  )
}

export default AddInstitutionModal