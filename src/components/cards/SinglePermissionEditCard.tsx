import AccordionAlt from '@/components/accordions/AccordionAlt';
import CircularCheckboxPrimary from '@/components/input/CircularCheckboxPrimary';
import Input from '@/components/input/Toggle';
import clsxm from '@/lib/clsxm';
import { useEffect, useState } from 'react';

const p = ['can create', 'can view', 'can update', 'can delete'];

export default function SinglePermissionEditCard({
  title,
  permissions,
  isEditing,
}: {
  isEditing: boolean;
  title: string;
  permissions: string[];
}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [_p, _setP] = useState<Record<string, boolean[]>>({});
  useEffect(() => {
    const t: Record<string, boolean[]> = {};
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      t[permission] = [true, true, true, true];
    }
    _setP(t);
  }, [permissions]);

  return (
    <AccordionAlt
      titleClassName='bg-[#F6F6F6] rounded-none'
      isExpanded={hasPermission}
      length={64 * permissions.length}
      setIsExpanded={() => {
        if (isEditing) {
          setHasPermission(!hasPermission);
        }
      }}
      title={
        <div className='flex justify-between border-none items-center'>
          <div className='text-xl font-bold'>{title}</div>
          {isEditing ? (
            <Input
              reverse
              label={{ on: 'Yes', off: 'No' }}
              setactivity={(v) => {
                setHasPermission(v);
              }}
              activity={hasPermission}
            />
          ) : hasPermission ? (
            'Yes'
          ) : (
            'No'
          )}
        </div>
      }
      icon={<div />}
    >
      <div>
        {permissions.map((v, i) => (
          <div className='flex p-4 text-[#333333]' key={i}>
            <div className='flex-1 font-bold'>{v}</div>
            {p.map(
              (_, i) =>
                _p[v] && (
                  <div key={i} className='flex w-28 gap-2 items-center'>
                    <div
                      className={clsxm(!isEditing && !_p[v][i] && 'hidden')}
                      key={i}
                    >
                      {_}
                    </div>
                    {_p[v] && (
                      <div className='w-8 h-8 flex items-center'>
                        <CircularCheckboxPrimary
                          className={clsxm(!isEditing && 'hidden')}
                          checked={_p[v][i]}
                          onClick={() => {
                            const n = { ..._p };
                            n[v][i] = !n[v][i];
                            _setP(n);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </AccordionAlt>
  );
}
