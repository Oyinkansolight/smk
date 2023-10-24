import CountCardAlt from '@/components/cards/CountAlt'
import { ADMIN_ROUTES } from '@/constant/routes'
import { useGetInstitutionDashboardOverview } from '@/server/dashboard';
import React from 'react'

const DashboardCounts = () => {
  const { data } = useGetInstitutionDashboardOverview();

  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2  gap-3 md:gap-[20px] xl:gap-[27px]'>
      <CountCardAlt
        count={data?.Total_Students ?? 0}
        title='Total Students'
        viewAllLabel='View All Students'
        url={ADMIN_ROUTES.ALL_STUDENTS} />
      <CountCardAlt
        count={data?.Total_Staff ?? 0}
        title='Total Staff'
        viewAllLabel='View All Staff'
        url={ADMIN_ROUTES.ALL_STAFF}
        variant={1} />
      <CountCardAlt
        count={data?.Total_Grades ?? 0}
        title='Total Classes'
        viewAllLabel='View All Classes'
        url={ADMIN_ROUTES.ALL_GRADES}
        variant={2} />
    </div>
  )
}

export default DashboardCounts