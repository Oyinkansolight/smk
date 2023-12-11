/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { ImSpinner } from 'react-icons/im';

interface BasicModalProps {
  title: string;
  body: string;
  toggleModal: () => void;
  handleAction: () => void;
  loading?: boolean;
}

export default function DeleteControlledModal({
  title,
  body,
  toggleModal,
  handleAction,
  loading,
}: BasicModalProps) {
  return (
    <div className='flex flex-col space-y-4 items-center justify-center'>
      <div className='font-bold text-4xl'> {title} </div>
      <div className='text-base text-[#6B7A99]'>{body}</div>
      <div className='flex flex-row items-center justify-end space-x-4'>
        <Button
          onClick={toggleModal}
          variant='danger'
          className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'
        >
          Cancel
        </Button>

        <Button
          onClick={handleAction}
          variant='primary'
          className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'
        >
          {loading ? <ImSpinner /> : 'Proceed'}
        </Button>
      </div>
    </div>
  );
}
