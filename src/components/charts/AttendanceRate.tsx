import EmptyView from '@/components/misc/EmptyView';
import { ResponsivePie } from '@nivo/pie';

const AttendanceRate = ({ data }) => {
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
    <div className='flex gap-1 justify-between px-6'>
      {
        <div className='flex flex-col items-center text-center'>
          <div className='h4'>Staff Attendance</div>
          <div className='h-80 w-56'>
            {totalStaffSum > 0 ?
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
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 70,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
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
              /> : (
                <EmptyView label='No Staff Data' useStandardHeight />
              )}
          </div>
        </div>
      }
      {
        <div className='flex flex-col items-center text-center'>
          <div className='h4'>Student Attendance</div>
          <div className='h-80 w-56'>
            {totalStudentSum > 0 ?
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
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 70,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
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
              /> : (
                <EmptyView label='No Student Data' useStandardHeight />
              )}
          </div>
        </div>
      }
    </div>
    // </ChartWrapper>
  )
};

export default AttendanceRate;
