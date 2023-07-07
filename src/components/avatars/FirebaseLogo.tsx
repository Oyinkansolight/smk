import { getURL } from '@/firebase/init';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AvrilImage from '~/svg/avril.svg';

export default function FirebaseLogo({
  path,
  sizePixels = 20,
  fromFirebase = true,
}: {
  path?: string;
  sizePixels?: number;
  fromFirebase?: boolean;
}) {
  const [url, setUrl] = useState<string | undefined>();
  useEffect(() => {
    const run = async () => {
      if (path) {
        if (fromFirebase) {
          try {
            setUrl(
              await getURL(
                path.includes('institute_materials')
                  ? path
                  : `/institute_materials/${path}`
              )
            );
          } catch (error) {
            return;
          }
        } else {
          setUrl(
            path.includes('placeimg') || path.includes('picsum')
              ? path
              : `/${path}`
          );
        }
      }
    };
    run();
  }, [fromFirebase, path]);
  return url ? (
    <div
      style={{
        height: `${sizePixels}px`,
        width: `${sizePixels}px`,
        position: 'relative',
        borderRadius: '400px',
        overflow: 'hidden',
      }}
    >
      <Image
        className='rounded-full overflow-hidden object-cover'
        src={url}
        alt={url}
        fill
      />
    </div>
  ) : (
    <AvrilImage
      alt='avril'
      style={{ height: `${sizePixels}px`, width: `${sizePixels}px` }}
      className='h-8 w-8 rounded-full'
    />
  );
}
