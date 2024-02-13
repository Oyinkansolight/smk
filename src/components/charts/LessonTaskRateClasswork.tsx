import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { ResponsivePie } from '@nivo/pie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiChevronRight } from 'react-icons/bi';

interface AttendanceRateProps {
  data: {
    CLASS_WORK: {
      early: number;
      late: number;
      missed: number;
    };
  };

  institute?: boolean;
  showLink?: boolean;
}

const LessonTaskRateClasswork = ({
  data,
  institute,
  showLink = false,
}: AttendanceRateProps) => {
  const routeDetails = usePathname();

  const classworkDataKeys = Object.keys(data.CLASS_WORK ?? {});

  const parsedClassworkData = classworkDataKeys.map((item, idx) => ({
    id: item.toLowerCase(),
    label: item[0] + item.slice(1).toLowerCase(),
    value: data.CLASS_WORK[item],
    color: idx === 0 ? 'tomato' : idx === 1 ? 'goldenrod' : 'lightblue',
  }));

  const totalCWSum = classworkDataKeys.reduce((acc, curr) => {
    return acc + data.CLASS_WORK[curr];
  }, 0);

  const isEmpty = !data || !classworkDataKeys?.length;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    // <ChartWrapper className='bg-[#EDF5F2]' title='Attendance Rate'>
    <span className='flex flex-col gap-5'>
      <div
        className={clsxm(
          institute ? '' : '',
          'flex flex-col gap-2 justify-between'
        )}
      >
        {
          //CLASSWORK_SECTION
          <div className='flex flex-col items-center text-center'>
            <div
              className={clsxm(
                // institute ? 'h-64 w-56' : 'h-[392px] lg:h-[262px] w-[2320x]' lg:w-[220px]',
                'h-[392px] w-[320px]'
              )}
            >
              {totalCWSum > 0 ? (
                <div className='flex justify-center items-center bg-[#c0c1c1] rounded-2xl p-3 lg:p-2 h-full max-h-[392px] w-full max-w-[335px]'>
                  <ResponsivePie
                    data={parsedClassworkData}
                    margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
                    colors={(p) => p.data.color}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    valueFormat={(v) => `${v}%`}
                    borderColor={{
                      from: 'color',
                      modifiers: [['darker', 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor='#000000'
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor='#ffffff'
                    enableArcLinkLabels={false}
                    legends={[
                      {
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        translateX: 10,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 70,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 10,
                        symbolShape: 'circle',
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemTextColor: '#000',
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              ) : (
                <div className='mt-32 lg:mt-10'>
                  <EmptyView label='No Classwork Submission' />
                </div>
              )}
            </div>
          </div>
        }
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
    </span>
    // </ChartWrapper>
  );
};

export default LessonTaskRateClasswork;
