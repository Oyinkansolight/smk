// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import EmptyView from '@/components/misc/EmptyView';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data }) => {
  const dataKeys = Object.keys(data ?? {});
  const parsedData = dataKeys.map((item) => ({
    day: item[0],
    staffColor: '#7F0CA7',
    studentColor: '#00CABE',
    staff: data[item].staff,
    student: data[item].student
  }));

  const totalSum = dataKeys.reduce((acc, curr) => {
    return acc + data[curr].student + data[curr].staff;
  }
    , 0);

  const isEmpty = !data || !dataKeys?.length || !parsedData?.length || totalSum === 0;

  if (isEmpty) {
    return <EmptyView label='No Data' />;
  }

  return (
    <div className='h-80'>
      <ResponsiveBar
        data={parsedData}
        keys={['student', 'staff']}
        indexBy='day'
        margin={{ top: 0, right: 30, bottom: 60, left: 30 }}
        padding={0.7}
        valueScale={{ type: 'linear' }}
        colors={(p) =>
          p.data[`${p.id}Color` as keyof (typeof data)[number]] as string
        }
        animate={false}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        enableGridY={false}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: +1,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
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
  );
};

export default BarChart;
