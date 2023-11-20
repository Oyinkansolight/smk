import EmptyView from '@/components/misc/EmptyView';
import { INSTITUTION_TYPES } from '@/constant/institution';
import clsxm from '@/lib/clsxm';
import moment from 'moment';
import Link from 'next/link';
import Castle from '~/svg/castle.svg';
import { usePathname } from 'next/navigation';
import { BiChevronRight } from 'react-icons/bi';

export default function RecentlyAddedInstitutions({ data }) {
  const routeDetails = usePathname();

  if (!data || !data.length) {
    return (
      <EmptyView label='No Institution Data' useStandardHeight />
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {data.slice(0, 5).map((item, idx) => (
          <InstitutionCard key={idx} data={item} />
        ))}
      </div>
      <div className='flex justify-center mt-2'>
        <Link
          className='flex items-center text my-2 px-4 text-lg text-[#5754F7] font-medium gap-2 hover:text-[#5754F7]'
          href={`${routeDetails}/all-school`}
        >
          <div>View All Institutions</div>
          <BiChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}

const InstitutionCard = ({ data }) => {
  const isECCDE = data?.instituteType ? data?.instituteType?.toLowerCase() === INSTITUTION_TYPES.ECCDE.toLowerCase() : false;
  const isTertiary = data?.instituteType ? data?.instituteType?.toLowerCase() === INSTITUTION_TYPES.TERTIARY.toLowerCase() : false;
  const isSecondary = data?.instituteType ? data?.instituteType?.toLowerCase() === INSTITUTION_TYPES.SECONDARY.toLowerCase() : false;
  const isPrimary = data?.instituteType ? data?.instituteType?.toLowerCase() === INSTITUTION_TYPES.PRIMARY.toLowerCase() || data.instituteType.toLowerCase() === 'basic' : false;

  return (
    <div className={clsxm(
      isECCDE && 'bg-[#FFFEF9] border-[#FFE664]',
      isPrimary && 'bg-[#FFF8F4] border-[#FFCAAB]',
      isTertiary && 'bg-[#F9FFFA] border-[#73ED95]',
      isSecondary && 'bg-[#FAFDFF] border-[#A4DEFF]',
      'flex flex-row justify-between border-[0.25px] border-l-2 rounded-lg p-2 h-[91px]',
    )}>
      <div className='text-sm flex flex-col items-start capitalize gap-2 font-medium whitespace-nowrap overflow-hidden'>
        <div className='text-[#525F7F] max-w-[150px] 2xl:max-w-[200px] text-ellipsis overflow-hidden'>{data.instituteName}</div>
        <div
          className={clsxm(
            isECCDE && 'bg-[#FFE664]',
            isPrimary && 'bg-[#FFCAAB]',
            isTertiary && 'bg-[#73ED95]',
            isSecondary && 'bg-[#6699B6]',
            'flex items-center text-[10px] px-[5px] h-5 font-normal text-white rounded-full capitalize'
          )}
        >
          {data.instituteType}
        </div>

        <div className='text-sm text-[#855201]'>Benin{data?.lga && `, ${data?.lga}`}</div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex gap-1 justify-center text-sm font-bold'>
          <span className='text-[#98988E] text-[10px] font-light'>Added:</span>
          {moment(data.createdAt).fromNow()}
        </div>

        <Castle className="h-8 w-8 self-end opacity-50" />
      </div>
    </div>
  )
}
