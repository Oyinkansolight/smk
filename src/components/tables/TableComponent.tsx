/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasicSearch } from '@/components/search';
import DataTable, { TableProps } from 'react-data-table-component';

export default function Table<T>(
  props: TableProps<T> & {
    filterFields?: (keyof T)[];
    showFilter?: boolean;
    showSearch?: boolean;
    bottomPadding?: number;
    handleSearchParam?: (value: string) => void;
  }
) {
  // const [filterText, setFilterText] = useState('');

  // const filteredData = useMemo(() => {
  //   if (filterText.length > 2) {
  //     const nData: T[] = [];
  //     for (let j = 0; j < props.data.length; j++) {
  //       const dataItem = props.data[j];
  //       let keys: (keyof T)[] = [];
  //       if (props.filterFields || dataItem) {
  //         keys =
  //           props.filterFields ??
  //           (Object.keys(dataItem as any) as unknown as (keyof T)[]);
  //       }
  //       for (let i = 0; i < keys.length; i++) {
  //         const key = keys[i];

  //         if (
  //           typeof dataItem[key] === 'string' &&
  //           (dataItem[key] as string)
  //             .toLowerCase()
  //             .includes(filterText.toLocaleLowerCase())
  //         ) {
  //           nData.push(dataItem);
  //           break;
  //         }
  //       }
  //     }
  //     return nData;
  //   }
  //   return props.data;
  // }, [filterText, props.data, props.filterFields]);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          {props.showFilter && (
            <select
              name=''
              className='border-none bg-transparent outline-none'
            >
              <option value=''>Filter</option>
            </select>
          )}
          {props.showSearch ||
            (props.showSearch === undefined && (
              <BasicSearch
                placeholder='Search User Name/ID'
                handleSearch={props.handleSearchParam}
              />
            ))}
        </div>
      </div>
      <DataTable
        customStyles={{
          table: {
            style: { backgroundColor: 'transparent', padding: '0 0 200px 0' },
          },
          rows: { style: { backgroundColor: '#00000000', color: '#8898AA' } },
          headRow: {
            style: {
              backgroundColor: 'rgb(243, 244, 246)',
              color: '#8898AA',
              fontWeight: 600,
            },
          },
          progress: {
            style: {
              backgroundColor: 'transparent',
            },
          },
        }}
        {...props}
        data={props.data}
        pagination
        paginationPerPage={10}
      />
    </div>
  );
}
