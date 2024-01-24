import clsxm from '@/lib/clsxm';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

export default function Paginator({ setPagingData, pagingData, data }) {
  const handleCurrentPage = (page: number) => {
    setPagingData({ ...pagingData, page });
    console.log(page);
  };

  const handleNextPage = () => {
    setPagingData({ ...pagingData, page: pagingData.page + 1 });
  };

  const handlePrevPage = () => {
    if (pagingData.page === 1) return;
    setPagingData({ ...pagingData, page: pagingData.page - 1 });
  };

  const handleJumpToStart = () => {
    setPagingData({ ...pagingData, page: 1 });
  };

  const handleJumpToEnd = () => {
    if (data) setPagingData({ ...pagingData, page: data?.paging?.totalPage });
  };

  return (
    <div>
      {data && data?.data?.length > 0 && (
        <div className='lg:min-w-[800px] my-4 flex items-center justify-center lg:justify-end space-x-3 lg:pr-10'>
          <button
            onClick={handleJumpToStart}
            disabled={pagingData.page === 1}
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <BiChevronsLeft />
          </button>

          <button
            onClick={handlePrevPage}
            disabled={pagingData.page === 1}
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </button>

          {Array(data?.paging?.totalPage)
            .fill(0)
            .slice(0, 2)
            .map((item, idx: number) => (
              <div
                key={Math.random() * 100}
                onClick={() => handleCurrentPage(idx + 1)}
                className={clsxm(
                  pagingData.page === idx + 1
                    ? 'bg-[#008146] text-white'
                    : 'bg-white text-gray-500',
                  'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
                )}
              >
                {idx + 1}
              </div>
            ))}

          {data?.paging?.totalPage > 3 && (
            <div
              key={Math.random() * 100}
              onClick={() =>
                handleCurrentPage(
                  pagingData.page > 3 && pagingData.page < data.paging.totalPage
                    ? pagingData.page
                    : 3
                )
              }
              className={clsxm(
                pagingData.page === 3 ||
                  (pagingData.page > 3 &&
                    pagingData.page < data.paging.totalPage)
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
              )}
            >
              {pagingData.page > 3 && pagingData.page < data.paging.totalPage
                ? pagingData.page
                : 3}
            </div>
          )}

          {data?.paging?.totalPage > 4 && (
            <div
              key={Math.random() * 100}
              className={clsxm(
                'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2'
              )}
            >
              ...
            </div>
          )}

          {data?.paging?.totalPage > 1 && (
            <div
              onClick={() => handleCurrentPage(data.paging.totalPage)}
              className={clsxm(
                pagingData.page === data.paging.totalPage
                  ? 'bg-[#008146] text-white'
                  : 'bg-white text-gray-500',
                'grid h-7 w-7 place-content-center rounded-full border p-2 cursor-pointer'
              )}
            >
              {data?.paging?.totalPage}
            </div>
          )}

          <button
            onClick={handleNextPage}
            disabled={
              (data && data?.data?.length < 10) ||
              pagingData.page === data.paging.totalPage
            }
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'
          >
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </button>

          <button
            onClick={handleJumpToEnd}
            disabled={
              (data && data?.data?.length < 10) ||
              pagingData.page === data.paging.totalPage
            }
            className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300 cursor-pointer'
          >
            <BiChevronsRight />
          </button>
        </div>
      )}
    </div>
  );
}
