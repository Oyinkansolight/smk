/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrClose } from 'react-icons/gr';
import { useSessionStorage } from 'usehooks-ts';

interface AddSubjectViewProps {
  closeModal?: () => void;
}

export default function ProfileChanges({ closeModal }: AddSubjectViewProps) {
  const [profileChanges] = useSessionStorage(
    'profile_update_changes',
    {} as any
  );
  function renderObject(obj) {
    return (
      <ul>
        {Object.entries(obj).map(([key, value]) => (
          <li key={key} className='p-1 border-b'>
            {typeof value === 'object' ? (
              <div className='pl-2'>
                <h5 className='font-semibold text-gray-500 my-4 capitalize'>
                  {key}
                </h5>
                {renderObject(value ?? {})}
              </div>
            ) : (
              <p>
                <span className='font-medium capitalize'>{key}:</span>{' '}
                <span>{value as unknown as string}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-2'>
        <h4>Profile Changes</h4>
        <button
          className='bg-black rounded-full p-2'
          onClick={() => {
            closeModal && closeModal();
          }}
        >
          <GrClose className='text-white font-bold' />
        </button>
      </div>
      <div>{renderObject(profileChanges)}</div>
    </div>
  );
}
