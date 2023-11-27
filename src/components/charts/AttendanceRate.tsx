import EmptyView from '@/components/misc/EmptyView';
import clsxm from '@/lib/clsxm';
import { ResponsivePie } from '@nivo/pie';

interface AttendanceRateProps {
  data: {
    student: {
      present: number;
      absent: number;
      late: number;
    };
    staff: {
      present: number;
      absent: number;
      late: number;
    };
  };
  institute?: boolean;
}

const AttendanceRate = ({ data, institute }: AttendanceRateProps) => {
  const studentDataKeys = Object.keys(data.student ?? {});
  const staffDataKeys = Object.keys(data.staff ?? {});

  const parsedStudentData = studentDataKeys.map((item, idx) => ({
    id: item.toLowerCase(),
    label: item[0] + item.slice(1).toLowerCase(),
    value: data.student[item],
    color: idx === 0 ? '#E5002B' : idx === 1 ? '#EB973E' : '#2DCE89',
  }));

  const parsedStaffData = staffDataKeys.map((item, idx) => ({
    id: item.toLowerCase(),
    label: item[0] + item.slice(1).toLowerCase(),
    value: data.staff[item],
    color: idx === 0 ? '#E5002B' : idx === 1 ? '#EB973E' : '#2DCE89',
  }));

  const totalStudentSum = studentDataKeys.reduce((acc, curr) => {
    return acc + data.student[curr];
  }
    , 0);

  const totalStaffSum = staffDataKeys.reduce((acc, curr) => {
    return acc + data.staff[curr];
  }
    , 0);

  const isEmpty = !data || !studentDataKeys?.length || !staffDataKeys?.length;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    // <ChartWrapper className='bg-[#EDF5F2]' title='Attendance Rate'>
    <span className='flex flex-col gap-5'>
      <div className='flex flex-row gap-3'>
        <div className='flex flex-row gap-1'>
          <div className='w-5 h-5 bg-[#5754F7] rounded-[3px]' />
          <span className='text-sm font-medium'>Student</span>
        </div>

        <div className='flex flex-row gap-1'>
          <div className='w-5 h-5 bg-[#35CFFF] rounded-[3px]' />
          <span className='text-sm font-medium'>Teacher</span>
        </div>
      </div>

      <div className={clsxm(
        institute ? '' : '',
        'flex gap-2 justify-between'
      )}>
        {
          <div className='flex flex-col items-center text-center'>
            <div className={clsxm(
              // institute ? 'h-64 w-56' : 'h-[392px] lg:h-[262px] w-[2320x]' lg:w-[230px]',
              'h-[392px] lg:h-[262px] w-[320px] lg:w-[210px]'
            )}>
              {totalStudentSum > 0 ?
                <div className='flex justify-center items-center bg-[#5754F7] rounded-2xl p-3 lg:p-2 h-full max-h-[392px] lg:max-h-[322px] w-full max-w-[335px] lg:max-w-[230px]'>
                  <ResponsivePie
                    data={parsedStudentData}
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
                        direction: 'column',
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
                : (
                  <div className='mt-32 lg:mt-10'>
                    <EmptyView label='No Student Data' />
                  </div>
                )}
            </div>
          </div>
        }

        {
          <div className='flex flex-col items-center text-center'>
            <div className={clsxm(
              // institute ? 'h-64 w-56' : 'h-[392px] lg:h-[262px] w-[2320x]' lg:w-[220px]',
              'h-[392px] lg:h-[262px] w-[320px] lg:w-[210px]'
            )}>
              {totalStaffSum > 0 ?
                <div className='flex justify-center items-center bg-[#35CFFF] rounded-2xl p-3 lg:p-2 h-full max-h-[392px] lg:max-h-[322px] w-full max-w-[335px] lg:max-w-[230px]'>
                  <ResponsivePie
                    data={parsedStaffData}
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
                        direction: 'column',
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
                : (
                  <div className='mt-32 lg:mt-10'>
                    <EmptyView label='No Staff Data' />
                  </div>
                )}
            </div>
          </div>
        }
      </div>
    </span>
    // </ChartWrapper>
  )
};

export default AttendanceRate;
