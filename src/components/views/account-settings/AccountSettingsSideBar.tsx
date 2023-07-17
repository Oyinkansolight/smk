import AccordionAlt from '@/components/accordions/AccordionAlt';
import clsxm from '@/lib/clsxm';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export default function AccountSettingsSideBar({
  items,
  onClick,
  selected,
}: {
  selected: { item: number; child: number };
  items: { role: string; children: string[] }[];
  onClick: (idx: number, childId: number) => void;
}) {
  const [adminType, setAdminType] = useState<string | undefined>();

  useEffect(() => {
    const AT = Cookies.get('adminType');
    setAdminType(AT);
  }, [selected]);
  const normalAdminItem = items.filter((v) => v.role === 'BTVET');

  if (adminType === 'SUPER') {
    return (
      <div className='max-w-[250px]'>
        {items.map((v, i) => (
          <AccordionAlt
            isExpanded={selected.item === i}
            setIsExpanded={() => onClick(i, 0)}
            length={40 * v.children.length + 0}
            reversHeader
            titleExpandedClassName='border border-l-4 border-[#016938] rounded'
            key={i}
            titleClassName='rounded-none border border-l-4 border-transparent'
            title={<div>{v.role}</div>}
            icon={<BiChevronDown className='h-5 w-5 ' />}
          >
            <div>
              {v.children.map((u, j) => (
                <div
                  onClick={() => onClick(i, j)}
                  key={j}
                  className={clsxm(
                    'flex h-10 pl-10 pr-4 items-center',
                    selected.child === j && 'bg-green-100'
                  )}
                >
                  <div>{u}</div>
                </div>
              ))}
            </div>
          </AccordionAlt>
        ))}
      </div>
    );
  } else {
    return (
      <div className='max-w-[250px]'>
        {normalAdminItem.map((v, i) => (
          <AccordionAlt
            isExpanded={selected.item === i}
            setIsExpanded={() => onClick(i, 0)}
            length={40 * v.children.length + 0}
            reversHeader
            titleExpandedClassName='border border-l-4 border-[#016938] rounded'
            key={i}
            titleClassName='rounded-none border border-l-4 border-transparent'
            title={<div>{v.role}</div>}
            icon={<BiChevronDown className='h-5 w-5 ' />}
          >
            <div>
              {v.children.map((u, j) => (
                <div
                  onClick={() => onClick(i, j)}
                  key={j}
                  className={clsxm(
                    'flex h-10 pl-10 pr-4 items-center',
                    selected.child === j && 'bg-green-100'
                  )}
                >
                  <div>{u}</div>
                </div>
              ))}
            </div>
          </AccordionAlt>
        ))}
      </div>
    );
  }
}
