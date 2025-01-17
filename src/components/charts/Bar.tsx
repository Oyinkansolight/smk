/* eslint-disable @typescript-eslint/no-explicit-any */
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import EmptyView from '@/components/misc/EmptyView';
import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiChevronRight } from 'react-icons/bi';

const BarChart = ({
  data,
  showLink = false,
  setEndPeriod,
  setStartPeriod,
}: {
  data: any;
  showLink?: boolean;
  setEndPeriod?: (v: Date) => void;
  setStartPeriod?: (v: Date) => void;
}) => {
  const routeDetails = usePathname();

  const dateData = {};

  if (data?.Monday) dateData['Monday'] = data?.Monday;
  if (data?.Tuesday) dateData['Tuesday'] = data?.Tuesday;
  if (data?.Wednesday) dateData['Wednesday'] = data?.Wednesday;
  if (data?.Thursday) dateData['Thursday'] = data?.Thursday;
  if (data?.Friday) dateData['Friday'] = data?.Friday;

  const dataKeys = Object.keys(dateData ?? {});
  const parsedData = dataKeys.map((item) => ({
    day: item.slice(0, 3),
    staffColor: '#BF74FF',
    studentColor: '#FFB62B',
    staff: dateData[item].staff,
    student: dateData[item].student,
  }));

  const totalSum = dataKeys.reduce((acc, curr) => {
    return acc + dateData[curr].student + dateData[curr].staff;
  }, 0);

  const isEmpty =
    !dateData || !dataKeys?.length || !parsedData?.length || totalSum === 0;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='h-[368px]'>
        <ResponsiveBar
          groupMode='grouped'
          data={parsedData}
          keys={['student', 'staff']}
          indexBy='day'
          innerPadding={0}
          margin={{ top: 50, right: 30, bottom: 60, left: 30 }}
          padding={0}
          valueScale={{ type: 'linear' }}
          colors={(p) =>
            p.data[`${p.id}Color` as keyof (typeof data)[number]] as string
          }
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          enableGridY={true}
          borderRadius={6}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-left',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -50,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>

      {data?.Range?.start && data?.Range?.end && (
        <div className='flex flex-row items-center justify-center mx-auto gap-2'>
          <span className='font-semibold'>Date Range:</span>
          <span className='font-medium'>
            {moment(data?.Range?.start).format('ll')} -{' '}
            {moment(data?.Range?.end).format('ll')}
          </span>
        </div>
      )}

      <div className='flex space-x-2  justify-center items-center'>
        <div>
          <input
            type='date'
            onChange={(e) => {
              setStartPeriod && setStartPeriod(e.target.value as any);
            }}
            className='ring-0 outline-none border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <input
            type='date'
            onChange={(e) => {
              setEndPeriod && setEndPeriod(e.target.value as any);
            }}
            className='ring-0 outline-none border-gray-300 rounded-lg'
          />
        </div>
      </div>

      {showLink && (
        <div className='flex justify-center mt-2'>
          <Link
            className='flex items-center text my-2 px-4 text-lg text-[#5754F7] font-medium gap-2 hover:text-[#5754F7]'
            href={`${routeDetails}/attendance`}
          >
            <div>View All</div>
            <BiChevronRight className='h-5 w-5' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BarChart;
