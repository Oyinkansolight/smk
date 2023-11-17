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
  register: any;
  errors: any;
  getValues?: any
};
const Contact = ({ register, errors }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    // query,
  });

  const {
    data: parents,
    error,
    refetch,
  } = useGetParents({ ...pagingData });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  logger(parents);

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

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Parent Details</h2>
      <p>Select student's parent below:</p>

      <PopOverSelect
        data={[
          'Parent 1',
          'Parent 2',
          'Parent 3',
          'Parent 4',
        ]}
        open={open}
        title='All Parents'
        setOpen={setOpen}
        handleSearch={handleSearch}
        description="Select student's parent"
        setSelectedItemIndex={setSelectedItemIndex}
      />

      <div className='my-10'>
        <Select onClick={() => setOpen(!open)} label="All Parents" options={[]} />
      </div>
    </section>
  );
};

export default Contact;
