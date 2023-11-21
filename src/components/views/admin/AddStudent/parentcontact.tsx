/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Select from '@/components/input/formSelect';
import PopOverSelect from '@/components/input/PopOverSelect';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetParents } from '@/server/institution';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

type Iprops = {
  handleParentId?: (id: string) => void
};
const Contact = ({ handleParentId }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState<null | number>(null);

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
  });

  const {
    error,
    refetch,
    data: parents,
  } = useGetParents({ ...pagingData });

  const handleSearch = (value: string) => {
    logger(value);
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index: number) => {
    setItemIndex(index);
  };

  const getSelectedParent = () => {
    if (!itemIndex) return [""];

    console.log(`${parents?.data[itemIndex]?.lastName} ${parents?.data[itemIndex]?.firstName}`);

    return [
      `${parents?.data[itemIndex]?.lastName} ${parents?.data[itemIndex]?.firstName}`
    ]
  };

  useEffect(() => {
    const searchRecords = () => {
      if (debouncedSearchTerm) {
        refetch();
      }
    };

    searchRecords();
  }, [refetch, pagingData, debouncedSearchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(getErrMsg(error));
    }
  }, [error]);

  // usseff

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Parent Details</h2>
      <p>Select student's parent below:</p>

      <PopOverSelect
        open={open}
        key1='lastName'
        key2='firstName'
        setOpen={setOpen}
        title='All Parents'
        data={parents?.data}
        handleSearch={handleSearch}
        description="Select student's parent"
        setSelectedItem={handleParentId}
        setSelectedIndex={handleItemIndex}
      />

      <div className='my-10'>
        <Select onClick={() => setOpen(!open)} label="All Parents" options={getSelectedParent()} />
      </div>
    </section>
  );
};

export default Contact;
