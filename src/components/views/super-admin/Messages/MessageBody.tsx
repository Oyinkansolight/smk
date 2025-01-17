import DownloadFile from '@/lib/helper';
import { messages } from '@/types/comms';
import moment from 'moment';
import { BsFillReplyFill } from 'react-icons/bs';
import { RiShareForwardFill } from 'react-icons/ri';

type propType = {
  reply?: () => void;
  message?: messages | undefined;
};
export default function MessageBody({ reply, message }: propType) {
  const HandleAttachMent = async () => {
    message?.files.map(async (file) => {
      DownloadFile(file.fileUrl);
    });
  };
  return (
    <div className='grid grid-cols-12 gap-6 px-4 bg-transparent'>
      <div className='col-span-1 pt-11'>
        <svg
          width='44'
          height='44'
          viewBox='0 0 44 44'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.0095 34.2788C11.0334 32.4733 11.7671 30.7499 13.0519 29.4813C14.3367 28.2127 16.0693 27.5009 17.8749 27.5H26.1249C27.9305 27.5009 29.6631 28.2127 30.9479 29.4813C32.2327 30.7499 32.9664 32.4733 32.9903 34.2788C29.9747 36.9962 26.0593 38.5001 21.9999 38.5001C17.9405 38.5001 14.0251 36.9962 11.0095 34.2788ZM28.1874 17.1875C28.1874 18.4113 27.8245 19.6076 27.1446 20.6251C26.4647 21.6426 25.4984 22.4357 24.3678 22.904C23.2371 23.3723 21.993 23.4949 20.7928 23.2561C19.5925 23.0174 18.49 22.4281 17.6247 21.5627C16.7593 20.6974 16.17 19.5949 15.9313 18.3946C15.6925 17.1944 15.8151 15.9503 16.2834 14.8196C16.7517 13.689 17.5448 12.7227 18.5623 12.0428C19.5798 11.3629 20.7761 11 21.9999 11C23.6409 11 25.2147 11.6519 26.3751 12.8123C27.5355 13.9727 28.1874 15.5465 28.1874 17.1875Z'
            fill='white'
          />
          <path
            d='M33.5357 31.5677C35.0755 29.7165 36.1465 27.5221 36.658 25.17C37.1695 22.8178 37.1065 20.3772 36.4743 18.0545C35.8421 15.7319 34.6593 13.5955 33.0261 11.8262C31.3928 10.0569 29.3571 8.70662 27.0911 7.88966C24.8251 7.07271 22.3955 6.81309 20.0078 7.13277C17.6202 7.45245 15.3447 8.34203 13.3739 9.72624C11.4031 11.1105 9.79494 12.9486 8.68548 15.0851C7.57602 17.2217 6.9979 19.5938 7.00001 22.0008C7.00082 25.4999 8.2349 28.887 10.4857 31.5677L10.4643 31.5859C10.5393 31.6759 10.6251 31.753 10.7023 31.8419C10.7988 31.9523 10.9028 32.0562 11.0025 32.1633C11.3027 32.489 11.6115 32.8018 11.9353 33.0954C12.034 33.1853 12.1358 33.2689 12.2355 33.3546C12.5786 33.6503 12.9314 33.931 13.297 34.1924C13.3442 34.2245 13.3871 34.2663 13.4342 34.2995V34.2867C15.9454 36.0524 18.9411 37 22.0118 37C25.0825 37 28.0782 36.0524 30.5894 34.2867V34.2995C30.6365 34.2663 30.6783 34.2245 30.7266 34.1924C31.0911 33.9299 31.445 33.6503 31.7881 33.3546C31.8878 33.2689 31.9896 33.1843 32.0883 33.0954C32.4121 32.8007 32.7209 32.489 33.0211 32.1633C33.1208 32.0562 33.2237 31.9523 33.3213 31.8419C33.3974 31.753 33.4843 31.6759 33.5593 31.5848L33.5357 31.5677ZM22.0107 13.4303C22.965 13.4303 23.8978 13.713 24.6913 14.2428C25.4847 14.7725 26.1031 15.5254 26.4683 16.4063C26.8335 17.2872 26.9291 18.2566 26.7429 19.1917C26.5567 20.1269 26.0972 20.9859 25.4224 21.6601C24.7477 22.3343 23.8879 22.7935 22.952 22.9795C22.0161 23.1655 21.046 23.0701 20.1643 22.7052C19.2827 22.3403 18.5292 21.7224 17.999 20.9296C17.4688 20.1368 17.1859 19.2047 17.1859 18.2512C17.1859 16.9726 17.6942 15.7464 18.599 14.8423C19.5039 13.9382 20.7311 13.4303 22.0107 13.4303ZM13.4407 31.5677C13.4593 30.161 14.0314 28.8182 15.0333 27.8298C16.0351 26.8414 17.3862 26.2868 18.7941 26.2861H25.2273C26.6353 26.2868 27.9863 26.8414 28.9882 27.8298C29.9901 28.8182 30.5622 30.161 30.5808 31.5677C28.2293 33.6849 25.1761 34.8567 22.0107 34.8567C18.8453 34.8567 15.7922 33.6849 13.4407 31.5677Z'
            fill='#D4D5D7'
          />
        </svg>
      </div>
      <div className='col-span-11 p-4'>
        <h1 className='text-base font-medium mb-4'>
          {' '}
          {message?.messageTitle}{' '}
        </h1>
        <div className='flex justify-between'>
          <div className='flex space-x-5'>
            <p>{message?.sender.firstName}</p>
            <p className='text-gray-400'>({message?.sender.email})</p>
          </div>
          <div className='text-gray-400'>
            {moment(message?.createdAt).subtract(1, 'hours').format('LT')}{' '}
            {moment(message?.createdAt)
              .add(1, 'hours')
              .startOf('hour')
              .fromNow()}
          </div>
        </div>

        <div className='mt-8 space-y-5'>
          <p>Hello,</p>

          <p>{message?.messageBody}</p>

          {message && message?.files?.length > 0 && (
            <button
              onClick={() => {
                HandleAttachMent();
              }}
              className='text-blue-400 text-sm'
            >
              Download Attachment
            </button>
          )}

          {message && message?.type === 'SIMPLE' && (
            <div className='flex space-x-4 mt-8'>
              <button
                onClick={reply}
                className='border-2 border-gray-500 p-3 flex space-x-3 rounded-lg items-center '
              >
                {' '}
                <BsFillReplyFill size={22} /> <p>Reply</p>
              </button>
              <button className='border-2 border-gray-500 p-3 flex space-x-3 rounded-lg items-center '>
                {' '}
                <RiShareForwardFill size={20} />
                <p>Forward</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
