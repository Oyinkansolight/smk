/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PopOverSelect from '@/components/input/PopOverSelect';
import Select from '@/components/input/formSelect';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetParents } from '@/server/institution';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  handleParentId?: (id: string) => void;
};
const Contact = ({ handleParentId }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(['']);
  const [itemIndex, setItemIndex] = useState<null | number>(null);

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1500);

  const [pagingData, setPagingData] = useState<any>({
    page: 1,
    limit: 10,
    query,
  });

  const { error, refetch, data: parents } = useGetParents({ ...pagingData });

  const handleSearch = (value: string) => {
    logger(value);
    setQuery(value);
    setPagingData({ ...pagingData, page: 1, query: value });
  };

  const handleItemIndex = (index: number) => {
    setItemIndex(index);
  };

  useEffect(() => {
    const getSelectedParent = (index) => {
      if (!index) return;

      setSelectedParent([
        `${parents?.data[index]?.lastName} ${parents?.data[index]?.firstName}`,
      ]);
    };

    if (itemIndex) {
      getSelectedParent(itemIndex);
    }
  }, [itemIndex, parents?.data]);

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
        <Select
          onClick={() => setOpen(!open)}
          label='All Parents'
          options={selectedParent}
          formValue={selectedParent[0]}
        />
      </div>
    </section>
  );
};

export default Contact;
