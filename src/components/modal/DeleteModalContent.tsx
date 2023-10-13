/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';

interface BasicModalProps {
  title: string;
  body: string;
  toggleModal: () => void;
  handleDelete: () => void;
}

export default function DeleteControlledModal({
  title, body, toggleModal, handleDelete
}: BasicModalProps) {

  return (

    <div className='flex flex-col space-y-4 items-center justify-center'>
      <div className='font-bold text-4xl'> {title} </div>
      <div className='text-base text-[#6B7A99]'>{body}</div>
      <div className='flex flex-row items-center justify-end space-x-4'>
        <Button
          onClick={toggleModal}
          className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'
        >
          Keep
        </Button>

        <Button
          onClick={handleDelete}
          variant='danger'
          className='flex flex-row items-center justify-center w-[168px] whitespace-nowrap'
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>

  );
}
