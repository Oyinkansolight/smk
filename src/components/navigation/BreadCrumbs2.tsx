import clsxm from '@/lib/clsxm';
import Link from 'next/link';

export default function BreadCrumbs2({
  items,
}: {
  items: { link?: string; label: string }[];
}) {
  return (
    <div className='gap-3 text-[#BFBFBF] flex rounded-full p-2 border border-gray-200'>
      {items.map((v, i) => (
        <>
          <div key={i}>
            <Link className={clsxm(i === items.length-1 && 'text-[#5754F7] font-bold')} href={v.link ?? ''} key={i}>
              {v.label}
            </Link>
          </div>
          {i < items.length - 1 && <div>{'/'}</div>}
        </>
      ))}
    </div>
  );
}
