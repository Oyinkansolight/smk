import Link from 'next/link';

export default function BreadCrumbs({
  items,
}: {
  items: { link?: string; label: string }[];
}) {
  return (
    <div className='text-3xl gap-3 text-[#D4D5D7] flex'>
      {items.map((v, i) => (
        <>
          <div key={i}>
            <Link href={v.link ?? ''} key={i}>
              {v.label}
            </Link>
          </div>
          {i < items.length - 1 && <div>{'>'}</div>}
        </>
      ))}
    </div>
  );
}
