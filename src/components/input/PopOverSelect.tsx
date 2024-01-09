/* eslint-disable @typescript-eslint/no-explicit-any */
import ControlledModal from '@/components/modal/ControlledModal';
import { BasicSearch } from '@/components/search';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';

interface PopOverSelectProps {
  data?: any[];
  key1: string;
  key2?: string;
  open: boolean;
  title: string;
  handleSearch?: any;
  description?: string;
  totalPages?: number | string;
  setOpen: (v: boolean) => void;
  setSelectedItem?: (v: string) => void;
  setSelectedIndex?: (v: number) => void;
  handlePrevPage?: (page: number) => void;
  handleNextPage?: (page: number) => void;
  setSelectedItemName?: (v: string) => void;
}

const PopOverSelect = (props: PopOverSelectProps) => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<null | number>(null);
  const handleToggle = () => props.setOpen(!open);

  function resolveProp(path: string, obj: any) {
    if (path.includes('.')) {
      return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
      }, obj || self);
    } else {
      return obj[path];
    }
  }
  // useEffect(() => {
  //   console.log("props.data", props.data);

  // }, [props.data]);

  return (
    <ControlledModal
      isOpen={props.open}
      closeIcon={false}
      toggleModal={handleToggle}
      className='w-screen h-[95vh] !overflow-y-auto px-[6px] md:px-14 py-12 lg:py-6 max-w-[800px]'
      content={
        <div className='relative'>
          <div
            onClick={handleToggle}
            className='flex flex-row items-center gap-1 text-[#808080] absolute -top-10 right-2 md:right-10 lg:right-[10%] cursor-pointer'
          >
            Close
            <AiOutlineClose className='fill-current' />
          </div>
          <div className='flex flex-col justify-center gap-8 h-[70vh]'>
            <div className='flex flex-col gap-3 text-center'>
              <div className='h3 capitalize'>{props.title}</div>
              {props.description && (
                <div className='text-[#818181] text-lg'>
                  {props.description}
                </div>
              )}
            </div>

            <div className='min-w-[90%] mx-auto'>
              <BasicSearch
                placeholder='Search here...'
                handleSearch={props.handleSearch && props.handleSearch}
              />
            </div>

            <div className='flex flex-col gap-3'>
              {props.data?.map((item, index) => {
                if (
                  !resolveProp(props.key1, item) ||
                  (props.key2 && !resolveProp(props.key2, item))
                )
                  return null;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(index);
                      props.setSelectedIndex && props.setSelectedIndex(index);
                      props.setSelectedItem && props.setSelectedItem(item.id);
                      props.setSelectedItemName &&
                        props.setSelectedItemName(
                          `${resolveProp(props.key1, item)} ${
                            props.key2 ? resolveProp(props.key2, item) : ''
                          }`
                        );
                      setTimeout(() => {
                        handleToggle();
                      }, 100);
                    }}
                    className={clsxm(
                      'flex justify-between items-center cursor-pointer',
                      index === selected && 'border border-[#007AFF]',
                      'text-lg font-medium px-3 py-[3px] min-h-[30px] bg-gray-100 rounded-md whitespace-nowrap overflow-hidden text-ellipsis'
                    )}
                  >
                    <div>
                      {resolveProp(props.key1, item)}{' '}
                      {props.key2 && resolveProp(props.key2, item)}
                    </div>
                    {index === selected && (
                      <FaCheckCircle className='fill-current text-[#007AFF] h-4 w-4' />
                    )}
                  </div>
                );
              })}

              {props.data?.length === 0 && (
                <div className='text-center text-lg text-[#818181]'>
                  No data found
                </div>
              )}

              {/* <div className='flex justify-center items-center mt-3 gap-10'>
                <Button
                  disabled={page === 1}
                  onClick={() => {
                    props.handlePrevPage && props.handlePrevPage(page - 1);
                    setPage(page - 1);
                  }}
                >
                  Prev
                </Button>
                <div>{page}</div>
                <Button
                  disabled={
                    props?.totalPages ? page === props?.totalPages : false
                  }
                  onClick={() => {
                    props.handleNextPage && props.handleNextPage(page + 1);
                    setPage(page + 1);
                  }}
                >
                  Next
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PopOverSelect;
