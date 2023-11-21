/* eslint-disable @typescript-eslint/no-explicit-any */
import ControlledModal from "@/components/modal/ControlledModal";
import { BasicSearch } from "@/components/search";
import clsxm from "@/lib/clsxm";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

interface PopOverSelectProps {
  data?: any[];
  key1: string;
  key2?: string;
  open: boolean;
  title: string;
  handleSearch?: any;
  description?: string;
  setOpen: (v: boolean) => void;
  setSelectedItem?: (v: string) => void;
  setSelectedIndex?: (v: number) => void;
}

const PopOverSelect = (props: PopOverSelectProps) => {
  const [selected, setSelected] = useState<null | number>(null);
  const handleToggle = () => props.setOpen(!open);

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
          <div className='flex flex-col justify-center gap-8 h-[30vh]'>
            <div className='flex flex-col gap-3 text-center'>
              <div className="h3 capitalize">{props.title}</div>
              {props.description && <div className="text-[#818181] text-lg">{props.description}</div>}
            </div>

            <div className="min-w-[90%] mx-auto">
              <BasicSearch
                placeholder='Search here...'
                handleSearch={props.handleSearch && props.handleSearch}
              />
            </div>

            <div className='flex flex-col gap-3'>
              {props.data?.map((item, index) => {
                if (!item[props.key1] || props.key2 && !item[props.key2]) return null;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(index);
                      props.setSelectedIndex && props.setSelectedIndex(index);
                      props.setSelectedItem && props.setSelectedItem(item.id);
                      setTimeout(() => {
                        handleToggle();
                      }, 100);
                    }}
                    className={clsxm(
                      'flex justify-between items-center cursor-pointer',
                      index === selected && 'border border-[#007AFF]',
                      "text-lg font-medium px-3 py-[3px] min-h-[30px] bg-gray-100 rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
                    )}
                  >
                    <div>{item[props.key1]} {props.key2 && item[props.key2]}</div>
                    {index === selected && <FaCheckCircle className="fill-current text-[#007AFF] h-4 w-4" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      }
    />
  )
}

export default PopOverSelect