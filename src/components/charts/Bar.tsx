// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

const data = [
  {
    day: 'M',
    staff: 59,
    staffColor: '#7F0CA7',
    student: 10,
    studentColor: '#00CABE',
  },
  {
    day: 'T',
    staff: 61,
    staffColor: '#7F0CA7',
    student: 37,
    studentColor: '#00CABE',
  },
  {
    day: 'W',
    staff: 55,
    staffColor: '#7F0CA7',
    student: 30,
    studentColor: '#00CABE',
  },
  {
    day: 'TH',
    staff: 78,
    staffColor: '#7F0CA7',
    student: 20,
    studentColor: '#00CABE',
  },
  {
    day: 'F',
    staff: 71,
    staffColor: '#7F0CA7',
    student: 30,
    studentColor: '#00CABE',
  },
];

const BarChart = () => {
  return (
    <div className='h-80'>
      <ResponsiveBar
        data={data}
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
