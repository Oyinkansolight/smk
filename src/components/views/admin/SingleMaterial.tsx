import Button from '@/components/buttons/Button';
import { getURL } from '@/firebase/init';
import NewMaterial from '@/types/material';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SingleMaterial({
  material,
}: {
  material: NewMaterial;
}) {
  const [path, setPath] = useState<string>();
  useEffect(() => {
    getURL(material.documentPath).then((v) => setPath(v));
  }, [material.documentPath]);

  return (
    <div className='flex gap-4'>
      <Image
        className='object-cover'
        src={path ?? ''}
        width={100}
        height={300}
        alt='path'
      />
      <div className='flex flex-col gap-1'>
        <div className='font-bold text-lg'>{material?.title}</div>
        <div className='text-gray-600'>{material?.description}</div>
        <div className='text-gray-600'>{moment().format('MM/DD/YYYY')}</div>
      </div>
      <div className='flex flex-col gap-2'>
        <Button variant='outline'>View</Button>
        <a href={path} target='_blank'>
          <Button>Download</Button>
        </a>
      </div>
    </div>
  );
}
