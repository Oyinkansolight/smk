import IDImage from '~/svg/id_image.svg';
import IDlogo from '~/svg/id_logo.svg';
import IDQr from '~/svg/qr.svg';

const BasicCard = () => {
  return (
    <section className='w-[350px] border rounded-lg p-4'>
      <IDlogo className='w-[350px] h-16' />

      <div className='flex items-end space-x-2 transform -translate-y-[40px] mt-2'>
        <IDImage className='w-[90px] h-[90px]' />
        <div className='w-1/2 flex flex-col '>
          <h2 className='text-sm font-medium'>John Doe</h2>
          <div className='bg-primary px-2 py-1 rounded-[25px] text-white w-max '>
            {' '}
            Teacher
          </div>
        </div>
        <IDQr className='w-[40px] h-[40px]' />
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-sm font-normal'>ID Number:</h1>
          <p className='font-bold mb-5'>0000000</p>

          <h1 className='text-sm font-normal'>Unit</h1>
          <p className='font-bold '>Local Government</p>
        </div>
        <div>
          <h1 className='text-sm font-normal'>Signature</h1>
        </div>
      </div>
    </section>
  );
};

export default BasicCard;
